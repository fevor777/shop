import { ProductModel } from './product.model';

export interface CartProductModel extends ProductModel {
    count: number;
}