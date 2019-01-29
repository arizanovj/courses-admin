import { Component,AfterViewInit, OnInit,ViewChild } from '@angular/core';
import { MatSidenav,MatIconModule,MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css'],
})
export class  MainLayoutComponent implements AfterViewInit {
  @ViewChild ('sidenav') sidenav:MatSidenav;
  constructor() { }

  ngAfterViewInit() {
  }
}
