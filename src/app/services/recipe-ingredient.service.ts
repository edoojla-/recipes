import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { RecipeIngredient } from '../models/recipe-ingredient'

@Injectable()
export class RecipeIngredientService {

    constructor(private http: Http) { }

    getRecipeIngredients(recipeId: number): Observable<RecipeIngredient[]> {
        let headers = this.getHeaders();
        return this.http
            .get(('/api/recipeIngredient/recipe/').concat(recipeId.toString()), { headers })
            .map((res: Response) => res.json() as RecipeIngredient[]);
    }

    getRecipeIngredient(id: number): Observable<RecipeIngredient> {
        let headers = this.getHeaders();
        return this.http
            .get(('/api/recipeIngredient/').concat(id.toString()), { headers })
            .map((res: Response) => res.json().recipeIngredient as RecipeIngredient);
    }

    addRecipeIngredient(recipeId: number, recipeIngredient: RecipeIngredient): Observable<any> {
        let headers = this.getHeaders();
        return this.http
            .post(
            ('/api/recipeIngredient/').concat(recipeId.toString()).concat("/add"),
            JSON.stringify(recipeIngredient),
            { headers })
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

    deleteRecipeIngredient(recipeIngredientId: number): Observable<any> {
        let headers = this.getHeaders();
        return this.http
            .delete(
            ('/api/recipeIngredient/').concat(recipeIngredientId.toString()),
            { headers })
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

    getHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('access_token');
        headers.append('Authorization', `Bearer ${authToken}`);
        return headers;
    }

}