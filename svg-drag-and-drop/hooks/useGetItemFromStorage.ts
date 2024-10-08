import { useEffect } from 'react';
import { getItemFromStorage } from '@/helpers';
import { setDataFromStorage } from '@/redux/features/generalSlice';
import { useAppDispatch } from '@/redux/hooks';

const useGetItemFromStorage = (itemName: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = getItemFromStorage(itemName, window);
      
      dispatch(setDataFromStorage({ data, name: itemName }));
    }
  }, []);
};

export default useGetItemFromStorage;
