import { by, element, ElementFinder } from 'protractor';

import AlertPage from '../../page-objects/alert-page';

export default class ClientUpdatePage extends AlertPage {
  title: ElementFinder = element(by.id('libraryApp.client.home.createOrEditLabel'));
  footer: ElementFinder = element(by.id('footer'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));

  firstNameInput: ElementFinder = element(by.css('input#client-firstName'));

  lastNameInput: ElementFinder = element(by.css('input#client-lastName'));

  emailInput: ElementFinder = element(by.css('input#client-email'));

  addressInput: ElementFinder = element(by.css('input#client-address'));

  phoneInput: ElementFinder = element(by.css('input#client-phone'));
}
