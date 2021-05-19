import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DialogService } from 'src/app/services/dialog.service';

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
    private authenticationService: AuthServiceService,
    private dialogService:DialogService) { 

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

  this.authenticationService.login(this.loginForm.value)
            .pipe(first())
            .subscribe(data => {
              if(data!==null){
                this.authenticationService.storeToken(data.jwt);
                this.router.navigate(['']); 
              }
                },
                error => {
                  if(error)
                  this.dialogService.openDialog("Login Page","Invalid Credentials");
                });
    }
  }

