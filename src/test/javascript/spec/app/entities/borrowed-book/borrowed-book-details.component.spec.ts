/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import BorrowedBookDetailComponent from '@/entities/borrowed-book/borrowed-book-details.vue';
import BorrowedBookClass from '@/entities/borrowed-book/borrowed-book-details.component';
import BorrowedBookService from '@/entities/borrowed-book/borrowed-book.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('BorrowedBook Management Detail Component', () => {
    let wrapper: Wrapper<BorrowedBookClass>;
    let comp: BorrowedBookClass;
    let borrowedBookServiceStub: SinonStubbedInstance<BorrowedBookService>;

    beforeEach(() => {
      borrowedBookServiceStub = sinon.createStubInstance<BorrowedBookService>(BorrowedBookService);

      wrapper = shallowMount<BorrowedBookClass>(BorrowedBookDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { borrowedBookService: () => borrowedBookServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundBorrowedBook = { id: 123 };
        borrowedBookServiceStub.find.resolves(foundBorrowedBook);

        // WHEN
        comp.retrieveBorrowedBook(123);
        await comp.$nextTick();

        // THEN
        expect(comp.borrowedBook).toBe(foundBorrowedBook);
      });
    });
  });
});
