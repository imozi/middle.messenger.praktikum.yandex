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

          const formData = new FormData();
          formData.append('avatar', file.files[0]);
          this.dispatchEvent({ name: 'update' });
          label.dataset.loading = 'true';
          await User.avatarUpdate(formData);
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
    });
  }

  render() {
    return `
    <div class="avatar {{className}}">
        <label for="avatar" class="avatar__img" data-loading="false" data-edit="false">
          <img src="{{src}}" alt="avatar">
        </label>
      <div class="avatar__change">
      {{{Input id="avatar" type="file" name="" change=onChangeImages ref="file"}}}
      </div>
    </div>
      `;
  }
}
