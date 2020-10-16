import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class BorrowedBookUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('libraryApp.borrowedBook.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  borrowDateInput: ElementFinder = element(by.css('input#borrowed-book-borrowDate'));

  bookSelect = element(by.css('select#borrowed-book-book'));

  clientSelect = element(by.css('select#borrowed-book-client'));
}
