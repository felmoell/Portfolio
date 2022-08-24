import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import AOS from 'aos';
import { work } from './work';
import { vita } from './vita';

import { GitHubService } from '../../services/git-hub.service'
import { WhiteboardService } from 'src/app/services/whiteboard.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  objArray: Array<work> = new Array();
  objArrayShowMore: Array<work> = new Array();
  vitaArray: Array<vita> = new Array();
  currentVitaEntry;
  canvas: HTMLCanvasElement = document.getElementsByClassName('whiteboard')[0] as HTMLCanvasElement;
  showMoreBtnActive: boolean = false;
  private socket: Socket;
  public current = null;
  loading:boolean = false;
  context = null;
  width = "1920"
  height = "1080"
  drawing: boolean = false;
  isCurrentlyPainting: boolean = true;
  constructor(
    private gitHubService: GitHubService,
    private whiteboardService: WhiteboardService,
    private renderer2: Renderer2) {
    this.socket = io('https://schmolles-whiteboardbackend.herokuapp.com');
    this.socket.on('drawing', this.onDrawingEvent);
    this.current = {
      color: 'yellow',
      x: 0,
      y: 0
    };

 



  }

  private unlistener: () => void;

  ngAfterViewInit(): void {
    //    document.getElementsByClassName('whiteboard')[0].addEventListener('mousedown', this.onMouseDown, true);
    this.context = (document.getElementsByClassName('whiteboard')[0] as HTMLCanvasElement).getContext('2d');

    this.width = document.getElementsByClassName('whiteboard')[0].clientWidth.toString();
    this.height = document.getElementsByClassName('whiteboard')[0].clientHeight.toString();

    this.unlistener = this.renderer2.listen(document.getElementsByClassName('whiteboard')[0], "mousedown", e => {
      if (this.isCurrentlyPainting) {
        this.drawing = true;
        this.current.x = e.clientX || e.touches[0].clientX;
        this.current.y = e.clientY || e.touches[0].clientY;
      }

    });

    this.unlistener = this.renderer2.listen(document.getElementsByClassName('whiteboard')[0], "mouseup", event => {
      if (this.isCurrentlyPainting) {
        if (!this.drawing) {
          return;
        }
        this.drawing = false;
        this.drawLine(this.current.x, this.current.y, event.clientX || event.touches[0].clientX, event.clientY || event.touches[0].clientY, this.current.color, true);
      }
    });

    this.unlistener = this.renderer2.listen(document.getElementsByClassName('whiteboard')[0], "mousemove", e => {

      if (!this.drawing) {
        return;
      }
      this.drawLine(this.current.x, this.current.y, e.clientX || e.touches[0].clientX, e.clientY || e.touches[0].clientY, this.current.color, true);
      this.current.x = e.clientX || e.touches[0].clientX;
      this.current.y = e.clientY || e.touches[0].clientY;

    });
    this.togglePainting();

  }
  ngOnInit(): void {
    AOS.init();
    this.loading = true;
    document.getElementById("body")!.style.overflowX = "hidden";
     this.gitHubService.getData().then(res => {     
       res.projects.forEach((element, index) => {
         if (index <= 5) {
           let t = new work(element.full_name, element.description, [], element.html_url, element.homepage);
           element.topics.forEach(element => {
            t.tags.push(element);
          });
           this.objArray.push(t);
         } else {
           let t = new work(element.full_name, element.description, [], element.html_url, element.homepage);
           element.topics.forEach(element => {
            t.tags.push(element);
          });
           this.objArrayShowMore.push(t);
         }
       });
     this.loading = false;
     })
     this.vitaArray.push(new vita("Schüler", "2003-2007", ["Grundschule"]))
     this.vitaArray.push(new vita("Schüler", "2007-2011", ["Gymnasium"]))
     this.vitaArray.push(new vita("Schüler", "2011-2013", ["Realschule"]))
     this.vitaArray.push(new vita("Schüler", "2013-2016", ["Berufliches Gymnasium", "Grundlagen Java und Software Engineering (UML)", "Grundlagen SQL und ER/EER"]))
     this.vitaArray.push(new vita("Student", "2016-2020", ["Universität", "Java und C/C++ in Verteilten Systemen und (Android) Anwendungen", "Webanwendungen/Hybride Apps mit Angular und Ionic", "Backends mit PHP/Laravel und Datenbanken mit mySQL und PostgreSQL", "User Interface Entwicklung, Audio- und Videotechnik, Computergrafik, Spieleprogrammierung und 3D-Animation"]))
     this.vitaArray.push(new vita("Frontendentwickler", "2021-Heute", ["Landingpages für neue Energieversorger","Endkundenportale auf Powercloudbasis","Kundenbenefiportal für Stadtwerkekunden","Endkundenanwendung auf Basis von Angular/Ionic mit Capacitor"]))
     this.currentVitaEntry = this.vitaArray[0];
     this.showVitaEntry(5);
  }
  showMore() {
    if (this.showMoreBtnActive === false) {
      document.getElementById("showMoreBtn").innerText = "Weniger Anzeigen"
      this.showMoreBtnActive = true;
      this.objArrayShowMore.forEach(element => {
        this.objArray.push(element);
      });

    } else {
      document.getElementById("showMoreBtn").innerText = "Mehr Anzeigen";
      for (let index = this.objArray.length; index > 6; index--) {
        this.objArray.pop();
      }
      this.showMoreBtnActive = false;
    }
  }

  JumpToSection(id) {
    let el = document.getElementById('section_' + id);
    el.scrollIntoView({ block: "end", behavior: "smooth" })
  }

  showVitaEntry(id) {

    let t = Array.from(document.getElementsByClassName("vitaEntry"));
    t.forEach(element => {
      element.classList.remove("active-vita-entry");
    });

    document.getElementById("vitaEntry" + id).classList.add("active-vita-entry");
    this.currentVitaEntry = this.vitaArray[id];
  }



  onDrawingEvent(data) {
    //this.drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color,false)

    var w = document.getElementsByClassName('whiteboard')[0].clientWidth;
    var h = document.getElementsByClassName('whiteboard')[0].clientHeight;

    let context = (document.getElementsByClassName('whiteboard')[0] as HTMLCanvasElement).getContext('2d')
    context.beginPath();
    context.moveTo(data.x0 * w, data.y0 * h);
    context.lineTo(data.x1 * w, data.y1 * h);
    context.strokeStyle = data.color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!data.emit) { return; }

    this.socket.emit('drawing', {
      x0: data.x0 / w,
      y0: data.y0 / h,
      x1: data.x1 / w,
      y1: data.y1 / h,
      color: this.current.color
    });

  }

  drawLine(x0, y0, x1, y1, color, emit) {
    var w = document.getElementsByClassName('whiteboard')[0]["width"];
    var h = document.getElementsByClassName('whiteboard')[0]["height"];

    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.strokeStyle = color;
    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.closePath();

    if (!emit) { return; }

    this.socket.emit('drawing', {
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: this.current.color
    });
  }
  colorChange(color: string) {
    this.current.color = color;

  }

  togglePainting() {
    document.getElementById('landingSectionWrapper').classList.toggle('paintingCursor');
    this.isCurrentlyPainting = !this.isCurrentlyPainting;
  }

  clearCanvas(){
    this.context.clearRect(0, 0, document.getElementsByClassName('whiteboard')[0]["width"], document.getElementsByClassName('whiteboard')[0]["height"]);
  }
}
