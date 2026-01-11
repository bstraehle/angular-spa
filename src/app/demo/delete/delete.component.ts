import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Demo } from 'src/app/models/demo.model';
import { DemoService } from 'src/app/services/demo.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    standalone: false
})

export class DeleteComponent implements OnInit {
  public demo: Demo = new Demo;

  public constructor(private svc: DemoService, private route: ActivatedRoute, private router: Router, private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('Delete - DemoSPA');

    let id: number = parseInt(this.route.snapshot.params['id']);

    this.svc.getDemo(id).subscribe(
      (data: Demo) => this.demo = data,
      (err: any) => console.log(err)
    );
  }

  public deleteDemo(): void {
    this.svc.deleteDemo(this.demo.id).subscribe(
      (err: any) => console.log(err)
    );

    this.router.navigate(['demo/list'])
  }
}
