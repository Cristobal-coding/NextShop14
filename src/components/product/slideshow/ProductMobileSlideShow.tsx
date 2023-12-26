'use client';

import { SwiperSlide, Swiper } from 'swiper/react'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './slideshow.css';

import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Props {
    images: string[],
    title: string,
    className?: string,
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100%',
                    height: '500px'
                }}
                pagination={true}
                autoplay={{
                    delay: 2500
                }}
                modules={[FreeMode, Pagination, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map(img => (
                        <SwiperSlide key={img}>
                            <Image
                                src={`/products/${img}`}
                                width={600}
                                height={500}
                                alt={title}
                                className='rounded-lg '
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>



        </div>
    )
}
