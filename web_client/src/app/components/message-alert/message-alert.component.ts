import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-alert',
  templateUrl: './message-alert.component.html',
  styleUrls: ['./message-alert.component.css']
})


export class MessageAlertComponent implements OnInit {
  showLazy:boolean = true
  show:boolean = true
  @Input()message:string|undefined;
  @Input()type:string|undefined; // success, error, info, warning
  constructor() {
    const closeTimer = setTimeout(() => {
      this.toggle()
      clearTimeout(closeTimer)
    }, 10000)
   }
  ngOnInit(): void {
   
  }
  toggle(){
    this.show = false
    const lazyShowTimeOut = setTimeout(()=>{
      this.showLazy = false
      clearTimeout(lazyShowTimeOut)
    }, 500)
  }
}
