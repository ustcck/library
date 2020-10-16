import { Component, Vue, Inject } from 'vue-property-decorator';

import { numeric, required, minLength, maxLength, minValue, maxValue } from 'vuelidate/lib/validators';

import BookService from '../book/book.service';
import { IBook } from '@/shared/model/book.model';

import AlertService from '@/shared/alert/alert.service';
import { IAuthor, Author } from '@/shared/model/author.model';
import AuthorService from './author.service';

const validations: any = {
  author: {
    firstName: {
      required,
      maxLength: maxLength(50),
    },
    lastName: {
      required,
      maxLength: maxLength(50),
    },
  },
};

@Component({
  validations,
})
export default class AuthorUpdate extends Vue {
  @Inject('alertService') private alertService: () => AlertService;
  @Inject('authorService') private authorService: () => AuthorService;
  public author: IAuthor = new Author();

  @Inject('bookService') private bookService: () => BookService;

  public books: IBook[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.authorId) {
        vm.retrieveAuthor(to.params.authorId);
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
    if (this.author.id) {
      this.authorService()
        .update(this.author)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.author.updated', { param: param.id });
          this.alertService().showAlert(message, 'info');
        });
    } else {
      this.authorService()
        .create(this.author)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('libraryApp.author.created', { param: param.id });
          this.alertService().showAlert(message, 'success');
        });
    }
  }

  public retrieveAuthor(authorId): void {
    this.authorService()
      .find(authorId)
      .then(res => {
        this.author = res;
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
  }
}
