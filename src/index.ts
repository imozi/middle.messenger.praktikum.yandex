import './css/style.css';
import 'components';
import 'partials';
import { HomePage } from 'pages/Home';
import { SignInPage } from 'pages/SignIn';
import { SignUpPage } from 'pages/SignUp';
import { MessengerPage } from 'pages/Messenger';
import { SettingsPage } from 'pages/Settings';
import { NotFound } from 'pages/Error/404';
import { ServError } from 'pages/Error/500';
import Auth from 'services/Auth';
import Router from 'core/Router';

Auth.user().then(() => {
  Router.use('/', HomePage)
    .use('/sign-in', SignInPage)
    .use('/sign-up', SignUpPage)
    .use('/messenger', MessengerPage, true)
    .use('/settings', SettingsPage, true)
    .use('/404', NotFound)
    .use('/500', ServError)
    .start();
});
