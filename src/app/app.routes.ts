import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WikisComponent } from "./wikis/wikis.component";
import { NewWikiComponent } from "./new-wiki/new-wiki.component";
import { EntradasComponent } from "./entradas/entradas.component";
import { NewEntradaComponent } from "./new-entrada/new-entrada.component";

export const routes: Routes = [
  { path: "", component: WikisComponent },
  { path: "new_wiki", component: NewWikiComponent },
  { path: "wiki/:id", component: EntradasComponent },
  { path: "new_entrada/:idWiki", component: NewEntradaComponent },
  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

