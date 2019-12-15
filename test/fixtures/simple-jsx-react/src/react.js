const React = {
  createElement(type, props, children) {
    return ({ type, props: { ...props, children } });
  },
  Fragment({ children }) {
    return ({ props: { ...children } })
  }
}

export default React;
