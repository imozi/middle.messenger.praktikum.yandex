import hbs from 'handlebars';
import helpers from './helpers';

class Templater {
  constructor() {
    this.templates = new Map();
    this.patrials = new Map();
    this.helpers = new Map();
    this._regHelpers(helpers);
  }

  regTmpl(name, template) {
    if (this.templates.has(name)) {
      throw new Error(`Template под именем ${name} уже зарегистрирован!`);
    }

    this.templates.set(name, hbs.compile(template));
  }

  regPart(name, template) {
    if (this.templates.has(name)) {
      throw new Error(`Partial под именем ${name} уже зарегистрирован!`);
    }

    hbs.registerPartial(name, template);
    this.patrials.set(name, hbs.partials[name]);
  }

  renderTmpl(template, props) {
    return this.templates.get(template)(props);
  }

  _regHelpers(obj) {
    for (const [key, value] of Object.entries(obj)) {
      hbs.registerHelper(key, value);
      this.helpers.set(key, hbs.helpers[key]);
    }
  }
}

export default new Templater();
