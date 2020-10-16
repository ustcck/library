/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';

import AlertService from '@/shared/alert/alert.service';
import * as config from '@/shared/config/config';
import BorrowedBookUpdateComponent from '@/entities/borrowed-book/borrowed-book-update.vue';
import BorrowedBookClass from '@/entities/borrowed-book/borrowed-book-update.component';
import BorrowedBookService from '@/entities/borrowed-book/borrowed-book.service';

import BookService from '@/entities/book/book.service';

import ClientService from '@/entities/client/client.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.component('font-awesome-icon', {});

describe('Component Tests', () => {
  describe('BorrowedBook Management Update Component', () => {
    let wrapper: Wrapper<BorrowedBookClass>;
    let comp: BorrowedBookClass;
    let borrowedBookServiceStub: SinonStubbedInstance<BorrowedBookService>;

    beforeEach(() => {
      borrowedBookServiceStub = sinon.createStubInstance<BorrowedBookService>(BorrowedBookService);

      wrapper = shallowMount<BorrowedBookClass>(BorrowedBookUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          alertService: () => new AlertService(store),
          borrowedBookService: () => borrowedBookServiceStub,

          bookService: () => new BookService(),

          clientService: () => new ClientService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.borrowedBook = entity;
        borrowedBookServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(borrowedBookServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.borrowedBook = entity;
        borrowedBookServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(borrowedBookServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });
  });
});
