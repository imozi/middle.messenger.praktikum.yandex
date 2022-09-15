export const data = {
  action: '#',
  method: 'post',
  class: 'login__form',
  header: {
    class: 'login__header',
    title: 'Вход',
  },
  inputs: [
    {
      id: 'login',
      title: 'Логин',
      type: 'text',
      name: 'login',
      placeholder: 'Ваш логин',
      icon: 'user',
    },
    {
      id: 'password',
      title: 'Пароль',
      type: 'password',
      name: 'password',
      placeholder: 'Пароль',
      icon: 'hide',
    },
  ],
  button: {
    class: 'btn--blue',
    text: 'Авторизация',
    type: 'submit',
  },
  link: {
    url: 'registration',
    text: 'У вас нет аккаунта?',
    class: 'login__link',
  },
};
