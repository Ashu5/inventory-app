import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  password:string;



  constructor( private formBuilder: FormBuilder,private router: Router
    ,private route: ActivatedRoute,) { }
    get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  public onSubmit():void{
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  localStorage.setItem('user',JSON.stringify( this.f.username.value));
  this.router.navigate(['/admin']);
 
  }
}
