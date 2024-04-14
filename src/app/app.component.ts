import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(
    private _router: Router,
    public spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    if (this._router.url == '/') {
      this.spinner.hide();
      this._router.navigateByUrl('/login');
    }
  }

  ngOnInit(): void {
    this.spinner.hide()
  }
}
