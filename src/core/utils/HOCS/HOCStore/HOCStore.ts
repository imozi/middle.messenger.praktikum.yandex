import { Store } from 'core/Store';
import { deepCompare } from 'core/utils/deepCompare';
import { store } from 'store';

export function HOCStore(setStoreToProps: (state: any) => any, Builder: any) {
  return class extends Builder {
    public static componentName = Builder.componentName || Builder.name;

    constructor(props: any) {
      let state = { ...setStoreToProps(store.getStore()) };

      super({ ...props, ...state });

      store.on(Store.EVENTS.UPDATED, () => {
        const newState = { ...setStoreToProps(store.getStore()) };

        if (!deepCompare(state, newState)) {
          this.setProps({ ...setStoreToProps(store.getStore()) });
        }

        state = newState;
      });
    }
  };
}
