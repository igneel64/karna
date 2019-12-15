import React from "./react";
import TestComponent from "./Component.jsx"

class App {
  render() {
    return (
      <div id="main">
        <TestComponent />
        <ul>
          {[1, 2, 3].map(item => <li>{item}</li>)}
        </ul>
        <>
          <span>Test</span>
        </>
      </div>
    );
  }
}

export default App
