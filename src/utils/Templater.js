import hbs from 'handlebars';

class Templater {
  constructor() {
    this.templates = new Map();
    this.patrials = new Map();
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
}

export default new Templater();
