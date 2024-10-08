'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Navigation } from 'swiper/modules';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActiveCategory,
  selectActiveCategoryForAddProduct,
  setActiveSubCategory,
} from '@/redux/features/generalSlice';
import { SubCategoryCard } from '@/common';

import styles from './SubCategories.module.scss';
import './Swiper.scss';

const SubCategories = ({ from = '' }: { from: string }) => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(
    !from ? selectActiveCategory : selectActiveCategoryForAddProduct
  );
  let filteredInfo: string[] = [];

  if (activeCategory) {
    filteredInfo = [activeCategory.name, ...activeCategory.subCategories];
  }

  const onClick = (category: string) => {
    dispatch(setActiveSubCategory({ data: category, toMain: !from }));
  };

  return (
    <div className={styles.subCategories}>
      <div className={`filter ${styles.filter}`}>
        <Swiper
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={2}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            575: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
            640: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 7,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 50,
            },
          }}
        >
          {filteredInfo.map((category) => (
            <SwiperSlide key={category}>
              <SubCategoryCard data={category} from={from} onClick={onClick} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SubCategories;
