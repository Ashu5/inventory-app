import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted = false;
  public password:string;
   public returnUrl: string;


  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthServiceService,) { 

      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }

    }
    get f() { return this.loginForm.controls; }

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });

  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onSubmit():void{
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  const email:string=this.f.email.value;
  const password:string= this.f.password.value;
  this.authenticationService.login(email,password)
            .pipe(first())
            .subscribe(data => {
                this.router.navigate(['']);  
                },
                error => {
                    window.alert("Error Occured"+error);
                });
    }
  }

