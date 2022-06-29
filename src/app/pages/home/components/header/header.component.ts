import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuActive:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  JumpToSection(id) {
    let el = document.getElementById('section_' + id);
    el.scrollIntoView({ block: "end", behavior: "smooth" });
    this.menuActive = false;
  }
  togglemenu(){
    this.menuActive = true;
  }

}
