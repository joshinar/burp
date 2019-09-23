import { Component, OnInit } from "@angular/core";
import { AllRecipesService } from "../../services/all-recipes.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"]
})
export class RecipeDetailComponent implements OnInit {
  recipe;
  constructor(
    private recipeDetail: AllRecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    this.recipeDetail
      .getSingleRecipe(id)
      .subscribe(data => (this.recipe = data));
  }
}
