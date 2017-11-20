export class View {
  constructor (model) {
    this.model = model;
    model.addListener(this);
  }
}
