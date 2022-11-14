import { Component } from 'core/Component';

type HomeProps = {
  title: string;
  click?: () => void;
  events?: any;
};

class Button extends Component<HomeProps> {
  constructor(props: HomeProps, { click } = props) {
    super({ ...props, events: { click } });
  }

  render() {
    return `<button class="btn">{{title}}</button>`;
  }
}

describe('core/Component', () => {
  document.body.innerHTML = `<div id="root"></div>`;

  const arr = ['one'];

  const button = new Button({
    title: 'Нажми',
    click: () => {
      arr.push('two');
    },
  });

  it('must be defined', () => {
    expect(button).toBeDefined();
  });

  it('should return element', () => {
    const el = button.getEl();

    expect(el.textContent).toEqual('Нажми');
  });

  it('should added element to DOM', () => {
    const root = document.querySelector('#root');
    const el = button.getEl();

    root?.append(el);

    expect(root?.firstElementChild?.textContent).toEqual('Нажми');
  });

  it('should be call function on click', () => {
    const btn = document.querySelector('.btn') as HTMLButtonElement;
    btn.click();

    expect(arr.length).toEqual(2);
    expect(arr[1]).toEqual('two');
  });

  it('should update props', () => {
    button.setProps({
      title: 'Уже нажимал',
    });

    // @ts-ignore
    expect(button.props.title).toEqual('Уже нажимал');
  });
});
