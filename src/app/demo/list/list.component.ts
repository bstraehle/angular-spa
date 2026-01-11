import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Demo } from 'src/app/models/demo.model';
import { DemoService } from 'src/app/services/demo.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    standalone: false
})

export class ListComponent implements OnInit {
  public demos: Demo[] = [];

  public constructor(private svc: DemoService, private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('List - DemoSPA');

    this.svc.getDemos().subscribe(
      (data: Demo[]) => this.demos = data,
      (err: any) => console.log(err)
    );
  }
}
