import { Component, Vue, Inject } from 'vue-property-decorator';

import { IBorrowedBook } from '@/shared/model/borrowed-book.model';
import BorrowedBookService from './borrowed-book.service';

@Component
export default class BorrowedBookDetails extends Vue {
  @Inject('borrowedBookService') private borrowedBookService: () => BorrowedBookService;
  public borrowedBook: IBorrowedBook = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.borrowedBookId) {
        vm.retrieveBorrowedBook(to.params.borrowedBookId);
      }
    });
  }

  public retrieveBorrowedBook(borrowedBookId) {
    this.borrowedBookService()
      .find(borrowedBookId)
      .then(res => {
        this.borrowedBook = res;
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
