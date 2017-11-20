import Model from 'Model';

export class Person extends Model {
  constructor (first, last) {
    super();
    this.set('first', first);
    this.set('last', last);
  }

  fullName () {
    return `${this.get('first')} ${this.get('last')}`;
  }
};
