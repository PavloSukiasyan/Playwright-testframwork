import { Page } from '@playwright/test';

export default class UserRoleModalComponent {
  constructor(private readonly page: Page) {}

  modalWindowForRole = this.page.locator('dialog[class*="UserRoleModal"]');

  optionHomeowner = this.modalWindowForRole.locator('input#user-homeowner');

  optionTraderOwner = this.modalWindowForRole.locator('input#user-trader');

  btnConfirm = this.modalWindowForRole.locator('button[class*="Button_primary"]');

  clickOnHomeowner = async () => { await this.optionHomeowner.click(); };

  clickOnTradeOwner = async () => { await this.optionTraderOwner.click(); };

  clickOnConfirmBtn = async () => { await this.btnConfirm.click(); };

  setHomeowner = async () => {
    this.clickOnHomeowner();
    this.clickOnConfirmBtn();
  };
}
