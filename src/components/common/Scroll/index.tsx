import { useState, useEffect, useRef, useImperativeHandle, useMemo, type ReactNode, type Ref } from "react"
import BScroll from "better-scroll"
import styled from 'styled-components';
import Loading from '../loading/index';
import Loading2 from '../loading-v2/index';
import { debounce } from "@/utils";
const ScrollContainer = styled.div`
 width: 100%;
 height: 100%;
 overflow: hidden;
`
const PullUpLoading = styled.div`
 position: absolute;
 left:0; right:0;
 bottom: 5px;
 width: 60px;
 height: 60px;
 margin: auto;
 z-index: 100;
`
export const PullDownLoading = styled.div`
 position: absolute;
 left:0; right:0;
 top: 0px;
 height: 30px;
 margin: auto;
 z-index: 100;
`
// 下为问题代码，以此为鉴
// useEffect(() => {
// if(bScroll) return;
// const scroll = new BScroll(scrollContaninerRef.current, {
// scrollX: direction === "horizental",
// scrollY: direction === "vertical",
// probeType: 3,
// click: click,
// bounce:{
// top: bounceTop,
// bottom: bounceBottom
// }
// });
// setBScroll(scroll);
// if(pullUp) {
// scroll.on('scrollEnd', () => {
// //判断是否滑动到了底部
// if(scroll.y <= scroll.maxScrollY + 100){
// pullUp();
// }
// });
// }
// if(pullDown) {
// scroll.on('touchEnd', (pos) => {
// //判断⽤户的下拉动作
// if(pos.y > 50) {
// debounce(pullDown, 0)();
// }
// });
// }
// if(onScroll) {
// scroll.on('scroll', (scroll) => {
// onScroll(scroll);
// })
// }
// if(refresh) {
// scroll.refresh();
// }
// return () => {
// scroll.off('scroll');
// setBScroll(null);
// }
// // eslint-disable-next-line
// }, []);
/** 通过 ref 暴露给父组件的方法 */
export interface ScrollHandle {
  refresh: () => void
  getBScroll: () => BScroll | undefined
}

interface ScrollProps {
  /** React 19：ref 直接作为普通 prop，无需 forwardRef */
  ref?: Ref<ScrollHandle>
  children?: ReactNode
  direction?: 'vertical' | 'horizental'
  click?: boolean
  refresh?: boolean
  onScroll?: ((pos: { x: number; y: number }) => void) | null
  pullUp?: (() => void) | null
  pullDown?: (() => void) | null
  pullUpLoading?: boolean
  pullDownLoading?: boolean
  /** 是否支持向上吸顶 */
  bounceTop?: boolean
  /** 是否支持向下吸顶 */
  bounceBottom?: boolean
}

// React 19 移除了函数组件的 defaultProps，默认值改为参数解构默认值
const Scroll = ({
  ref,
  children,
  direction = 'vertical',
  click = true,
  refresh = true,
  onScroll = null,
  pullUp = null,
  pullDown = null,
  pullUpLoading = false,
  pullDownLoading = false,
  bounceTop = true,
  bounceBottom = true,
}: ScrollProps) => {
  const [bScroll, setBScroll] = useState<BScroll | null>(null)
  const scrollContaninerRef = useRef<HTMLDivElement>(null)

  const pullUpDebounce = useMemo(() => debounce(pullUp, 500), [pullUp])
  const pullDownDebounce = useMemo(() => debounce(pullDown, 500), [pullDown])

  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current as HTMLElement, {
      scrollX: direction === 'horizental',
      scrollY: direction === 'vertical',
      probeType: 3,
      click: click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    })

    setBScroll(scroll)
    return () => {
      scroll.destroy()
      setBScroll(null)
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (!bScroll || !onScroll) return

    bScroll.on('scroll', onScroll)
    return () => {
      bScroll.off('scroll', onScroll)
    }
  }, [onScroll, bScroll])

  useEffect(() => {
    if (!bScroll || !pullUp) return

    const handlePullUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce()
      }
    }

    bScroll.on('scrollEnd', handlePullUp)
    return () => {
      bScroll.off('scrollEnd', handlePullUp)
    }
  }, [pullUp, pullUpDebounce, bScroll])

  useEffect(() => {
    if (!bScroll || !pullDown) return
    const handlePullDown = (pos: { y: number }) => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce()
      }
    }
    bScroll.on('touchEnd', handlePullDown)
    return () => {
      bScroll.off('touchEnd', handlePullDown)
    }
  }, [pullDown, pullDownDebounce, bScroll])

  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh()
    }
  })

  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh()
        bScroll.scrollTo(0, 0)
      }
    },
    getBScroll() {
      return bScroll ?? undefined
    },
  }))

  const PullUpdisplayStyle = pullUpLoading ? { display: '' } : { display: 'none' }
  const PullDowndisplayStyle = pullDownLoading ? { display: '' } : { display: 'none' }
  return (
    <ScrollContainer ref={scrollContaninerRef}>
      {children}
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={PullUpdisplayStyle}><Loading /></PullUpLoading>
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={PullDowndisplayStyle}><Loading2 /></PullDownLoading>
    </ScrollContainer>
  )
}

export default Scroll
