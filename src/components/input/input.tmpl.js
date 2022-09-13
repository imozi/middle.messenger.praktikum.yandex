export default `
  <div class="form__row">
    <div class="form__label"><label for={{id}}>{{title}}</label></div>
    <div class="form__input"><input type={{type}} name="login" placeholder="{{placeholder}} {{#if value}}value="{{value}}"{{/if}}"></div>
  </div>
`;
