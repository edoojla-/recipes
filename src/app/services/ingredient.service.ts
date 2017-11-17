import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Ingredient} from '../models/ingredient'

@Injectable()
export class IngredientService {

    constructor(private httpClient: HttpClient) {
    }

    getIngredients(): Observable<Ingredient[]> {
        return this.httpClient
            .get('/api/ingredient/')
            .map((res: any) => {
                let result: Ingredient[] = [];
                if (res) {
                    for (let entry of res) {
                        result.push(entry.ingredient);
                    }
                }
                return result;
            });
    }

    getIngredient(id: number): Observable<Ingredient> {
        return this.httpClient
            .get(('/api/ingredient/').concat(id.toString()))
            .map((res: any) => res.ingredient as Ingredient);
    }

    createIngredient(ingredient: Ingredient): Observable<any> {
        return this.httpClient
            .post(
                '/api/ingredient/',
                JSON.stringify(ingredient))
            .map((result: any) => {
                if (result && result.status === 201) {
                    return true;
                }
            });
    }

}
