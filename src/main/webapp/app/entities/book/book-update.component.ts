import { Component, Inject } from 'vue-property-decorator';

import { mixins } from 'vue-class-component';
import JhiDataUtils from '@/shared/data/data-utils.service';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import PublisherService from '../publisher/publisher.service';
import { IPublisher } from '@/shared/model/publisher.model';

import AuthorService from '../author/author.service';
import { IAuthor } from '@/shared/model/author.model';

import AlertService from '@/shared/alert/alert.service';
import { IBook, Book } from '@/shared/model/book.model';
import BookService from './book.service';

const validations: any = {
  book: {
    isbn: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(13),
    },
    name: {
      required,
      maxLength: maxLength(100),
    },
    publishYear: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(50),
    },
    copies: {
      required,
      numeric,
    },
    cover: {},
  },
};

@Component({
  validations,
})
export default class BookUpdate extends mixins(JhiDataUtils) {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('bookService') private bookService: () => BookService;
  public book: IBook = new Book();

  @Inject('publisherService') private publisherService: () => PublisherService;

  public publishers: IPublisher[] = [];

  @Inject('authorService') private authorService: () => AuthorService;

  public authors: IAuthor[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.bookId) {
        vm.retrieveBook(to.params.bookId);
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
    this.book.authors = [];
  }

  public save(): void {
    this.isSaving = true;
    if (this.book.id) {
      this.bookService()
        .update(this.book)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.book.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.bookService()
        .create(this.book)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.book.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveBook(bookId): void {
    this.bookService()
      .find(bookId)
      .then(res => {
        this.book = res;
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public clearInputImage(field, fieldContentType, idInput): void {
    if (this.book && field && fieldContentType) {
      if (this.book.hasOwnProperty(field)) {
        this.book[field] = null;
      }
      if (this.book.hasOwnProperty(fieldContentType)) {
        this.book[fieldContentType] = null;
      }
      if (idInput) {
        (<any>this).$refs[idInput] = null;
      }
    }
  }

  public initRelationships(): void {
    this.publisherService()
      .retrieve()
      .then(res => {
        this.publishers = res.data;
      });
    this.authorService()
      .retrieve()
      .then(res => {
        this.authors = res.data;
      });
  }

  public getSelected(selectedVals, option): any {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
