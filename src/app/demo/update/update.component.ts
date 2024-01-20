import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Demo } from 'src/app/models/demo.model';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})

export class UpdateComponent implements OnInit {
  public demo: Demo = new Demo;

  public constructor(private svc: DemoService, private route: ActivatedRoute, private router: Router, private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('Update - DemoSPA');

    let id: number = parseInt(this.route.snapshot.params['id']);

    this.svc.getDemo(id).subscribe(
      (data: Demo) => this.demo = data,
      (err: any) => console.log(err)
    );
  }

  public updateDemo(): void {
    this.svc.updateDemo(this.demo.id, this.demo).subscribe(
      (err: any) => console.log(err)
    );

    this.router.navigate(['demo/list'])
  }
}
