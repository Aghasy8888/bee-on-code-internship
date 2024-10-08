'use client';

import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubCategory, selectActiveSubCategoryForAddProduct } from '@/redux/features/generalSlice';

import styles from './SubCategoryCard.module.scss';

export interface ISubCategoryCardProps {
    data: string;
    from: string;
    onClick: (category: string) => void;
}

const SubCategoryCard = ({data, from, onClick}: ISubCategoryCardProps) => {
    const activeSubCategory = useAppSelector(
        !from ? selectActiveSubCategory : selectActiveSubCategoryForAddProduct
      );

  return (
    <button
      onClick={() => onClick(data)}
      className={`${styles.button} ${activeSubCategory === data ? styles.active : ''} ${
        styles[`from${from}`]
      }`}
    >
      {data}
    </button>
  );
};

export default SubCategoryCard;
