import 'components';
import { HomePage } from 'pages/Home';
import { LoginPage } from 'pages/Login';
import { RegistrationPage } from 'pages/Registration';
import { ChatPage } from 'pages/Chat';
import { NotFound } from 'pages/Error/404';
import { ServError } from 'pages/Error/500';
import { Router } from 'core/Router';

const router = new Router();

router
  .use('/', HomePage)
  .use('/login', LoginPage)
  .use('/registration', RegistrationPage)
  .use('/chat', ChatPage)
  .use('/404', NotFound)
  .use('/500', ServError)
  .start();
