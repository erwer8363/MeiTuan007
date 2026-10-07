import { FC, memo, useEffect } from 'react'
import styles from './index.module.scss'
import { Badge, Button, ErrorBlock, Tabs } from 'antd-mobile'
import starImg from '@/assets/images/star.png'
import Loading from '@/components/common/loading'
import { lazyload } from '@/utils'
import type { RatingComment } from '@/types'
import CommentItem from './CommentItem'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  commentsAtom,
  commentsErrorAtom,
  loadCommentsAndNavsAtom,
  loadingAtom,
  navsAtom,
} from '@/atoms/homeDetailStore'

const HomeComment: FC = () => {
  const navList = useAtomValue(navsAtom)
  const comments = useAtomValue(commentsAtom)
  const loading = useAtomValue(loadingAtom)
  const error = useAtomValue(commentsErrorAtom)
  const getCommentsAndNavList = useSetAtom(loadCommentsAndNavsAtom)
  useEffect(() => {
    getCommentsAndNavList()
  }, [getCommentsAndNavList])

  // 评论渲染后再收集图片，卸载时移除 scroll 监听
  useEffect(() => {
    if (!comments.length) return
    return lazyload(`.${styles.wrapper} img[data-src]`)
  }, [comments])

  const navListView = () => {
    return navList.map((item) => {
      return (
        <span className={styles.item} key={item.label_id}>
          {item.content}
        </span>
      )
    })
  }
  const picComments = comments.filter((item) => item.user_pic_url)
  const commentListView = (list: RatingComment[]) => {
    return list.map((item) => <CommentItem key={item.wm_comment_id} comment={item} />)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.rating}>
        <div className={styles.ratingLeft}>
          <div className={styles.ratingLeftHd}>4.5</div>
          <div className={styles.ratingLeftBd}>商家评分</div>
        </div>
        <div className={styles.ratingMd}>
          <div className={styles.ratingMdMain}>
            <div className={styles.ratingMdMainDesc}>口味</div>
            <div className={styles.ratingMdMainFoot}>
              <div className={styles.ratingMdMainPic}>
                <img src={starImg} alt="" />
              </div>
            </div>
            <div className={styles.ratingMdMainScore}>4.6</div>
          </div>
          <div className={styles.ratingMdMain}>
            <div className={styles.ratingMdMainDesc}>包装</div>
            <div className={styles.ratingMdMainFoot}>
              <div className={styles.ratingMdMainPic}>
                <img src={starImg} alt="" />
              </div>
            </div>
            <div className={styles.ratingMdMainScore}>4.7</div>
          </div>
        </div>
        <div className={styles.ratingFooter}>
          <div className={styles.ratingFooterScore}>4.9</div>
          <div className={styles.ratingFooterDesc}>配送评分</div>
        </div>
      </div>
      {error && !loading ? (
        <ErrorBlock status="default" title="评论加载失败" description={error.message}>
          <Button size="small" color="primary" onClick={() => getCommentsAndNavList()}>
            重试
          </Button>
        </ErrorBlock>
      ) : null}
      <Tabs>
        <Tabs.Tab title="全部" key="all">
          <div>{navListView()}</div>
          <ul>{commentListView(comments)}</ul>
        </Tabs.Tab>
        <Tabs.Tab title="有图" key="pic" forceRender>
          <div>{navListView()}</div>
          <ul>{commentListView(picComments)}</ul>
        </Tabs.Tab>
        <Tabs.Tab
          title={
            <Badge content="222" style={{ '--right': '-10px', '--top': '8px' }}>
              点评
            </Badge>
          }
          key="animals"
        >
          <div>{navListView()}</div>
        </Tabs.Tab>
      </Tabs>
      {loading ? (
        <div className={styles.enterLoading}>
          <Loading />
        </div>
      ) : null}
    </div>
  )
}
export default memo(HomeComment)
