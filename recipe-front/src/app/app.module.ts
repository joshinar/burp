import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from "./components/home/home.component";
import { AllRecipesService } from "./services/all-recipes.service";
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent, RecipeDetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [AllRecipesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
