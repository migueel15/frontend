import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WikisComponent } from './wikis/wikis.component';
import { NewWikiComponent } from './new-wiki/new-wiki.component';

export const routes: Routes = [
  { path: '', component: WikisComponent },
  { path: 'new_wiki', component: NewWikiComponent },
  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }