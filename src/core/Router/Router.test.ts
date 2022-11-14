import { Component } from 'core/Component';
import { Router } from './Router';

class Home extends Component {
  render() {
    return `<p>Home<p>`;
  }
}

class About extends Component {
  render() {
    return `<p>About<p>`;
  }
}

describe('core/Router', () => {
  document.body.innerHTML = `<div id="root"></div>`;
  const route = new Router();
  route.use('/home', Home).use('/about', About);

  it('must be defined', () => {
    expect(route).toBeDefined();
  });

  it('should ragistration route', () => {
    // @ts-ignore
    expect(route._routes.length).toEqual(2);
  });

  it('should error root', () => {
    try {
      route.go('/home');
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual('Root не найден!');
    }
  });
});
