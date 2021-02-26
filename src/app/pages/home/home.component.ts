import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { work } from './work';
import { vita } from './vita';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  objArray: Array<work> = new Array();
  vitaArray: Array<vita> = new Array();
  currentVitaEntry;
  showMoreBtnActive = false;
  constructor() { }

  ngOnInit(): void {
    AOS.init();
    document.getElementById("body").style.overflowX = "hidden";
    this.objArray.push(new work("Emotions", "Softwaresystem zur Erfassung von Emotionen im Zusammenhang mit der akutellen Position des Nutzers.", ["PHP", "Laravel", "Java", "Android"], "https://github.com/felmoell/Emotions", ""));
    this.objArray.push(new work("PEPEMA", "Softwaresystem zur Verwaltung von Feuerwehr Equipment (PPE).", ["PHP", "Laravel", "Ionic", "Angular"], "https://github.com/felmoell/PEPEMA", ""));
    this.objArray.push(new work("Agency", "Tempalate for a Webagency build with Ionic/Angular.", ["Ionic", "Angular"], "https://github.com/felmoell/Agency", ""));
    this.objArray.push(new work("Corona-Tracker", "Weltweiter Überblick über die Coronafallzahlen mit interaktiver Karte und verschieden Diagrammen.", ["Google Charts", "Ionic", "Angular"], "https://github.com/felmoell/Corona-Tracker", "https://schmolles-corona-tracker.web.app/"));
    this.objArray.push(new work("Juicery", "Webseite zum Testen von Animate On Scroll Library", ["AOS", "HTML", "CSS", "JS"], "https://github.com/felmoell/juicery", ""));
    this.objArray.push(new work("Portfolio", "Diese Webseite als Lebenslauf und Portfolio", ["Angular","AOS"], "", ""));

    this.vitaArray.push(new vita("Schüler", "2003-2007", ["Grundschule","","","",""]))
    this.vitaArray.push(new vita("Schüler", "2007-2011", ["Gymnasium","","","",""]))
    this.vitaArray.push(new vita("Schüler", "2011-2013", ["Realschule","","","",""]))
    this.vitaArray.push(new vita("Schüler", "2013-2016", ["Berufliches Gymnasium","Grundlagen Java und Software Engineering (UML)","Grundlagen SQL und ER/EER","",""]))
    this.vitaArray.push(new vita("Student", "2016-2020", ["Universität","Java und C/C++ in Verteilten Systemen und (Android) Anwendungen","Webanwendungen/Hybride Apps mit Angular und Ionic","Backends mit PHP/Laravel und Datenbanken mit mySQL und PostreSQL", "User Interface Entwicklung, Audio- und Videotechnik, Computergrafik, Spieleprogrammierung und 3D-Animation"]))
    
    this.currentVitaEntry = this.vitaArray[0];
  }
  showMore() {
    if (this.showMoreBtnActive === false) {
      this.objArray.push(new work("Daily UI", "Daily UI Challenge", ["Adobe XD", "UI", ], "https://github.com/felmoell/DailyUi", ""));
      this.objArray.push(new work("Wedding", "Wedding Photography Page", ["Angular", ], "https://github.com/felmoell/wedding", "https://wedding-20a63.web.app/home"));


      

      document.getElementById("showMoreBtn").innerText = "Weniger Anzeigen"
      this.showMoreBtnActive = true;
    } else {
      document.getElementById("showMoreBtn").innerText = "Mehr Anzeigen"
      for (let index = 0; index < 4; index++) {
        this.objArray.pop();
      }
      this.showMoreBtnActive = false;
    }
  }
  JumpToSection(id) {
    let el = document.getElementById('section_' + id);
    el.scrollIntoView({ block: "end", behavior: "smooth" })
  }

  showVitaEntry(id){

    let t = Array.from(document.getElementsByClassName("vitaEntry"));
    t.forEach(element => {
      element.classList.remove("active-vita-entry");
    });

    document.getElementById("vitaEntry"+id).classList.add("active-vita-entry");
    this.currentVitaEntry = this.vitaArray[id];
  }
}
