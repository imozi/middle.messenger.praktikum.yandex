import { Component } from 'core/Component';
import Store from 'core/Store';

export function HOCStore(
  setStoreToProps: (store: any) => any,
  Builder: typeof Component,
) {
  return class extends Builder {
    public static componentName = Builder.componentName || Builder.name;

    constructor(props: any) {
      super({ ...props, ...setStoreToProps(Store.getStore()) });
    }
  };
}
