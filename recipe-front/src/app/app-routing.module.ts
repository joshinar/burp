import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { RecipeDetailComponent } from "./components/recipe-detail/recipe-detail.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "recipe/:id", component: RecipeDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
