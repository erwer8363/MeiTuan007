import { useState, useEffect, memo } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'
import { getGoodsList, changeGoodsNumAction, changeGoodsAllNumAction } from './store/actionCreators'
import { connect } from 'react-redux'
// 组件
import Scroll from '@/components/common/Scroll'
import ShoppingCart from '@/components/ShoppingCart'
// 图片延迟加载
// import LazyLoad, { forceCheck } from 'react-lazyload'
import Loading from '@/components/common/loading'

function HomeOrder(props) {
  const { goods: details, loading, price, singleCart } = props
  // console.log(singleCart);
  const { getGoodsListDispatch, changeGoodsNumDispatch, changeGoodsAllNumDispatch } = props

  // console.log(details);

  // 当前选中的左侧分类
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    getGoodsListDispatch()
  }, [])

  // 商品数量加减
  const changeGoodNum = (e, status, id) => {
    e.preventDefault()
    e.stopPropagation()
    let data = {
      status: status,
      id: id,
    }
    changeGoodsNumDispatch(data)
  }
  // 点击 获取右侧商品的id 然后scrollIntoView事件方法滚动到对应位置
  const scrollToAnchorLeft = (anchorName) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName)
      // console.log(anchorElement.scrollTop);
      // console.log(anchorElement);
      anchorElement &&
        anchorElement.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        })
    }
    return true
  }
  const cartNumber = () => {
    let num = 0
    details.map((item) => {
      if (item.name != '热销') {
        item.spus.map((ele) => {
          num += ele.praise_num
        })
      } else {
        item.spus.map((ele) => {
          if (ele.name == '麦乐鸡5块') {
            num += ele.praise_num
          }
        })
      }
    })
    return num
  }
  const clearCart = () => {
    changeGoodsAllNumDispatch()
  }

  const sideBarList = () => {
    return details.map((item, index) => {
      let num = 0
      item.spus.map((ele) => {
        num += ele.praise_num
      })

      return (
        <div
          className={classnames(styles.menuItem, { [styles.siderbarBg]: activeIndex === index })}
          key={index}
          onClick={() => {
            scrollToAnchorLeft(item.name)
            setActiveIndex(index)
          }}
        >
          <div className={styles.text}>
            {num > 0 && (
              <div className={classnames(styles.menuItemIcon, styles.menuItemIconv2)}>{num}</div>
            )}
            <img src={item.icon ? item.icon : ''} style={{ width: '15px' }} />
            {item.name}
          </div>
        </div>
      )
    })
  }
  const goodsContent = () => {
    return details.map((item, index) => {
      return (
        <div className={styles.foodList} key={index} id={item.name}>
          <h3 className={styles.title}>{item.name}</h3>
          {/* <!-- 具体的商品列表 --> */}
          <ul>
            {item.spus.map((item) => {
              return (
                <li className={styles.foodItem} key={item.id}>
                  <div className={styles.icon}>
                    <img src={item.picture} alt="" />
                  </div>
                  <div className={styles.content}>
                    <h3 className={styles.name}>{item.name}</h3>
                    <div className={styles.desc}>{item.description}</div>
                    <div className={styles.extra}>
                      <span className={styles.saled}>{item.month_saled_content}</span>
                      <span>{item.praise_content}</span>
                    </div>
                    <div className={styles.price}>
                      <div>
                        <span className={styles.text}>${item.min_price}</span>
                        <span className={styles.unit}>/{item.unit}</span>
                      </div>
                      <div className={styles.priceRight}>
                        {item.praise_num > 0 && (
                          <span className={styles.priceRightReduce}>
                            <span
                              className={styles.reduceBox}
                              onClick={(e) => changeGoodNum(e, 'reduce', item.id)}
                            ></span>
                          </span>
                        )}
                        <span className={styles.priceRightNum}>
                          {item.praise_num ? item.praise_num : ''}
                        </span>
                        <span className={styles.priceRightAdd}>
                          <span
                            className={styles.addBox}
                            onClick={(e) => changeGoodNum(e, 'add', item.id)}
                          ></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      )
    })
  }
  return (
    <>
      <div className={styles.goods}>
        {/* 侧边栏 */}
        <div className={styles.menuWrapper}>
          <ul>{sideBarList()}</ul>
        </div>
        {/* <!--商品列表--> */}
        <div className={styles.foodsWrapper}>
          <ul className={styles.foodContainer}>{goodsContent()}</ul>
        </div>
      </div>
      <ShoppingCart
        price={price}
        cartNumber={cartNumber}
        clearCart={clearCart}
        singleCart={singleCart}
      />
      {loading ? (
        <div className={styles.enterLoading}>
          <Loading></Loading>
        </div>
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => {
  let arr = []
  state.goods.GoodsList.forEach((item) => {
    if (item.name != '热销') {
      item.spus.forEach((item) => {
        let price = 0
        price += item.praise_num > 0 ? item.min_price * item.praise_num : 0
        arr.push(price)
      })
    }
  })

  return {
    goods: state.goods.GoodsList,
    loading: state.goods.Loading,
    singleCart: state.goods.SingleCart,
    price: arr.reduce((pre, curr) => (pre += curr), 0),
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getGoodsListDispatch() {
      dispatch(getGoodsList())
    },
    changeGoodsNumDispatch(data) {
      dispatch(changeGoodsNumAction(data))
    },
    changeGoodsAllNumDispatch(data) {
      dispatch(changeGoodsAllNumAction(data))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(HomeOrder))
