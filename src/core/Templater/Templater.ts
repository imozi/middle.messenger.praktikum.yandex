import hbs, { HelperOptions } from 'handlebars';
import { Component } from 'core/Component';
import { helpers } from './helpers';

interface ComponentConstructable<Props = any> {
  new (props: Props): Component;
}

export class Templater {
  protected template = new Map();

  protected helpers = new Map();

  protected components = new Map();

  constructor() {
    this._regHelpers(helpers);
  }

  setTemplate(id: string, template: string) {
    const tmp = hbs.compile(template);
    this.template.set(id, tmp);
  }

  getTemplate(id: string) {
    return this.template.get(id);
  }

  _regHelpers(obj: object) {
    Object.entries(obj).forEach(([key, fn]) => {
      hbs.registerHelper(key, fn);
      this.helpers.set(key, hbs.helpers[key]);
    });
  }

  regComponents(Cmpnt: ComponentConstructable) {
    hbs.registerHelper(
      Cmpnt.name,
      ({ hash: { ref, ...hash }, data }: HelperOptions) => {
        if (!data.root.children) {
          data.root.children = {};
        }

        if (!data.root.refs) {
          data.root.refs = {};
        }

        const { children, refs } = data.root;

        const component = new Cmpnt(hash);

        children[component.id] = component;
        this.components.set(Cmpnt.name, hbs.helpers[Cmpnt.name]);

        if (ref) {
          refs[ref] = component;
        }
        return `<component id="${component.id}"></component>`;
      },
    );
  }
}
