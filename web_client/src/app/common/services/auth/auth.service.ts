import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpService } from '../http/http.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService extends HttpService {

  constructor(http:HttpClient) {
    super(http)
  }    

 
}
