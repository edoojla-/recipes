import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Ingredient } from '../models/ingredient'

@Injectable()
export class IngredientService {

    constructor(private http: Http) { }

    getIngredients(): Observable<Ingredient[]> {
        let headers = this.getHeaders();
        return this.http
            .get('/api/ingredient/', { headers })
            .map((res: Response) => res.json() as Ingredient[]);
    }

    getIngredient(id: number): Observable<Ingredient> {
        let headers = this.getHeaders();
        return this.http
            .get(('/api/ingredient/').concat(id.toString()), { headers })
            .map((res: Response) => res.json().ingredient as Ingredient);
    }

    createIngredient(ingredient: Ingredient): Observable<any> {
        let headers = this.getHeaders();
        return this.http
            .post(
            '/api/ingredient/',
            JSON.stringify(ingredient),
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