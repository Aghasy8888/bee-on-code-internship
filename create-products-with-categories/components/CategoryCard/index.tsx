import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectActiveCategory, selectActiveCategoryForAddProduct, setActiveCategory } from '@/redux/features/generalSlice';

import styles from './CategoryCard.module.scss';

interface ICategoryCardProps {
  category: ICategory;
  from: string; 
}

const CategoryCard = ({ category, from }: ICategoryCardProps) => {
  const { img, name } = category;
  const image = JSON.parse(img as string)[0];
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(
    !from ? selectActiveCategory : selectActiveCategoryForAddProduct
  );

  const onCategoryClick = () => {
    dispatch(setActiveCategory({data: category, toMain: !from}));
  };

  return (
    <button
      onClick={onCategoryClick}
      className={`${styles.categoryCard} ${
        activeCategory?.name === category.name ? styles.active : ''
      }`}
    >
      <Image
        alt="categoryImg"
        className={styles.categoryImg}
        src={image}
        width={50}
        height={50}
        blurDataURL={image}
        priority
      />

      <p>{name}</p>
    </button>
  );
};

export default CategoryCard;
