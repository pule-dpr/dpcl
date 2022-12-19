import { useFullscreen } from 'ahooks';
import React, { useRef } from 'react';

export default function App() {
  const ref1 = useRef();
  const ref2 = useRef();
  const [fullscreen1, options1] = useFullscreen(ref1);
  const [fullscreen2, options2] = useFullscreen(ref2);
  return (
    <div className="App">
      <div style={{ width: 400, height: 400, background: 'blue' }} ref={ref1}>
        <button onClick={options1.toggleFullscreen}>父元素{fullscreen1 ? '退出全屏' : '全屏'}</button>
        <div style={{ width: 200, height: 200, background: 'red' }} ref={ref2}>
          <button onClick={options2.toggleFullscreen}>子元素{fullscreen2 ? '退出全屏' : '全屏'}</button>
        </div>
      </div>
      <div></div>
    </div>
  );
}
