import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class BookUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('libraryApp.book.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  isbnInput: ElementFinder = element(by.css('input#book-isbn'));

  nameInput: ElementFinder = element(by.css('input#book-name'));

  publishYearInput: ElementFinder = element(by.css('input#book-publishYear'));

  copiesInput: ElementFinder = element(by.css('input#book-copies'));

  coverInput: ElementFinder = element(by.css('input#file_cover'));

  publisherSelect = element(by.css('select#book-publisher'));

  authorSelect = element(by.css('select#book-author'));
}
