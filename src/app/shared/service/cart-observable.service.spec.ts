import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CartProductModel } from '../model/cart-product.model';
import { CartObservableService } from './cart-observable.service';

const cartProductListMockResponse: CartProductModel[] = [
  {
    id: 1351,
    name: 'CA Product 41',
  } as CartProductModel,
  {
    id: 1133,
    name: 'GD Product 13',
  } as CartProductModel,
];

describe('CartObservableService', () => {
  let service: CartObservableService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartObservableService],
    });
    service = TestBed.inject(CartObservableService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('get cart items', (done: DoneFn) => {
    service.getList().subscribe((list: CartProductModel[]) => {
      expect(list).toEqual(cartProductListMockResponse);
      done();
    });
    const mockRequest: TestRequest = httpTestingController.expectOne(
      service.url
    );
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(cartProductListMockResponse);
  });

  it('get cart item', (done: DoneFn) => {
    service
      .getById(cartProductListMockResponse[0].id)
      .subscribe((cartProduct: CartProductModel) => {
        expect(cartProduct).toEqual(cartProductListMockResponse[0]);
        done();
      });
    const mockRequest: TestRequest = httpTestingController.expectOne(
      `${service.url}/${cartProductListMockResponse[0].id}`
    );
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(cartProductListMockResponse[0]);
  });

  it('update', (done: DoneFn) => {
    service
      .update(cartProductListMockResponse[0])
      .subscribe((cartProduct: CartProductModel) => {
        expect(cartProduct).toEqual(cartProductListMockResponse[0]);
        done();
      });
    const mockRequest: TestRequest = httpTestingController.expectOne(
      `${service.url}/${cartProductListMockResponse[0].id}`
    );
    expect(mockRequest.request.method).toEqual('PUT');
    mockRequest.flush(cartProductListMockResponse[0]);
  });

  it('create', (done: DoneFn) => {
    service
      .create(cartProductListMockResponse[0])
      .subscribe((cartProduct: CartProductModel) => {
        expect(cartProduct).toEqual(cartProductListMockResponse[0]);
        done();
      });
    const mockRequest: TestRequest = httpTestingController.expectOne(
      service.url
    );
    expect(mockRequest.request.method).toEqual('POST');
    mockRequest.flush(cartProductListMockResponse[0]);
  });

  it('delete', (done: DoneFn) => {
    service
      .delete(cartProductListMockResponse[0].id)
      .subscribe((id: number) => {
        expect(id).toEqual(cartProductListMockResponse[0].id);
        done();
      });
    const mockRequest: TestRequest = httpTestingController.expectOne(
      `${service.url}/${cartProductListMockResponse[0].id}`
    );
    expect(mockRequest.request.method).toEqual('DELETE');
    mockRequest.flush(cartProductListMockResponse[0]);
  });
});
