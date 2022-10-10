function FirstSecondName(value: string, name?: string): boolean | never {
  const regexp = /^[А-ЯA-Z][а-яa-z-]+$/;

  if (!regexp.test(value)) {
    throw new Error(
      `В поле ${name} допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, без спецсимволов (допустим только дефис)`,
    );
  }

  return true;
}

function Login(value: string): boolean | never {
  const regexp = /^[a-zA-Z][a-zA-Z0-9_-]{2,20}$/;

  if (!regexp.test(value)) {
    throw new Error(
      `Логин может должен от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
    );
  }

  return true;
}

function Password(value: string): boolean | never {
  const regexp = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;

  if (!regexp.test(value)) {
    throw new Error(
      `Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра`,
    );
  }
  return true;
}

function PasswordRepeat(value1: string, value2: string): boolean | never {
  if (value1 !== value2) {
    throw new Error(`Пароли должны совпадать`);
  }
  return true;
}

function Email(value: string): boolean | never {
  const regexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

  if (!regexp.test(value)) {
    throw new Error(
      `Email должен быть на латинице, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы`,
    );
  }
  return true;
}

function Phone(value: string): boolean | never {
  const regexp = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){9}\d$/;

  if (!regexp.test(value)) {
    throw new Error(
      `Телфон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса`,
    );
  }
  return true;
}

function Message(value: string): boolean | never {
  if (!value) {
    throw new Error(`Сообщение не должно быть пустым`);
  }
  return true;
}

export const validation: Record<string, Function> = {
  first_name: FirstSecondName,
  second_name: FirstSecondName,
  login: Login,
  password: Password,
  passwordRepeated: PasswordRepeat,
  email: Email,
  phone: Phone,
  message: Message,
};
