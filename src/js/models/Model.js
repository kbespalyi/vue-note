export class Model {
  constructor () {
    this.listeners = new Set();
  }

  get (property) {
    this.notifyAll('get', property, this[property]);
    return this[property];
  }

  set (property, value) {
    this.notifyAll('set', property, value);
    return this[property] = value;
  }

  addListener (listener) {
    this.listeners.add(listener);
  }

  deleteListener (listener) {
    this.listeners.delete(listener);
  }

  notifyAll (message, ...args) {
    for (let listener of this.listeners) {
      listener.notify(this, message, ...args);
    }
  }
}
