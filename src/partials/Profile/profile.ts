import { Component } from 'core/Component';
import { ErrorResponse } from 'services/types';
import { validation, deepCompare } from 'core/utils';
import User from 'services/User';
import { StateUser } from 'store/User';

interface ProfileProps {
  className?: string;
  profile?: StateUser;
  notification?: Component;
}

export class Profile extends Component<ProfileProps> {
  static componentName = 'Profile';

  static isUpdate = false;

  constructor(props: ProfileProps) {
    super({ ...props });

    this.setState({
      form: {
        edit: false,
      },
      formData: {
        ...this.props.profile,
      },
    });

    this.setProps({
      onChangeAvatar() {
        Profile.isUpdate = true;
      },
      onClickFormBtn: async (evt: Event) => {
        const { form, formData } = this.state;
        const button = this.refs.button;
        const target = evt.target as HTMLButtonElement;

        if (!form.edit) {
          evt.preventDefault();
          this.props.enabledForm();

          form.edit = true;

          button.setProps({
            text: 'Сохранить изменения',
            className: 'btn--green',
          });
          return;
        }

        if (form.edit) {
          if (deepCompare(formData, this.props.profile)) {
            this.props.disabledForm();
            form.edit = false;
            button.setProps({
              text: 'Изменить данные',
              className: 'btn--blue',
            });
            return;
          }

          try {
            target.disabled = true;
            await User.profileUpdate(formData);
            Profile.isUpdate = true;
          } catch (error: ErrorResponse<any>) {
            this.props.disabledForm();
            form.edit = false;
            button.setProps({
              text: 'Изменить данные',
              className: 'btn--blue',
            });
            this.props.showNotification('error', error.message);
          }
        }
      },
      onValidateInput: (evt: { target: HTMLInputElement }) => {
        const { formData } = this.state;
        const target = evt.target;
        const name = target.name;
        const value = formData[name];

        try {
          if (name === 'display_name') {
            return;
          }
          validation[name](value, name === 'first_name' ? 'Фамилия' : 'Имя');
        } catch (error: Error | any) {
          if (value) {
            target.dataset.invalid = 'true';
          }
          this.props.showNotification(value ? 'error' : 'info', error.message);
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

  componentDidMount() {
    if (Profile.isUpdate) {
      this.props.showNotification('success', 'Успешно измененно!');
      Profile.isUpdate = false;
    }
  }

  componentWillDidMount() {
    if (!Profile.isUpdate) {
      this.hide();
    }
  }

  show() {
    this.getEl().dataset.open = 'true';
  }

  hide() {
    this.getEl().dataset.open = 'false';
  }

  render() {
    return `
    <section class="profile" data-open="true">

      <header class="profile__header"><h2>Профиль</h2></header>

      <div class="profile__row">
       {{{Avatar className="profile__avatar" src=profile.avatar ref="avatar" update=onChangeAvatar notification=notification}}}
      </div>
      
      <div class="profile__row">
        <form class="form profile__form" method="post" ref="form">

        <div class="form__row">
          <div class="form__label">
            {{{Label id="first_name" text="Фамилия"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="first_name"
            type="text"
            name="first_name"
            value=profile.first_name
            placeholder="Фамилия"
            ref="firstName"
            disabled="true"
            keyup=onKeyUpInput
            focus=onValidateInput
            blur=onValidateInput
            }}}
          </div>
        </div>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="phone" text="Телефон"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="phone"
            type="tel"
            name="phone"
            value=profile.phone
            placeholder="+7 (924) 896 33 79"
            ref="phone"
            disabled="true"
            keyup=onKeyUpInput
            focus=onValidateInput
            blur=onValidateInput
            }}}
            {{{Icon className="input-icon" icon="phone"}}}
          </div>
        </div>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="second_name" text="Имя"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="second_name"
            type="text"
            value=profile.second_name
            name="second_name"
            placeholder="Имя"
            ref="secondName"
            disabled="true"
            keyup=onKeyUpInput
            focus=onValidateInput
            blur=onValidateInput
            }}}
          </div>
        </div>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="login" text="Логин"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="login"
            type="text"
            name="login"
            value=profile.login
            placeholder="Ваш логин"
            ref="login"
            disabled="true"
            keyup=onKeyUpInput
            focus=onValidateInput
            blur=onValidateInput
            }}}
            {{{Icon className="input-icon" icon="user"}}}
          </div>
        </div>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="email" text="Почта"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="email"
            type="email"
            name="email"
            value=profile.email
            placeholder="pochta@yandex.ru"
            ref="email"
            disabled="true"
            keyup=onKeyUpInput
            focus=onValidateInput
            blur=onValidateInput
            }}}
          </div>
        </div>

        <div class="form__row">
          <div class="form__label">
            {{{Label id="email" text="Имя в чате"}}}
          </div>
          <div class="form__input ">
            {{{Input
            id="display_name"
            type="text"
            name="display_name"
            value=profile.display_name
            placeholder="Ваш никнайм"
            ref="displayName"
            disabled="true"
            keyup=onKeyUpInput
            focus=onValidateInput
            blur=onValidateInput
            }}}
          </div>
        </div>

        <div class="form__btn">
            {{{Button className="btn--blue" type="submit" text="Изменить данные" click=onClickFormBtn ref="button"}}}
        </div>
      </form>

     </div>

    </section>
      `;
  }
}
