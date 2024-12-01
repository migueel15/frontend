import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WikisComponent } from "./wikis/wikis.component";
import { NewWikiComponent } from "./new-wiki/new-wiki.component";
import { EntradasComponent } from "./entradas/entradas.component";

export const routes: Routes = [
  { path: "", component: WikisComponent },
  { path: "new_wiki", component: NewWikiComponent },
  { path: "wiki/:id", component: EntradasComponent },
  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

