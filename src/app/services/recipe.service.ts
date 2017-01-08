import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Recipe } from '../models/recipe'

@Injectable()
export class RecipeService {

    constructor(private http: Http) { }

    getRecipes(): Observable<Recipe[]> {
        let headers = this.getHeaders();
        return this.http
            .get('/api/recipe/', { headers })
            .map((res: Response) => res.json() as Recipe[]);
    }

    getRecipe(id: number): Observable<Recipe> {
        let headers = this.getHeaders();
        return this.http
            .get(('/api/recipe/').concat(id.toString()), { headers })
            .map((res: Response) => res.json().recipe as Recipe);
    }

    updateRecipe(recipe: Recipe): Observable<any> {
        let headers = this.getHeaders();
        return this.http
            .put(
            ('/api/recipe/').concat(recipe.id.toString()),
            JSON.stringify(recipe),
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