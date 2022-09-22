const template = `
<form action="{{action}}" class="{{class}} form" method="{{method}}">
    {{#each inputs}}
        {{> Input this}}
    {{/each}}
    <div class="form__row">
        <div class="form__btn">
            {{> Button button}}
        </div>
        <div class="form__link">
            {{> Link link}}
        </div>
    </div>
</form>
`;

export { template };
