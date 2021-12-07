import { dataService } from '@';

export class FormComponent {
  constructor() {
    this.formItemList = [];
    this.driverId = null;
    this.cancelBtn = document.querySelector('[data-action="cancelForm"]');

    dataService.selectedDriver.subscribe((driver) => {
      this.setFormValuesFromDriver(driver);
      this.driverId = driver.id;
      this.cancelBtn.classList.remove('d-none');
    });

    this.init();

    console.log('test');
  }

  init() {
    this.formItemList = document.querySelectorAll('[data-form]');
    document
      .querySelector('[data-action="saveForm"]')
      .addEventListener('click', () => {
        this.save();
      });
    this.cancelBtn.addEventListener('click', () => {
      this.clearFormFields();
    });
    document.querySelector('.form').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.save();
    });
  }

  save() {
    dataService.saveDriver({
      ...this.getDriverFromForm(),
      id: this.driverId,
    });
    this.clearFormFields();
  }

  getDriverFromForm() {
    const driver = {};
    this.formItemList.forEach((formItem) => {
      if (!formItem.dataset.form) return;
      driver[formItem.dataset.form] = formItem.value;
    });

    driver.fullName = `${driver.firstName} ${driver.lastName}`;

    return driver;
  }

  setFormValuesFromDriver(driver) {
    this.formItemList.forEach((formItem) => {
      formItem.value = driver[formItem.dataset.form];
    });
  }

  clearFormFields() {
    this.formItemList.forEach((formItem) => {
      formItem.value = null;
    });
    this.driverId = null;
    this.cancelBtn.classList.add('d-none');
  }
}
