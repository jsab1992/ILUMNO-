import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FormsComponent } from './componets/forms/forms.component';

const routes: Routes = [
  {path: 'home/:id', component: AppComponent},
  {path: 'forms', component: FormsComponent},
  { path: '**',  redirectTo: 'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }