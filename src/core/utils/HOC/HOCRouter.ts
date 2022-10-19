import { Component } from 'core/Component';
import Router from 'core/Router';

export function HOCRouter(Builder: typeof Component) {
  return class extends Builder {
    public static componentName = Builder.componentName || Builder.name;

    protected router = Router;

    constructor(props: any) {
      super({ ...props });
      this.hocs.router = Router;
    }
  };
}
