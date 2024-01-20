import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})

export class ErrorComponent implements OnInit {
  public errMsg: string = "";
  
  public constructor(private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.errMsg = this.route.snapshot.params['msg'];
  }
}
