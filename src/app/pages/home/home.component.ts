import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import AOS from 'aos';
import { work } from './work';
import { vita } from './vita';

import { GitHubService } from '../../services/git-hub.service'
import { WhiteboardService } from 'src/app/services/whiteboard.service';
import { io, Socket } from 'socket.io-client';
import { ModalButtonType, ModalService } from 'carbon-components-angular';
import { LoginComponent } from 'src/app/modals/login/login.component';

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
  loading: boolean = false;
  context = null;
  width = "1920"
  height = "1080"
  drawing: boolean = false;
  isCurrentlyPainting: boolean = true;
  constructor(
    private gitHubService: GitHubService,
    protected modalService: ModalService) {

  }

  ngAfterViewInit(): void {

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
    this.vitaArray.push(new vita("Frontendentwickler", "2021-Heute", ["Landingpages für neue Energieversorger", "Endkundenportale auf Powercloudbasis", "Kundenbenefiportal für Stadtwerkekunden", "Endkundenanwendung auf Basis von Angular/Ionic mit Capacitor"]))
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


  login() {
    this.modalService.create({
      component: LoginComponent,
      inputs: {
        modalText: "modalText",
        size: "sm",
        showCloseButton: true
      }
    });
  }
}
