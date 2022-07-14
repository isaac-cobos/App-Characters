import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableCharactersComponent } from './table-characters/table-characters.component';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';


@NgModule({
  declarations: [TableCharactersComponent, NavbarComponent],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
})
export class PagesModule { }
