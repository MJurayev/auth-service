import { ErrorHandler, Injectable } from "@angular/core";
import { MessageService } from "../services/message/message.service";
@Injectable({
    providedIn:"root"
})
export class AppErrorHandler extends ErrorHandler{
    constructor(private messageSvc:MessageService){
        super()
    }
    handleError(error:any):void{
        this.messageSvc.emitMessage({
            type:"error",
            message:"Kutilmagan xato ro'yberdi"
        })
        console.log(error)
    }
}