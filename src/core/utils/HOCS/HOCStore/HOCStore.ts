import { Component } from 'core/Component';
import { Store } from 'core/Store';
import { store } from 'store';

export function HOCStore(
  setStoreToProps: (state: any) => any,
  Builder: typeof Component,
) {
  return class extends Builder {
    public static componentName = Builder.componentName || Builder.name;

    constructor(props: any) {
      super({ ...props, ...setStoreToProps(store.getStore()) });

      store.on(Store.EVENTS.UPDATED, () => {
        this.setProps({ ...setStoreToProps(store.getStore()) });
      });
    }
  };
}
