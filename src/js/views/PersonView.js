import View from 'view';

export class PersonView extends View {
  constructor (model) {
    super(model);
  }

  notify(notifier, method, ...args) {
    if (notifier === this.model && method === 'set') this.redraw();
  }

  redraw () {
    document
      .querySelector(`person-${this.model.id}`)
      .text(this.model.fullName())
  }

}
