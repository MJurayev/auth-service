import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from 'src/app/common/ErrorHandling/app-error';
import { BadInput } from 'src/app/common/ErrorHandling/bad-input';
import { NotFoundError } from 'src/app/common/ErrorHandling/not-found-error';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { CookieService } from 'src/app/common/services/cookie/cookie.service';
import { HttpService } from 'src/app/common/services/http/http.service';
import { MessageService } from 'src/app/common/services/message/message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  returnUrl:string ='';
  isLoading:boolean =false;
  registerStep:number = 0
  codeExpireTime:Date|undefined

  confirmCode:string|undefined;
  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('re_password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }



  registerForm =new FormGroup({
    firstname:new FormControl('', [Validators.required]),
    lastname:new FormControl('',[]),
    email:new FormControl('',[Validators.email, Validators.required]),
    password:new FormControl('',[Validators.minLength(8)]),
    re_password:new FormControl('',[Validators.minLength(8)]),
    phone:new FormControl('', [ Validators.pattern("[\+][9]{2}[8]{1}[0-9]{2}(\-| )?[0-9]{3}(\-| )?[0-9]{2}(\-| )?[0-9]{2}")])
  }, { validators: this.checkPasswords })
  constructor(private messageSvc:MessageService,private router:Router,private route:ActivatedRoute, private httpSvc:AuthService, private cookieSvc:CookieService) {
  }
  get firstname(){
    return this.registerForm.controls.firstname
  }
  get lastname(){
    return this.registerForm.controls.firstname
  }
  get password(){
   return this.registerForm.controls.password
  }
  get email(){
    return this.registerForm.controls.email
  }
  get re_password(){
  return this.registerForm.controls.re_password
  }
  get phone(){
    return this.registerForm.controls.phone
  }

  onConfirmWithCode(){
    if(this.confirmCode === "")
      throw new Error("Confirm code is empty")

    this.httpSvc.VerifyWithCode(this.email.value, this.confirmCode).subscribe(response => {
      
      this.messageSvc.emitMessage({
        message:"User Successfully verified",
        type:"success"
      })
      this.httpSvc.login(this.email.value, this.password.value, "email").subscribe(
        response => {
          this.messageSvc.emitMessage({
            message:"Successfully logged in",
            type:"success"
          })
          setTimeout(()=>{
            window.location.href = this.returnUrl
          }, 1000)
        },
        error => {  
          this.messageSvc.emitMessage({
            message:"Login error",
            type:"error"
          })
          this.registerStep =0
        }
      )
    },
    error => {
      if(error instanceof BadInput){
        this.messageSvc.emitMessage({
          message:"Tasdiqlash kodi xato",
          type:"error"
        })
      }
      else if(error instanceof NotFoundError){
        this.messageSvc.emitMessage({
          message:"Bu email ro'yxatdan o'tmagan ",
          type:"error"
        })
      } 
      else throw error
    })
  }
  onClickRegister(){
    console.log(this.phone.value)
    if(this.re_password.value !== this.password.value)
      throw new Error("Parolar bir xil emas")
    this.httpSvc.register(
      this.firstname.value, 
      this.lastname.value, 
      this.email.value, 
      this.phone.value, 
      this.password.value, 
      ).subscribe(response => {
        this.httpSvc.SendRequestSms(this.email.value)
        .subscribe(expire => {
          console.log(expire)
          this.codeExpireTime = new Date()
          this.registerStep = 1
          this.messageSvc.emitMessage({
            message:"Verification code has successfully sended.Please Check your email",
            type:"success"
          })
        },
        (err:AppError) => {
          throw err
        }
        )
      },
      (error:AppError) => {
        if(error instanceof BadInput){
          this.messageSvc.emitMessage({
            message:error.originalError.error.error,
            type:"error"
          })
        }
        else throw error
      })
  }
  ngOnInit(): void {
    const token =  this.cookieSvc.getCookie('_token')
    
    this.route.queryParams.subscribe(params => {
      
      if(params.returlUrl=="" || !params.returnUrl){
        this.router.navigate(['/'], { queryParams:{
          error:true,
          message:"source not found"
        }})
      }
      else if(token){
        this.httpSvc.checkToken(token).subscribe(response => {
          window.location.href = params.returnUrl
        },
        error => { throw new Error(error) }
        )
      } else this.returnUrl = params.returnUrl      
    })
  }

}
