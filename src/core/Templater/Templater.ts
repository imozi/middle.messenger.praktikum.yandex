import hbs from 'handlebars';
import { helpers } from './helpers';

class Templater {
  protected template = new Map();

  protected helpers = new Map();

  protected components = new Map();

  constructor() {
    this._regHelpers(helpers);
  }

  setTemplate(id, template) {
    const tmp = hbs.compile(template);
    this.template.set(id, tmp);
  }

  getTemplate(id) {
    return this.template.get(id);
  }

  _regHelpers(helpers) {
    Object.entries(helpers).forEach(([key, fn]) => {
      hbs.registerHelper(key, fn);
      this.helpers.set(key, hbs.helpers[key]);
    });
  }

  regComponents(Component) {
    hbs.registerHelper(Component.name, ({ hash: { ref, ...hash }, data }) => {
      if (!data.root.children) {
        data.root.children = {};
      }

      if (!data.root.refs) {
        data.root.refs = {};
      }

      const { children, refs } = data.root;

      const component = new Component(hash);

      children[component.id] = component;
      this.components.set(Component.name, hbs.helpers[Component.name]);

      if (ref) {
        refs[ref] = component;
      }
      return `<component id="${component.id}"></component>`;
    });
  }
}

export default new Templater();
