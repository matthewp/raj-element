import raj from '../raj.js';
const {program} = raj;

const KILL = Symbol('raj.kill');
const DISPATCH = Symbol('raj.dispatch');

export function define(BaseElement, p, def = {}) {
  const view = p.view;
  const El = class extends BaseElement {
    constructor() {
      super();
      this.attachShadow({mode:'open'});
    }
    connectedCallback() {
      const prog = {
        ...p,
        view: (state, dispatch) => {
          this[DISPATCH] = dispatch;
          view(state, dispatch, this.shadowRoot);
        }
      };

      this[KILL] = program(prog);
    }
    disconnectedCallback() {
      this[KILL]();
    }
  };

  (def.props || []).forEach(p => {
    let priv = Symbol(`raj.prop.${p}`);
    let MSG = p.toUpperCase();
    Object.defineProperty(El.prototype, p, {
      get: function(){
        return this[priv];
      },
      set: function(val) {
        this[priv] = val;
        this[DISPATCH]({
          type: MSG,
          value: val
        });
      }
    });
  });

  return El;
};

const defineHTMLElement = define.bind(null, HTMLElement);
export default defineHTMLElement;
