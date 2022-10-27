import { Component } from 'core/Component';
import { deepCompare } from 'core/utils';

interface PasswordProps {
  className?: string;
  notification?: Component;
}

export class Password extends Component {
  static componentName = 'Password';

  static isUpdate = false;

  constructor(props: PasswordProps) {
    super({ ...props });

    this.setState({
      form: {
        edit: false,
      },
    });

    this.setProps({
      onClickFormBtn: async (evt: Event) => {
        evt.preventDefault();

        const { form } = this.state;
        const button = this.refs.button;
        const target = evt.target as HTMLButtonElement;

        if (!form.edit) {
          this.props.enabledForm();

          form.edit = true;

          button.setProps({
            text: 'Сохранить изменения',
            className: 'btn--green',
          });
          return;
        }

        if (form.edit) {
          if (deepCompare({}, {})) {
            this.props.disabledForm();
            form.edit = false;

            button.setProps({
              text: 'Изменить данные',
              className: 'btn--blue',
            });
            return;
          }

          target.disabled = true;
          // await User.profile(formData);
          Password.isUpdate = true;
        }
      },
      onKeyUpInput: (evt: { target: HTMLInputElement }) => {
        const { formData } = this.state;
        const target = evt.target;

        if (target.dataset.invalid === 'true') {
          target.dataset.invalid = 'false';
        }

        formData[target.name] = target.value;
      },
      onClickShowPassword: () => {
        const password = this.refs.newPassword.getEl() as HTMLInputElement;
        const icon = this.refs.icon;
        const { form } = this.state;

        if (!form.edit) {
          return;
        }

        if (password.type === 'password') {
          password.type = 'text';
          icon.getEl().dataset.hide = 'false';
        } else {
          password.type = 'password';

          icon.getEl().dataset.hide = 'true';
        }
      },
      enabledForm: () => {
        Object.entries(this.refs).forEach(([_, ref]: [string, Component]) => {
          const el = ref.getEl() as HTMLInputElement;
          el.disabled = false;
        });
      },
      disabledForm: () => {
        Object.entries(this.refs).forEach(([_, ref]: [string, Component]) => {
          const el = ref.getEl() as HTMLInputElement;
          el.disabled = true;
        });
      },
      showNotification: (type: string, text: string) => {
        this.props.notification.setProps({
          type,
          text,
        });

        setTimeout(() => {
          this.props.notification.show();
        }, 0);

        this.props.notification.dispatchEvent({ name: 'close' });
      },
    });
  }

  componentWillDidMount() {
    if (!Password.isUpdate) {
      this.hide();
    }
  }

  show() {
    this.el!.dataset.open = 'true';
  }

  hide() {
    this.el!.dataset.open = 'false';
  }

  render() {
    return `
    <section class="password" data-open="true">
      <header class="password__header"><h2>Изменить пароль</h2></header>
      <div class="password__row">
        <form class="form password__form" method="post" ref="form" disabled>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="old_password" text="Старый пароль"}}}
          </div>
          <div class="form__input ">
          {{{Input
            id="old_password"
            type="password"
            name="oldPassword"
            placeholder="Старый пароль"
            ref="oldPassword"
            disabled="true"
            }}}
          </div>
        </div>


        <div class="form__row">
          <div class="form__label">
            {{{Label id="new_password" text="Новый пароль"}}}
          </div>
          <div class="form__input ">
          {{{Input
            id="new_password"
            type="password"
            name="newPassword"
            placeholder="Новый пароль"
            hide="true"
            ref="newPassword"
            disabled="true"
            }}}
            {{{Icon className="input-icon" icon="hide" ref="icon" click=onClickShowPassword}}}
          </div>
        </div>

      
        <div class="form__row">
          <div class="form__label">
            {{{Label id="new_password_repeated" text="Повторите новый пароль"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="new_password_repeated"
            type="password"
            name="passwordRepeated"
            placeholder="Повторите новый пароль"
            ref="firstName"
            disabled="true"
            }}}
          </div>
        </div>

        <div class="form__btn">
            {{{Button className="btn--blue" type="submit" text="Изменить пароль" click=onClickFormBtn ref="button"}}}
        </div>
      </form>

     </div>

     
    </section>
      `;
  }
}
