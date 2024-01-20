import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Demo } from 'src/app/models/demo.model';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html'
})

export class AddComponent implements OnInit {
  public demo: Demo = new Demo;

  public constructor(private svc: DemoService, private router: Router, private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('Add - DemoSPA');
    
    this.demo = new Demo();
  }

  public addDemo(): void {
    this.svc.addDemo(this.demo).subscribe(
      (err: any) => console.log(err)
    );

    this.router.navigate(['demo/list'])
  }
}
