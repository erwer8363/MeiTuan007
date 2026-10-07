import { memo, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
//  useRef  DOM 相关
//  useCallback 性能优化
import { CSSTransition } from 'react-transition-group'
import SearchBox from '@/components/common/search-box'
import SearchContent from './SearchContent'
import styles from './index.module.scss'

const Search = () => {
  const navigate = useNavigate()

  // 搜索内容 redux 解决共享状态问题
  const [query, setQuery] = useState('周杰伦')
  const [show, setShow] = useState(true)
  // React 19 移除了 findDOMNode，CSSTransition 必须通过 nodeRef 指定动画节点
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {}, [])

  const searchBack = () => {
    setShow(false)
  }
  // 让父子组件的query一致
  const handleQuery = (q: any) => {
    // console.log(q);
    setQuery(q)
  }

  return (
    // 当dom ready 组件挂载上去， 应用css transiiton效果
    <CSSTransition
      nodeRef={nodeRef}
      // 如果this.state.show从false变为true，则动画入场，反之out
      in={show}
      // timeout={1000} 动画执行1秒
      timeout={1000}
      // appear：默认false 加载后自动执行
      appear={true}
      // CSS Modules 会改写类名，所以把各阶段的类名显式映射过去
      classNames={{
        appear: styles.flyAppear,
        appearActive: styles.flyAppearActive,
        enter: styles.flyEnter,
        enterActive: styles.flyEnterActive,
        exit: styles.flyExit,
        exitActive: styles.flyExitActive,
      }}
      // unmountOnExit 默认false 当动画出场后在页面上移除包裹的dom节点 但是 componentWillUnmount componentDidMount等创建不会触发
      unmountOnExit
      // onExit 结束动画触发前触发
      onExit={() => {
        navigate('/')
      }}
    >
      <div className={styles.container} ref={nodeRef}>
        {/* 搜索框 */}
        <div>
          <SearchBox back={searchBack} newQuery={query} handleQuery={handleQuery}></SearchBox>
          <SearchContent></SearchContent>
        </div>

        {/* {enterLoading && <EnterLoading><Loading></Loading></EnterLoading>} */}
      </div>
    </CSSTransition>
  )
}

export default memo(Search)
