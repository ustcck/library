import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class AuthorUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('libraryApp.author.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  firstNameInput: ElementFinder = element(by.css('input#author-firstName'));

  lastNameInput: ElementFinder = element(by.css('input#author-lastName'));
}
