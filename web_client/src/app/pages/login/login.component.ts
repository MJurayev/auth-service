import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from 'src/app/common/ErrorHandling/app-error';
import { BadInput } from 'src/app/common/ErrorHandling/bad-input';
import { NotFoundError } from 'src/app/common/ErrorHandling/not-found-error';
import { AuthService } from 'src/app/common/services/auth/auth.service';
import { CookieService } from 'src/app/common/services/cookie/cookie.service';
import { MessageService } from 'src/app/common/services/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  returnUrl:string ="";
  isLoading:boolean = false;
  type:string="email";
  loginForm =new FormGroup({
    login:new FormControl('', [
      Validators.required,
      Validators.email,
      // this.type ==='email' ?  Validators.email : Validators.pattern("(?:[0-9]{2}(\-| )?[0-9]{3}(\-| )?[0-9]{2}(\-| )?[0-9]{2})"),
    ]),
    password:new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })
  constructor(private messageSvc:MessageService,private router:Router,private route:ActivatedRoute, private httpSvc:AuthService, private cookieSvc:CookieService) {
   }

   get login(){
     return this.loginForm.controls.login
   }
   get password(){
    return this.loginForm.controls.password
  }
  onClickLogin(){
    this.isLoading = true
    this.httpSvc.login(this.login.value,this.password.value,this.type)
    .subscribe(
      (response:any) => {
        this.isLoading=false
        this.cookieSvc.setCookie('_token', response?.access_token, 1)
        this.cookieSvc.setCookie('rf_token', response?.refresh_token, 3)
        
        this.messageSvc.emitMessage({ type:"success",message:"Authentifikatsiya muvaffaqiyatli bajarildi!!!" })
        const redirectTimer = setTimeout(()=>{
          clearTimeout(redirectTimer)
          window.location.href = this.returnUrl
        }, 1000)       
      }, 
      (error:AppError) => {
        this.isLoading=false
        if(error instanceof NotFoundError){
          this.messageSvc.emitMessage({
            type:"error",
            message:"Kechirasiz bunday foydalanuvchi ro'yxatdan o'tmagan!!!"
          })
        }
        else if(error instanceof BadInput){
          this.messageSvc.emitMessage({
            type:"error",
            message:"Login yoki parol xato!!!"
          })
        }
        else throw error
      }
    )
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
