import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WhiteboardService {
  private socket: Socket;
  canvas:any = document.getElementsByClassName('whiteboard')[0];
  constructor(private http: HttpClient) {
    this.socket = io('https://schmolles-whiteboardbackend.herokuapp.com/');
   }

   drawLine(x0, y0, x1, y1, color, emit,height,width){
    
    this.socket.emit('drawing', {
      x0: x0 / width,
      y0: y0 / height,
      x1: x1 / width,
      y1: y1 / height,
      color: color
    });
  }
}
