export default `
<form action="{{action}}" class="{{class}} form" method="{{method}}">
    {{#each inputs}}
        {{> input this}}
    {{/each}}
    <div class="form__row">
        <div class="form__btn">
            {{> button button}}
        </div>
        <div class="form__link">
            {{> link link}}
        </div>
    </div>
</form>
`;
