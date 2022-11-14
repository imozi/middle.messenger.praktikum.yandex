import { Component } from 'core/Component';
import { Route } from './Route';

class Home extends Component {
  render() {
    return `<p>Home<p>`;
  }
}

describe('core/Route', () => {
  document.body.innerHTML = `<div id="root"></div>`;
  const root = document.querySelector('#root');
  const route = new Route('/home', Home, root as HTMLElement, false);

  it('must be defined', () => {
    expect(route).toBeDefined();
  });

  it('should mount element to dom', () => {
    route.mount();

    const text =
      document.querySelector('#root')?.firstElementChild?.textContent;
    expect(text).toEqual('Home');
  });

  it('should unmount element to dom', () => {
    route.unmount();

    const el = document.querySelector('#root')?.firstElementChild;

    expect(el).toEqual(null);
  });
});
