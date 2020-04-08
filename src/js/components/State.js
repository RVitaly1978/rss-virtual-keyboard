class State {
  constructor(initialState = {}) {
    this.state = initialState;
    this.observers = [];

    this.notify = this.notify.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.update = this.update.bind(this);
  }

  subscribe(f) {
    this.observers.push(f);
  }

  unsubscribe(f) {
    this.observers = this.observers.filter((subscriber) => subscriber !== f);
  }

  notify() {
    this.observers.forEach((observer) => observer(this.state));
  }

  update(state = {}) {
    this.state = { ...this.state, ...state };
  }

  getState() {
    return this.state;
  }
}

export default State;
