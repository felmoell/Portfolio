import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { work } from './work';
import { vita } from './vita';

import { GitHubService } from '../../services/git-hub.service'
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
  showMoreBtnActive = false;
  constructor(private gitHubService: GitHubService) { }

  ngOnInit(): void {
    AOS.init();
    document.getElementById("body")!.style.overflowX = "hidden";
    this.gitHubService.getData().then(res => {     
      res.forEach((element, index) => {
        if (index <= 5) {
          let t = new work(element.full_name, element.description, [], element.html_url, element.homepage);
          this.gitHubService.getTopicsData("https://api.github.com/repos/" + element.full_name + "/topics").then(resLang => {
            resLang.names.forEach(element => {
              t.tags.push(element);
            });
            this.objArray.push(t);
          })
          console.log(this.objArray);
        } else {
          let t = new work(element.full_name, element.description, [], element.html_url, element.homepage);
          this.gitHubService.getTopicsData("https://api.github.com/repos/" + element.full_name + "/topics").then(resLang => {
            resLang.names.forEach(element => {
              t.tags.push(element);
            });
            this.objArrayShowMore.push(t);
          })
        }
      });
    })
    this.vitaArray.push(new vita("Schüler", "2003-2007", ["Grundschule", "", "", "", ""]))
    this.vitaArray.push(new vita("Schüler", "2007-2011", ["Gymnasium", "", "", "", ""]))
    this.vitaArray.push(new vita("Schüler", "2011-2013", ["Realschule", "", "", "", ""]))
    this.vitaArray.push(new vita("Schüler", "2013-2016", ["Berufliches Gymnasium", "Grundlagen Java und Software Engineering (UML)", "Grundlagen SQL und ER/EER", "", ""]))
    this.vitaArray.push(new vita("Student", "2016-2020", ["Universität", "Java und C/C++ in Verteilten Systemen und (Android) Anwendungen", "Webanwendungen/Hybride Apps mit Angular und Ionic", "Backends mit PHP/Laravel und Datenbanken mit mySQL und PostgreSQL", "User Interface Entwicklung, Audio- und Videotechnik, Computergrafik, Spieleprogrammierung und 3D-Animation"]))
    this.currentVitaEntry = this.vitaArray[0];
    this.showVitaEntry(4);
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
}
