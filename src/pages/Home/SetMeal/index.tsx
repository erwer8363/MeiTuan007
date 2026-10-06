import { memo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { Wrapper } from './style'

// 轮播图片（后续可迁移到 public/data 或接口）
const SLIDES = [
    'https://p0.meituan.net/wmbanner/0acea4ba5704d56f13d78ad175b2cc5538158.png@602w',
    'https://p0.meituan.net/wmbanner/c07382bf400d74f81fe7768fcde6897684199.jpg@602w',
    'https://p0.meituan.net/wmbanner/cad13591ad0eb89515bad8cc394739d5124198.jpg@602w',
]

function SetMeal() {
    return (
        <Wrapper>
            <Swiper
                className="home_info_banners"
                modules={[Autoplay, Pagination]}
                loop
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
            >
                {SLIDES.map((src) => (
                    <SwiperSlide key={src}>
                        <img src={src} alt="" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Wrapper>
    )
}

export default memo(SetMeal)
