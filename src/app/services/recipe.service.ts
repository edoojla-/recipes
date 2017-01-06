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
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('access_token');
        headers.append('Authorization', `Bearer ${authToken}`);

        return this.http
            .get('/api/recipe', { headers })
            .map(res => res.json() as Recipe[]);
    }

}