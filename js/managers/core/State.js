class State {
  constructor(props) {
    this._state = props;
  }

  set state(state) {
    this._state = {...this._state, ...state};
  }

  get state() {
    return this._state;
  }

  set globals(state) {
    this._state = {
      ...this._state,
      globals: {
        ...this._state.globals,
        ...state
      }
    };
  }

  get globals() {
    return this._state.globals;
  }

  set events(state) {
    this._state = {
      ...this._state,
      events: {
        ...this._state.events,
        ...state
      }
    };
  }

  get events() {
    return this._state.events;
  }

  set skills(state) {
    this._state = {
      ...this._state,
      skills: {
        ...this._state.skills,
        ...state
      }
    };
  }

  get skills() {
    return this._state.skills;
  }

  set parameters(state) {
    this._state = {
      ...this._state,
      parameters: {
        ...this._state.parameters,
        ...state
      }
    };
  }

  get parameters() {
    return this._state.parameters;
  }

  set managers(state) {
    this._state = {
      ...this._state,
      managers: {
        ...this._state.managers,
        ...state
      }
    };
  }

  get managers() {
    return this._state.managers;
  }

  set solutions(state) {
    this._state = {
      ...this._state,
      solutions: {
        ...this._state.solutions,
        ...state
      }
    };
  }

  get solutions() {
    return this._state.solutions;
  }

  getIgnoreObject(propsArr) {
    let obj = {};

    for ( let id in propsArr ) {
      obj[propsArr[id]] = null;
    }

    return obj;
  }

  ignore(propsArr) {
    this.state = this.getIgnoreObject(propsArr);
    return this;
  }

  ignoreGlobals(propsArr) {
    this.globals = this.getIgnoreObject(propsArr);;
    return this;
  }

  ignoreSkills(propsArr) {
    this.skills = this.getIgnoreObject(propsArr);;
    return this;
  }

  ignoreEvents(propsArr) {
    this.events = this.getIgnoreObject(propsArr);;
    return this;
  }

  ignoreParameters(propsArr) {
    this.props = this.getIgnoreObject(propsArr);;
    return this;
  }

  ignoreSolutions(propsArr) {
    this.solutions = this.getIgnoreObject(propsArr);;
    return this;
  }

  ignoreManagers(propsArr) {
    this.managers = this.getIgnoreObject(propsArr);;
    return this;
  }
}

export default State;
