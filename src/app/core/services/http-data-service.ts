import { Observable } from 'rxjs';

export interface HttpDataService<T> {
  url: string;

  getList(): Promise<T[]> | Observable<T[]>;

  getById(id: number): Promise<T> | Observable<T>;

  update(product: Partial<T>): Promise<T> | Observable<T>;

  create(product: Partial<T>): Promise<T> | Observable<T>;

  delete(id: number): Promise<unknown> | Observable<unknown>;
}
