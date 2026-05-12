import { Category } from './category.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  categories: Category[];
  copies: number;
  availableCopies: number;
  bookCondition: string;
}

export interface CreateBookPayload {
  title: string;
  author: string;
  isbn: string;
  categoriesIds: number[];
  copies: number;
}
