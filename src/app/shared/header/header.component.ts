import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
    if(this.isLoggedIn){
      localStorage.removeItem('user');
      localStorage.clear();
      this.router.navigate(['/products']);
      this.isLoggedIn=!this.isLoggedIn;
    }else{
      this.router.navigate(['/login']);
      this.isLoggedIn=!this.isLoggedIn;
      
    }
    
  }
}
