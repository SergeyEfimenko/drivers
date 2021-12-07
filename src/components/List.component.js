import {dataService} from '@';

export class ListComponent {
  constructor(wrapper, columnsConfig) {
    this.wrapper = wrapper;
    this.columnsConfig = columnsConfig;
    this._addEventsFunctionList = [];

    dataService.driverList.subscribe(driverList => {
      this.driverList = driverList;
      this.drawList();
    }, true);
  }

  drawList() {
    this.wrapper.innerHTML = '';

    this.wrapper.appendChild(this.createHeader());
    if (this.driverList.length) {
      this.wrapper.append(...this.createListContent());
    } else {
      this.wrapper.appendChild(this.createEmptyListRow());
    }

    this._addEventsFunctionList.forEach(func => func());
    this._addEventsFunctionList = [];
  }

  createHeader() {
    const headerTemplate = document.createElement('div');
    headerTemplate.classList.add('list-header', 'row');

    this.columnsConfig.forEach(column => {
      headerTemplate.innerHTML += `
        <div class="list-header-element col text-center">
            ${column.name}
        </div>
      `;
    });

    headerTemplate.innerHTML += `
        <div class="list-header-element col text-center">
            Actions
        </div>
      `;

    return headerTemplate;
  }

  createListContent() {
    return this.driverList.map(driver => this.createListItemRow(driver));
  }

  createListItemRow(driver) {
    const listItemRow = document.createElement('div');
    listItemRow.classList.add('row', 'mt-2', 'py-2');
    this.columnsConfig.forEach(config => {
      listItemRow.innerHTML += `
        <div class="col text-center">${driver[config.prop]}</div>
      `
    });

    listItemRow.appendChild(this.createActionsCell(driver));

    return listItemRow;
  }

  createActionsCell(driver) {
    const actionsCell = document.createElement('div');
    actionsCell.classList.add('col', 'text-center');
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-sm', 'btn-info', 'mr-2');
    editButton.setAttribute('title', 'Edit Driver');
    editButton.innerHTML = 'E';
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-sm', 'btn-danger');
    deleteButton.setAttribute('title', 'Delete Driver');
    deleteButton.innerHTML = 'D';

    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);

    this._addEventsFunctionList.push(() => {
      editButton.addEventListener('click', () => {
        dataService.selectedDriver.value = driver;
      });
      deleteButton.addEventListener('click', () => {
        dataService.deleteDriver(driver);
      });
    })

    return actionsCell;
  }

  createEmptyListRow() {
    const emptyListRow = document.createElement('div');
    emptyListRow.classList.add('row', 'mt-2');
    emptyListRow.innerHTML = `
      <div class="col text-center py-2">
        No Data to Display
      </div>
    `;
    return emptyListRow;
  }
}
