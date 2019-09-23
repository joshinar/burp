import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AllRecipesService {
  url = "http://localhost:5000";
  constructor(private http: HttpClient) {}
  getAllRecipes() {
    return this.http.get(`${this.url}/all-recipes`);
  }
  getSingleRecipe(id) {
    return this.http.get(`${this.url}/recipe/${id}`);
  }
}
