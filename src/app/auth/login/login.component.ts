import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LOGIN_USER } from 'src/mock/mock-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public formLoginSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }


  /**
   * Do Loggin and redirect to table-characters 
   */
  onLogin(valueForm: any) {
    const { email, password } = valueForm
    debugger
    this.formLoginSubmitted = true;
    if (!this.loginForm.invalid) {
      if (email === LOGIN_USER.email && password === LOGIN_USER.password) {
        this.router.navigateByUrl('/table-characters');
      } else {
        Swal.fire('Error: Check email or password!')
      }
    }


  }

  /**
   * Verify input if it's valid
   * @param campo 
   */
  campoNoValido(campo: string) {
    return this.loginForm.get(campo)?.invalid && this.formLoginSubmitted ? true : false;
  }

}
