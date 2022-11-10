import Router from 'core/Router';

export function HOCRouter(Builder: any) {
  return class extends Builder {
    public static componentName = Builder.componentName || Builder.name;

    constructor(props: any) {
      super({ ...props, router: Router });
    }
  };
}
