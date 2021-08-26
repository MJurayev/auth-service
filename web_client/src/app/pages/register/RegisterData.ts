export declare interface IRegisterData{
    lastname?:string;
    firstname:string;
    phone?:string;
    email?:string;
    password:string;

}

export class RegisterData implements IRegisterData {
    lastname?:string
    firstname:string=""
    phone?:string
    email?:string
    password:string=""
}