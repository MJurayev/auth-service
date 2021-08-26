import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from 'src/app/common/ErrorHandling/app-error';
import { BadInput } from 'src/app/common/ErrorHandling/bad-input';
import { NotFoundError } from 'src/app/common/ErrorHandling/not-found-error';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  private url:string = environment.AUTH_SERVICE_API

  constructor(private http:HttpClient) { }
  login(login:string, password:string, type:string):Observable<Object>{
    return this.http.post(`${this.url}/api/auth/login`, { login:login, password:password, type })
    .pipe(
      catchError(this.handleError)
    )
  }
  
  register(firstname:string, lastname:string, email:string, phone:string,password:string ):Observable<Object>{
    return this.http.post(`${this.url}/api/auth/sign-up`, { firstname, lastname, email, phone ,password})
    .pipe(
      catchError(this.handleError)
    )
  }

  checkToken(token:string):Observable<Object>{
    return this.http.get(`${this.url}/api/auth/check-user`, {
      headers:{
        'auth-service-token':token
      }
    }).pipe(catchError(this.handleError))
  }

  SendRequestSms(login:string, type:string="email"):Observable<Object>{
    return this.http.post(`${this.url}/api/auth/request-send-sms`, {
      login,
      type
    }).pipe(catchError(this.handleError))
  }

  VerifyWithCode(login:string,code:string|undefined, type:string="email"):Observable<Object>{
    return this.http.post(`${this.url}/api/auth/confirm`, {
      code,
      login,
      type
    }).pipe(catchError(this.handleError))
  }
  private handleError(error:Response){
        if(error.status === 404)
          return throwError(new NotFoundError(error))
        if(error.status === 400)
          return throwError(new BadInput(error))
        return throwError(new AppError(error))
  }
}
