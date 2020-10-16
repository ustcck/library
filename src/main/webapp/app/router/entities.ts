import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore

// prettier-ignore
const Publisher = () => import('@/entities/publisher/publisher.vue');
// prettier-ignore
const PublisherUpdate = () => import('@/entities/publisher/publisher-update.vue');
// prettier-ignore
const PublisherDetails = () => import('@/entities/publisher/publisher-details.vue');
// prettier-ignore
const Author = () => import('@/entities/author/author.vue');
// prettier-ignore
const AuthorUpdate = () => import('@/entities/author/author-update.vue');
// prettier-ignore
const AuthorDetails = () => import('@/entities/author/author-details.vue');
// prettier-ignore
const Client = () => import('@/entities/client/client.vue');
// prettier-ignore
const ClientUpdate = () => import('@/entities/client/client-update.vue');
// prettier-ignore
const ClientDetails = () => import('@/entities/client/client-details.vue');
// prettier-ignore
const Book = () => import('@/entities/book/book.vue');
// prettier-ignore
const BookUpdate = () => import('@/entities/book/book-update.vue');
// prettier-ignore
const BookDetails = () => import('@/entities/book/book-details.vue');
// prettier-ignore
const BorrowedBook = () => import('@/entities/borrowed-book/borrowed-book.vue');
// prettier-ignore
const BorrowedBookUpdate = () => import('@/entities/borrowed-book/borrowed-book-update.vue');
// prettier-ignore
const BorrowedBookDetails = () => import('@/entities/borrowed-book/borrowed-book-details.vue');
// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default [
  {
    path: '/publisher',
    name: 'Publisher',
    component: Publisher,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/publisher/new',
    name: 'PublisherCreate',
    component: PublisherUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/publisher/:publisherId/edit',
    name: 'PublisherEdit',
    component: PublisherUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/publisher/:publisherId/view',
    name: 'PublisherView',
    component: PublisherDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/author',
    name: 'Author',
    component: Author,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/author/new',
    name: 'AuthorCreate',
    component: AuthorUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/author/:authorId/edit',
    name: 'AuthorEdit',
    component: AuthorUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/author/:authorId/view',
    name: 'AuthorView',
    component: AuthorDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client',
    name: 'Client',
    component: Client,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/new',
    name: 'ClientCreate',
    component: ClientUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/:clientId/edit',
    name: 'ClientEdit',
    component: ClientUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/client/:clientId/view',
    name: 'ClientView',
    component: ClientDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/book',
    name: 'Book',
    component: Book,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/book/new',
    name: 'BookCreate',
    component: BookUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/book/:bookId/edit',
    name: 'BookEdit',
    component: BookUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/book/:bookId/view',
    name: 'BookView',
    component: BookDetails,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/borrowed-book',
    name: 'BorrowedBook',
    component: BorrowedBook,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/borrowed-book/new',
    name: 'BorrowedBookCreate',
    component: BorrowedBookUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/borrowed-book/:borrowedBookId/edit',
    name: 'BorrowedBookEdit',
    component: BorrowedBookUpdate,
    meta: { authorities: [Authority.USER] },
  },
  {
    path: '/borrowed-book/:borrowedBookId/view',
    name: 'BorrowedBookView',
    component: BorrowedBookDetails,
    meta: { authorities: [Authority.USER] },
  },
  // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
];
