import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})

export class IndexComponent implements OnInit {
  public constructor(private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('Hello, World! - DemoSPA');
  }
}
