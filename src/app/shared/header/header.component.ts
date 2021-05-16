import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit {
public isLoggedIn:boolean=false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  public logAction():void{
    this.router.navigate(['/login']);
  }
}
