import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import BookService from '../book/book.service';
import { IBook } from '@/shared/model/book.model';

import ClientService from '../client/client.service';
import { IClient } from '@/shared/model/client.model';

import AlertService from '@/shared/alert/alert.service';
import { IBorrowedBook, BorrowedBook } from '@/shared/model/borrowed-book.model';
import BorrowedBookService from './borrowed-book.service';

const validations: any = {
  borrowedBook: {
    borrowDate: {},
  },
};

@Component({
  validations,
})
export default class BorrowedBookUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('borrowedBookService') private borrowedBookService: () => BorrowedBookService;
  public borrowedBook: IBorrowedBook = new BorrowedBook();

  @Inject('bookService') private bookService: () => BookService;

  public books: IBook[] = [];

  @Inject('clientService') private clientService: () => ClientService;

  public clients: IClient[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.borrowedBookId) {
        vm.retrieveBorrowedBook(to.params.borrowedBookId);
      }
      vm.initRelationships();
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.borrowedBook.id) {
      this.borrowedBookService()
        .update(this.borrowedBook)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.borrowedBook.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.borrowedBookService()
        .create(this.borrowedBook)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.borrowedBook.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBorrowedBook(borrowedBookId): void {
    this.borrowedBookService()
      .find(borrowedBookId)
      .then(res => {
        this.borrowedBook = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.bookService()
      .retrieve()
      .then(res => {
        this.books = res.data;
      });
    this.clientService()
      .retrieve()
      .then(res => {
        this.clients = res.data;
      });
  }
}
