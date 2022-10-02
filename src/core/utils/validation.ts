export class Validation {
  static FirstSecondName(value: string, name?: string): boolean | string {
    const regexp = /^[А-ЯA-Z][а-яa-z-]+$/;

    if (!regexp.test(value)) {
      throw new Error(
        `В поле ${name} допускается латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, без спецсимволов (допустим только дефис)`,
      );
    }

    return true;
  }

  static Login(value: string): boolean | string {
    const regexp = /^[a-zA-Z][a-zA-Z0-9_-]{2,20}$/;

    if (!regexp.test(value)) {
      throw new Error(
        `Логин может должен от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)`,
      );
    }

    return true;
  }

  static Password(value: string): boolean | string {
    const regexp = /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/;

    if (!regexp.test(value)) {
      throw new Error(
        `Пароль должен быть от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра`,
      );
    }
    return true;
  }

  static PasswordRepeat(value1: string, value2: string): boolean | string {
    if (value1 !== value2) {
      throw new Error(`Пароли должны совпадать`);
    }
    return true;
  }

  static Email(value: string): boolean | string {
    const regexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;

    if (!regexp.test(value)) {
      throw new Error(
        `Email должен быть на латинице, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы`,
      );
    }
    return true;
  }

  static Phone(value: string): boolean | string {
    const regexp = /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){9}\d$/;

    if (!regexp.test(value)) {
      throw new Error(
        `Телфон должен быть от 10 до 15 символов, состоять из цифр, может начинается с плюса`,
      );
    }
    return true;
  }

  static Message(value: string): boolean | string {
    if (!value) {
      throw new Error(`Сообщение не должно быть пустым`);
    }
    return true;
  }
}
