import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { from } from 'rxjs';

import { AppComponent } from './app.component';
import { CartProductsFacade } from './core/@ngrx/cart/cart-products.facade';

describe('AppComponent (Shallow)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        CartProductsFacade,
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{ id: 1 }]),
          },
        },
      ],
    })
      .overrideComponent(AppComponent, {})
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('title should be "shop"', () => {
    expect(component.title).toBe('shop');
  });

  describe('ngAfterViewInit(): void', () => {
    it('appTitleView.nativeElement.innerText should be updated', () => {
      expect(component.appTitleView).toBeUndefined();
      const appTitleView = {
        innerText: '',
        nativeElement: {} as HTMLHeadingElement,
      } as ElementRef<HTMLHeadingElement>;
      component.appTitleView = appTitleView;
      expect(component.appTitleView.nativeElement.innerText).toBeUndefined();
      component.ngAfterViewInit();
      expect(component.appTitleView.nativeElement.innerText).toBe(
        component.title
      );
    });
  });
});
