import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { LoginComponent } from './login.component';

class FakeRouter {
  navigateByUrl(url: string) { return url }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, AngularMaterialModule, RouterTestingModule, ReactiveFormsModule],
      providers: [FormBuilder,
        { provide: Router, useValue: FakeRouter }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirection to /table-characters', () => {
    let de = fixture.debugElement.query(By.css('.btn-submit'))
    let el = de.nativeElement;
    const LOGIN = {
      email: 'test@test.com',
      password: '1234'
    }
    const router = TestBed.inject(Router)
    const spy = spyOn(router, 'navigateByUrl');
    el.click()
    component.onLogin(LOGIN)
    const navArgs = spy.calls.first().args[0]
    expect(navArgs).toBe('/table-characters')
  });

  it('Should create a form login', () => {
    expect(component.loginForm.contains('email')).toBeTruthy()
    expect(component.loginForm.contains('password')).toBeTruthy()
  })

  it('should verify the field is valid', () => {
    component.formLoginSubmitted = true;
    expect(component.campoNoValido('password')).toBeTruthy();
  });
  it('should verify the field is valid', () => {
    component.formLoginSubmitted = false;
    expect(component.campoNoValido('password')).toBeFalsy();
  });
});
