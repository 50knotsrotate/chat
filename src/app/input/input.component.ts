import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../websocket.service';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  constructor(public socket: SocketService) { }

  @Input()
  inputValue: String
  
@Input()
send: Function
  
  @Input()
  handleInput: Function;

  ngOnInit(): void {
   
  }
}
