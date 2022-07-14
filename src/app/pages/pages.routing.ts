import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TableCharactersComponent } from './table-characters/table-characters.component';


const routes: Routes = [
    {
        path: 'table-characters',
        component: TableCharactersComponent,
        loadChildren: () => import('./pages.module').then(m => m.PagesModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }