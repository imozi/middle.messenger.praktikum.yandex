import { Component } from 'core/Component';
import { debounce, Validation } from 'core/utils';

interface InputProps {
  id: string;
  text: string;
  type: string;
  hide?: string;
  events?: {
    blur?: (e: Event) => void;
    focus?: (e: Event) => void;
    keyup?: (e: Event) => void;
    keydown?: (e: Event) => void;
  };
}

const validation: { [key: string]: Function } = {
  first_name: Validation.FirstSecondName,
  second_name: Validation.FirstSecondName,
  login: Validation.Login,
  password: Validation.Password,
  passwordRepeated: Validation.PasswordRepeat,
  email: Validation.Email,
  phone: Validation.Phone,
  message: Validation.Message,
};

export class Input extends Component {
  static componentName = 'Input';

  constructor(props: InputProps) {
    const onValidate = (evt: { target: HTMLInputElement }) => {
      const target = evt.target;

      try {
        const isValid = validation[target.name];
        const pwd = this.refs.password?.getEl() as HTMLInputElement;

        target.name === 'passwordRepeated'
          ? isValid(target.value, pwd.value)
          : isValid(
              target.value,
              target.name === 'first_name' ? 'Фамилия' : 'Имя',
            );
      } catch (error: Error | any) {
        const root = document.getElementById('root');
        const notification = this.refs.notification;

        if (target.value) {
          target.dataset.invalid = 'true';
        }

        notification.setProps({
          type: target.value ? 'error' : 'info',
          text: error.message,
        });

        if (root?.contains(notification.getEl())) {
          notification.show();
          notification.getEl().click();
        }
      }
    };

    const onKeyDown = (evt: { target: HTMLInputElement }) => {
      const target = evt.target;

      if (target.dataset.invalid === 'true') {
        target.dataset.invalid = 'false';
      }
    };
    super({
      ...props,
      events: {
        blur: debounce(onValidate),
        focus: debounce(onValidate),
        keydown: debounce(onKeyDown),
      },
    });
  }

  render() {
    return `
      <input 
      type={{type}} 
      id={{id}} 
      name={{name}} 
      placeholder="{{placeholder}}" 
      {{#if value}}value="{{value}}"{{/if}}
      {{#if pattern}}pattern={{pattern}}{{/if}} 
      {{#if hide}}data-hide={{hide}}{{/if}} 
      data-invalid="false"
      required
      >
    `;
  }
}
