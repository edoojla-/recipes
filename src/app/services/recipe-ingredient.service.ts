import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {RecipeIngredient} from '../models/recipe-ingredient'

@Injectable()
export class RecipeIngredientService {

    constructor(private httpClient: HttpClient) {}

    getRecipeIngredients(recipeId: number): Observable<RecipeIngredient[]> {
        console.log(recipeId.toString());
        return this.httpClient
            .get(('/api/recipeIngredient/recipe/').concat(recipeId.toString()))
            .map((res: any) => {
                let result: RecipeIngredient[] = [];
                if (res) {
                    for (let entry of res) {
                        result.push(entry.recipeIngredient);
                    }
                }
                return result;
            });
    }

    getRecipeIngredient(id: number): Observable<RecipeIngredient> {
        return this.httpClient
            .get(('/api/recipeIngredient/').concat(id.toString()))
            .map((res: any) => res.recipeIngredient as RecipeIngredient);
    }

    addRecipeIngredient(recipeId: number, recipeIngredient: RecipeIngredient): Observable<any> {
        return this.httpClient
            .post(
            ('/api/recipeIngredient/').concat(recipeId.toString()).concat("/add"),
            JSON.stringify(recipeIngredient))
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

    updateRecipeIngredient(recipeIngredient: RecipeIngredient): Observable<any> {
        return this.httpClient
            .put(
            ('/api/recipeIngredient/').concat(recipeIngredient.id.toString()),
            JSON.stringify(recipeIngredient))
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

    deleteRecipeIngredient(recipeIngredientId: number): Observable<any> {
        return this.httpClient
            .delete(
            ('/api/recipeIngredient/').concat(recipeIngredientId.toString()))
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

}
