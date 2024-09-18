'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './SingleProduct.module.scss';
import './Swiper.scss';

const SingleProduct = ({ product }: { product: IProduct }) => {
  const parsedImages: string[] = JSON.parse(product.images);

  return (
    <div className={styles.singleProduct}>
      <div className={`imgContainer ${styles.imgContainer}`}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
        >
          {parsedImages.map((image, i) => (
            <SwiperSlide key={i}>
              <Image
                key={i}
                alt="product"
                src={image}
                className={styles.image}
                layout="fill"
                objectFit="cover"
                blurDataURL={image}
                priority
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.articleNumberAndPrice}>
        <p>{product.articleNumber}</p>
        <p className={styles.price}>{product.price}$</p>
      </div>
    </div>
  );
};

export default SingleProduct;
