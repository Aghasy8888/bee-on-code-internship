import { CATEGORIES, PRODUCTS } from '@/constants';
import { selectCategories, selectProducts } from '@/redux/features/generalSlice';
import { useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

const useUpdateLocalStorage = () => {
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    if (categories[0]) {
      localStorage.setItem(CATEGORIES, JSON.stringify(categories));
    }
  }, [JSON.stringify(categories)]);

  useEffect(() => {
    if (products[0]) {
      localStorage.setItem(PRODUCTS, JSON.stringify(products));
    }
  }, [JSON.stringify(products)]);
};

export default useUpdateLocalStorage;
