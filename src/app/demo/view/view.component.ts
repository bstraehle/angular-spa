import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Demo } from 'src/app/models/demo.model';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html'
})

export class ViewComponent implements OnInit {
  public demo: Demo = new Demo;

  public constructor(private svc: DemoService, private route: ActivatedRoute, private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('View - DemoSPA');

    let id: number = parseInt(this.route.snapshot.params['id']);

    this.svc.getDemo(id).subscribe(
      (data: Demo) => this.demo = data,
      (err: any) => console.log(err)
    );
  }
}
