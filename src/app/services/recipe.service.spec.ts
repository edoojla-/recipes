import {TestBed, inject, async} from '@angular/core/testing';
import {HttpModule, Http, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import {RecipeService} from './recipe.service';
import {Observable} from 'rxjs/Observable';

const mockHttpProvider =
    {
        provide: Http,
        deps: [MockBackend, BaseRequestOptions],
        useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
        }
    };

describe("RecipeService", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [],
            providers: [
                RecipeService,
                MockBackend,
                BaseRequestOptions,
                mockHttpProvider
            ]
        });
        TestBed.compileComponents();
    });

    it('should return an Observable<Array<Recipe>>',
        async(inject([RecipeService, MockBackend], (recipeService, mockBackend) => {

            const mockResponse = {
                data: [
                    {id: 0, name: 'Recipe 0'},
                    {id: 1, name: 'Recipe 1'},
                    {id: 2, name: 'Recipe 2'},
                    {id: 3, name: 'Recipe 3'},
                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

            recipeService.getRecipes().subscribe(
                data => {
                    expect(data.data.length).toBe(4);
                }
            );
        }))
    );

    it('should call get',
        inject([RecipeService, Http], (recipeService, http) => {
            let obs = new Observable();
            http.get = jasmine.createSpy("get() spy").and.returnValue(obs);
            recipeService.getRecipes();
            expect(http.get).toHaveBeenCalled();
        })
    );
});
