/* tslint:disable:no-unused-variable */

import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Http} from '@angular/http';
import {AppComponent} from './app.component';
import {AccountService} from './services/account.service';

describe('AppComponent', () => {

    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                Http,
                {provide: AccountService, useClass: MockAccountService}
            ],
            imports: [],
            /* not testing router related stuff, configuring the test to ignore unknown directives */
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance; // AppComponent test instance

    });

    it('should create the app', async(() => {
        expect(comp).toBeTruthy();
    }));

    it(`should have as title 'NinJo Recipe Manager'`, async(() => {
        fixture.detectChanges();
        expect(comp.title).toEqual('NinJo Recipe Manager');
    }));

    it('should render title in a h1 tag', async(() => {
        fixture.detectChanges();
        let debugElement = fixture.debugElement.query(By.css('h1'));
        let compiledElement = debugElement.nativeElement;
        expect(compiledElement.textContent).toContain('NinJo Recipe Manager');
    }));
});

class MockAccountService {
    isLoggedIn() {
        return false;
    }
}
