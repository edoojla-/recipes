import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Recipe} from '../models/recipe'

@Injectable()
export class RecipeService {

    constructor(private httpClient: HttpClient) {
    }

    getRecipes(): Observable<any> {
        return this.httpClient
            .get('/api/recipe/');
    }

    getRecipe(id: number): Observable<Recipe> {
        return this.httpClient
            .get(('/api/recipe/').concat(id.toString()))
            .map((res: any) => res.recipe as Recipe);
    }

    updateRecipe(recipe: Recipe): Observable<any> {
        return this.httpClient
            .put(
                ('/api/recipe/').concat(recipe.id.toString()),
                JSON.stringify(recipe))
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

}
