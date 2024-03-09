import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorSession: boolean = false;
  formLogin: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(12)
    ])
  });

  constructor(
    private authService: AuthService, 
    @Inject(CookieService) private cookie: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendLogin(): void {
    const { email, password } = this.formLogin.value;

    this.authService.sendCredentials(email, password).subscribe({
      next: (responseOk) => {
        console.log('Session iniciada correctamente', responseOk);
        const { tokenSession, data } = responseOk;
        this.cookie.set('token', tokenSession, 4, '/');
        this.router.navigate(['/', 'tracks']);
      },
      error: (err) => {
        this.errorSession = true;
        console.log('Ocurrió un error con tu email o password', err);
      }
    });
    
  }
}
