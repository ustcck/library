/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import AuthorDetailComponent from '@/entities/author/author-details.vue';
import AuthorClass from '@/entities/author/author-details.component';
import AuthorService from '@/entities/author/author.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Author Management Detail Component', () => {
    let wrapper: Wrapper<AuthorClass>;
    let comp: AuthorClass;
    let authorServiceStub: SinonStubbedInstance<AuthorService>;

    beforeEach(() => {
      authorServiceStub = sinon.createStubInstance<AuthorService>(AuthorService);

      wrapper = shallowMount<AuthorClass>(AuthorDetailComponent, {
        store,
        i18n,
        localVue,
        provide: { authorService: () => authorServiceStub },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundAuthor = { id: 123 };
        authorServiceStub.find.resolves(foundAuthor);

        // WHEN
        comp.retrieveAuthor(123);
        await comp.$nextTick();

        // THEN
        expect(comp.author).toBe(foundAuthor);
      });
    });
  });
});
