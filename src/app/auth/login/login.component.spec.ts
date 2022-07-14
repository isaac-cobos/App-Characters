import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, AngularMaterialModule, RouterTestingModule, ReactiveFormsModule],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
