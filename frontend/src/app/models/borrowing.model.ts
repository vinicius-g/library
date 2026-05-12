export interface Borrowing {
  id: number;
  username: string;
  bookDTO: { id: number; title: string; author: string };
  borrowedAt: string;
  mustReturnAt: string;
  returnedAt: string | null;
}

export interface CreateBorrowingPayload {
  userId: number;
  bookId: number;
  mustReturnAt: string;
}

export interface ReturnBookPayload {
  borrowingId: number;
  returnedAt: string;
  bookCondition: string;
}
