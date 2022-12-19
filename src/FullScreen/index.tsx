import { useUpdateEffect } from 'ahooks';
import React from 'react';
import IconFont from '../IconFont';
import useFullscreen from '../useFullscreen';
import './index.less';

interface IFullScrenProps {
  /**
   * @description 类名
   */
  className?: string;

  /**
   * @description 全屏dom对象
   */
  getContainer: () => HTMLElement | Element;

  /**
   * @description 状态监听
   */
  fullScreenChange?: (flag: boolean) => void;

  /**
   * @description 显示默认文本
   */
  hasText?: boolean;
}

function FullScreen({ className, getContainer, fullScreenChange, hasText }: IFullScrenProps) {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(getContainer);
  useUpdateEffect(() => {
    console.log(isFullscreen);
    fullScreenChange?.(isFullscreen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  return (
    <span className={`tools-screen-layer ${className ?? ''}`} onClick={toggleFullscreen}>
      <IconFont className="defualt-fullscreen-icon icon-primary" type={!isFullscreen ? 'lm-player-S_View_ScreenViewFull' : 'lm-player-S_View_ScreenViewExit'} />
      {hasText ? (!isFullscreen ? '全屏' : '窗口') : undefined}
    </span>
  );
}
export default FullScreen;
