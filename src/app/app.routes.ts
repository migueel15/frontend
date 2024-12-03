import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WikisComponent } from "./wikis/wikis.component";
import { NewWikiComponent } from "./new-wiki/new-wiki.component";
import { EntradasComponent } from "./entradas/entradas.component";
import { NewEntradaComponent } from "./new-entrada/new-entrada.component";
import { EntradaComponent } from "./entrada/entrada.component";
import { VersionesComponent } from "./versiones/versiones.component";
import { EditorWikiComponent } from "./editar-wiki/editar-wiki.component";

export const routes: Routes = [
  { path: "", component: WikisComponent },
  { path: "new_wiki", component: NewWikiComponent },
  { path: "wiki/:id", component: EntradasComponent },
  { path: "wiki/:idWiki/new_entrada", component: NewEntradaComponent },
  { path: "wiki/:idWiki/editar", component: EditorWikiComponent },
  { path: "entrada/:id", component: EntradaComponent },
  { path: "entrada/:id/versiones", component: VersionesComponent },
  // otras rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
