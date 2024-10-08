import {
  selectCategories,
  setDefaultActiveCategory,
} from '@/redux/features/generalSlice';
import { selectGender } from '@/redux/features/helperSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useEffect } from 'react';

const useDefaultActiveCategory = () => {
  const gender = useAppSelector(selectGender);
  const categories = useAppSelector(selectCategories);
  const filteredCategories = categories.filter((c) => c.gender === gender);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (filteredCategories.length) {
      dispatch(setDefaultActiveCategory(filteredCategories[0]));
    } else dispatch(setDefaultActiveCategory(null));
  }, [filteredCategories.length, gender]);
};

export default useDefaultActiveCategory;
