import { Component } from 'core/Component';
import { Rec } from 'core/types';
import User from 'services/User';

User;

interface CorrespondenceProps {
  className: string;
  userId: string;
  messages: Rec<message>;
}

type message = {
  id: string;
  time: string;
  user_id: string;
  content: string;
  type: string;
  file: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
  currentUserId: string;
};

export class Correspondence extends Component {
  static componentName = 'Correspondence';

  constructor(props: CorrespondenceProps) {
    if (props.messages) {
      Object.entries(props.messages).forEach(async ([_, msg]) => {
        msg.currentUserId = props.userId;
      });
    }
    super({ ...props });
  }

  render() {
    return `
    <div class="correspondence {{className}}">
      {{#each messages}}
        {{#with this}}
          {{#ifEqual currentUserId user_id}}
            {{{Message text=content isMy="true"}}}
          {{else}}
            {{{Message text=content}}}
          {{/ifEqual}}
        {{/with}}
    {{/each}}             
    </div>
    `;
  }
}
