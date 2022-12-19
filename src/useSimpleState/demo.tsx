import React from 'react';
import useSimpleState from '.';

export default function App() {
  const [state, updateState, setState] = useSimpleState({ a: 1, b: 2 });
  return (
    <div className="App">
      <div>state.a:{state.a}</div>
      <div>state.b:{state.b}</div>
      <div>
        <button
          onClick={() => {
            setState((old) => ({ ...old, a: old.a + 1 }));
          }}
        >{`setSate(old=>({...old,a:old.a+1}))`}</button>
      </div>
      <div>
        <button
          onClick={() => {
            updateState({ b: state.b + 1 });
          }}
        >{`updateState({b:state.b+1})`}</button>
      </div>
    </div>
  );
}
