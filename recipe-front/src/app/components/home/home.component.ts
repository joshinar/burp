import { Component, OnInit } from "@angular/core";
import { AllRecipesService } from "../../services/all-recipes.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  recipes;
  constructor(private allRecipes: AllRecipesService) {}

  ngOnInit() {
    this.allRecipes.getAllRecipes().subscribe(data => {
      this.recipes = data;
      console.log(data);
    });
  }
}
