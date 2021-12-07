import './scss/index.scss';
import { FormComponent } from '@/components/Form.component';
import { DataService } from '@core/Data.service';
import { ListComponent } from '@/components/List.component';

export const dataService = new DataService();
dataService.getDriverList();

new FormComponent();
new ListComponent(document.querySelector('.list'), [
  { prop: 'id', name: 'ID' },
  { prop: 'fullName', name: 'Name' },
  { prop: 'email', name: 'Email' },
  { prop: 'city', name: 'City' },
]);

console.log('start');
