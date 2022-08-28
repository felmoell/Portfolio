import { Component, OnInit } from '@angular/core';
import { TableHeaderItem, TableItem, TableModel } from 'carbon-components-angular';
import { CronService } from 'src/app/services/cron.service';

@Component({
  selector: 'app-cron',
  templateUrl: './cron.component.html',
  styleUrls: ['./cron.component.scss']
})
export class CronComponent implements OnInit {
  model = new TableModel();;
  constructor(private cron: CronService) { }

  ngOnInit(): void {
    this.model.header = [
      new TableHeaderItem({
        data: "ID"
      }),
      new TableHeaderItem({
        data: "Name"
      }),
      new TableHeaderItem({
        data: "Datum"
      }),
      new TableHeaderItem({
        data: "Erfolg"
      })
    ];

    this.model.data.splice(0);

    this.cron.getAllCronJobs().then((crons: any) => {
      crons.result.docs.forEach(element => {
        this.model.data.push([
          new TableItem({ data: element._id }), new TableItem({ data: element.name }), new TableItem({ data: element.date }), new TableItem({ data: element.success })
        ])
      });
    })
  }

}
