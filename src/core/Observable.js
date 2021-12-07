export class Observable {
  constructor(initialValue) {
    this.subscriptions = [];
    this.value = initialValue || null;
  }

  subscribe(callback, callOnSubscribe) {
    this.subscriptions.push(callback);

    if (callOnSubscribe) {
      callback(this.value);
    }

    callback.unsubscribe = () => {
      this.subscriptions = this.subscriptions.filter(subcription => {
        return subcription !== callback;
      })
    }

    return callback;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;

    share(this.subscriptions, this._value);
  }
}

function share(subscriptions, value) {
  subscriptions.forEach(callback => {
    callback(value);
  })
}
