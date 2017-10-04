# raj-element

Create [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements) from [Raj](https://github.com/andrejewski/raj) programs.

```js
import mapElement from './node_modules/raj-element/el.js';

const program = {
  init: [{
    count: 0 // An integer to count
  }],
  update (message, state) {
    let count = state.count + 1;
    return [{count}]; // Increment the state
  },
  view ({count}, dispatch, root) {
    // First render, probably use a vdom library instead.
    if(!root.firstChild) {
      root.innerHTML = `
        <h1>
          Count:
          <span id="count">0</span>
        </h1>
        <button type="button">Increment</button>
      `;

      root.querySelector('button').onclick = dispatch;
    }

    root.querySelector('#count').textContent = count;
  }
};

const Element = mapElement(program);

customElements.define('my-element', Element);
```

## License

BSD 2 Clause
