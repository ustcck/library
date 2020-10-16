import { IBook } from '@/shared/model/book.model';
import { IClient } from '@/shared/model/client.model';

export interface IBorrowedBook {
  id?: number;
  borrowDate?: Date;
  book?: IBook;
  client?: IClient;
}

export class BorrowedBook implements IBorrowedBook {
  constructor(public id?: number, public borrowDate?: Date, public book?: IBook, public client?: IClient) {}
}
