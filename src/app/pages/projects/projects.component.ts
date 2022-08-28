import { Component, OnInit } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  model = new TableModel();;
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.model.header = [
      new TableHeaderItem({
        data: "ID"
      }),
      new TableHeaderItem({
        data: "Name"
      }),
      new TableHeaderItem({
        data: "Beschreibung"
      }),
      new TableHeaderItem({
        data: "Datum"
      })
    ];
    this.model.data.splice(0);
    this.projectService.getAllRepos().then((repos: any) => {
      repos.projects.forEach(element => {
        this.model.data.push([
          new TableItem({ data: element.id }), new TableItem({ data: element.full_name }), new TableItem({ data: element.description }), new TableItem({ data: new Date(element.updated_at).toLocaleDateString() })
        ])
      });
    })
  }

}
