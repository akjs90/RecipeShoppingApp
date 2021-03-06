import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private recipeService:RecipeService, 
              private activeRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
        (params:Params)=>{
          this.id=+params['id'];
          this.recipe=this.recipeService.getRecipeById(this.id);
        }
      );
  }
  onAddToShoppingList(){
  	this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.activeRoute});
    // this.router.navigate(['../',this.id,'edit'],{relativeTo:this.activeRoute});

  }
  OnDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.activeRoute});

  }
}
