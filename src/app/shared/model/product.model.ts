import { Category } from './category';

export interface ProductModel {
    id: number;
    name: string;
    description: string;
    price: number;
    category: Category;
    isAvailable: boolean;
}