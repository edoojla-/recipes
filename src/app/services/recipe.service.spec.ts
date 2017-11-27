import {TestBed, inject, async} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RecipeService} from './recipe.service';
import {Observable} from 'rxjs/Observable';

describe("RecipeService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [],
            providers: [
                RecipeService
            ]
        });
        TestBed.compileComponents();
    });

    describe("getRecipes()", () => {

        it('should make a request to /api/recipe/ and return its mock',
            async(inject([RecipeService, HttpTestingController], (recipeService, httpTestingController) => {

                const mockResponse = {
                    data: [
                        {id: 0, name: 'Recipe 0'},
                        {id: 1, name: 'Recipe 1'},
                        {id: 2, name: 'Recipe 2'},
                        {id: 3, name: 'Recipe 3'},
                    ]
                };

                recipeService.getRecipes().subscribe(
                    recipes => {
                        expect(recipes).toEqual(mockResponse);
                    }
                );

                let recipeRequest = httpTestingController.expectOne('/api/recipe/');
                recipeRequest.flush(mockResponse);

                httpTestingController.verify();
            }))
        );

        it('should call get',
            inject([RecipeService, HttpClient], (recipeService, httpClient) => {
                let obs = new Observable();
                httpClient.get = jasmine.createSpy("get() spy").and.returnValue(obs);
                recipeService.getRecipes();
                expect(httpClient.get).toHaveBeenCalled();
            })
        );

    });
});
