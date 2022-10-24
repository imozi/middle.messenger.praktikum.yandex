import { Component } from 'core/Component';
import { store } from 'store';

export function HOCStore(
  setStoreToProps: (state: any) => any,
  Builder: typeof Component,
) {
  return class extends Builder {
    public static componentName = Builder.componentName || Builder.name;

    constructor(props: any) {
      super({ ...props, ...setStoreToProps(store.getStore()) });
    }
  };
}
