'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css';
import 'swiper/css/navigation';

import { CategoryCard } from '@/components';
import { useAppSelector } from '@/redux/hooks';
import { selectCategories } from '@/redux/features/generalSlice';

import './Swiper.scss';

interface ICategoriesProps {
  from: string;
  gender: string;
}

const Categories = ({ from, gender }: ICategoriesProps) => {
  const categories = useAppSelector(selectCategories);
  const filteredCategories = categories.filter((c) => c.gender === gender);

  return (
    <div className='categorySwiper'>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        breakpoints={{
          575: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {filteredCategories.map((category) => (
          <SwiperSlide key={category.name}>
            <CategoryCard from={from} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
