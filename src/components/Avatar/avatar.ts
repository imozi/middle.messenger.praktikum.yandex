import { Component } from 'core/Component';
import User from 'services/User';

interface AvatarProps {
  src?: string;
  className?: string;
  change?: (evt: Event) => void;
  update?: (evt: Event) => void;
  events: any;
}

export class Avatar extends Component<AvatarProps> {
  static componentName = 'Avatar';

  constructor(props: AvatarProps, { change, update, src } = props) {
    super({
      ...props,
      src: src
        ? `https://ya-praktikum.tech/api/v2/resources/${src}`
        : 'img/svg/user-default.svg',
      events: { change, update },
    });

    this.setProps({
      onChangeImages: async () => {
        const file = this.refs.file.getEl() as HTMLInputElement;

        if (file.files?.length) {
          const label = this.getEl().firstElementChild as HTMLLabelElement;
          try {
            const formData = new FormData();
            formData.append('avatar', file.files[0]);
            label.dataset.loading = 'true';
            await User.avatarUpdate(formData);
            this.dispatchEvent({ name: 'update' });
          } catch (error) {
            label.dataset.loading = 'false';
            this.props.showNotification('error', 'Не удалось обновить аватар!');
          }
        }
      },
      enabledChange: () => {
        const file = this.refs.file.getEl() as HTMLInputElement;
        const label = this.getEl().firstElementChild as HTMLLabelElement;

        label.dataset.edit = 'true';
        file.disabled = false;
      },
      disabledChange: () => {
        const file = this.refs.file.getEl() as HTMLInputElement;
        const label = this.getEl().firstElementChild as HTMLLabelElement;

        label.dataset.edit = 'false';
        file.disabled = true;
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
      keyUp: () => {},
    });
  }

  render() {
    return `
    <div class="avatar {{className}}">
        <label for="avatar" class="avatar__img" data-loading="false" data-edit="false">
          <img src="{{src}}" alt="avatar">
        </label>
      <div class="avatar__change">
      {{{Input id="avatar" type="file" name="" change=onChangeImages ref="file" keyup=keyUp}}}
      </div>
    </div>
      `;
  }
}
