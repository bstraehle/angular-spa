import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-privacy',
    templateUrl: './privacy.component.html',
    standalone: false
})

export class PrivacyComponent implements OnInit {
  public constructor(private title: Title) {}

  public ngOnInit() {
    this.title.setTitle('Privacy Policy - DemoSPA');
  }
}
