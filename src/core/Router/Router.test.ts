import { Component } from 'core/Component';
import { store } from 'store';
import { User } from 'store/User';
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

class SingIn extends Component {
  render() {
    return `<p>Sign-in<p>`;
  }
}

describe('core/Router', () => {
  document.body.innerHTML = `<div id="root"></div>`;
  const route = new Router();
  route.use('/home', Home).use('/about', About, true).use('/sign-in', SingIn);

  it('must be defined', () => {
    expect(route).toBeDefined();
  });

  it('should added route', () => {
    // @ts-ignore
    expect(route._routes.length).toEqual(3);
  });

  it('should redirect with not user', () => {
    route.go('/about');
    expect(window.location.pathname).toEqual('/sign-in');
  });

  it('should open private page', () => {
    const user = { id: 123 };
    store.dispatch(User.ACTION.SET_USER, user);

    route.go('/about');
    expect(window.location.pathname).toEqual('/about');
  });

  it('should throw error with no root', () => {
    document.body.innerHTML = '';

    try {
      route.go('/home');
    } catch (error) {
      // @ts-ignore
      expect(error.message).toEqual('Root не найден!');
    }
  });
});
