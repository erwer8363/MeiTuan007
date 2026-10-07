import { FC, memo } from 'react'
import dayjs from 'dayjs'
import styles from './index.module.scss'
import starImg from '@/assets/images/star.png'
import loadingPic from '@/assets/images/loading.gif'
import type { RatingComment } from '@/types'

interface CommentItemProps {
  comment: RatingComment
}

/** 星级数量，接口暂无分数字段的展示，先固定 5 星 */
const STARS = Array.from({ length: 5 }, (_, i) => i)

/** 单条评论。带图评论的图片用 data-src 交给 lazyload 延迟加载 */
const CommentItem: FC<CommentItemProps> = ({ comment }) => {
  const {
    user_pic_url: picUrl,
    user_name: userName,
    comment: text,
    comment_time: commentTime,
  } = comment
  return (
    <li className={styles.commentItem}>
      <div className={styles.commentHeader}>
        <img src={picUrl || starImg} alt="" />
      </div>
      <div className={styles.commentMain}>
        <div className={styles.user}>{userName}</div>
        <div className={styles.time}>{dayjs.unix(commentTime).format('YYYY-MM-DD')}</div>
        <div className={styles.starWrapper}>
          <span className={styles.text}>评分</span>
          <div className={styles.star}>
            {STARS.map((i) => (
              <span key={i} className={`${styles.starItem} ${styles.on}`}></span>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <span>{text}</span>
          {picUrl && <img data-src={picUrl} src={loadingPic} alt="" />}
        </div>
      </div>
    </li>
  )
}

export default memo(CommentItem)
