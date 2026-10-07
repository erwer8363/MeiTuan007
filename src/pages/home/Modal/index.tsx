import { FC, memo } from 'react'
import styles from './index.module.scss'

interface ModalProps {
  visible: boolean
  onClose?: () => void
  onConfirm?: () => void
}

const SORT_OPTIONS = [
  '综合排序',
  '销量优先',
  '距离优先',
  '速度优先',
  '评分优先',
  '起送价最低',
  '配送费最低',
  '人均高到低',
  '人均低到高',
]

const Modal: FC<ModalProps> = ({ visible, onClose }) => {
  // 显示状态完全由父组件控制：点遮罩只通知父组件 onClose，由父组件把 visible 置为 false
  if (!visible) return null

  return (
    <div className={styles.filter} style={{ top: '87.616px' }}>
      <div className={styles.mask} onClick={onClose}></div>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.sort}>
            {SORT_OPTIONS.map((text, index) => (
              <div
                key={text}
                className={
                  index === 0 ? `${styles.sortItem} ${styles.activeSort}` : styles.sortItem
                }
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
