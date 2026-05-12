import { Category } from './category.model';

export interface avaliableBooks {
  id: number;
  title: string;
  author: string;
  isbn: string;
  categories: Category[];
  copies: number;
  availableCopies?: number;
  displayname?: string;
  bookCondition?: string;
}