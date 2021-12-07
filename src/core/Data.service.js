import {Observable} from '@core/Observable';
import {LS_DRIVER_LIST_KEY} from '@/shared/constants';
import {generateId} from '@/shared/healpers';

export class DataService {
  constructor() {
    this.driverList = new Observable([]);
    this.selectedDriver = new Observable(null);
    this.driverFilter = new Observable({});

    this.driverFilter.subscribe(() => {
      this.getDriverList();
    })
  }

  getDriverList() {
    const driverListJSON = localStorage.getItem(LS_DRIVER_LIST_KEY);
    this.driverList.value = driverListJSON ? JSON.parse(driverListJSON) : [];
    return this.driverList.value;
  }

  setDriverList(driverList) {
    if (!driverList) return;
    localStorage.setItem(LS_DRIVER_LIST_KEY, JSON.stringify(driverList));
    this.getDriverList();
  }

  saveDriver(driver) {
    const [existDriver] = this.driverList.value
        .filter(driverFromList => driverFromList.id === driver.id);

    if (existDriver) {
      const newDriverList = [...this.driverList.value];
      const index = this.driverList.value.indexOf(existDriver);
      newDriverList.splice(index, 1, driver);
      this.setDriverList(newDriverList);
    } else {
      driver.id = generateId();
      const newDriverList = [...this.driverList.value, driver];
      this.setDriverList(newDriverList);
    }
  }

  deleteDriver(driver) {
    const [driverFromList] = this.driverList.value
        .filter(item => item.id === driver.id);
    const newDriverList = [...this.driverList.value];
    newDriverList.splice(this.driverList.value.indexOf(driverFromList), 1);
    this.setDriverList(newDriverList);
  }
}
