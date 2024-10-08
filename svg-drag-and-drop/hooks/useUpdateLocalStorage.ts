'use client';

import { useEffect } from 'react';
import { PROCESSES } from '@/constants';
import { selectProcesses } from '@/redux/features/generalSlice';
import { useAppSelector } from '@/redux/hooks';

const useUpdateLocalStorage = () => {
  const processes = useAppSelector(selectProcesses);

  useEffect(() => {
      localStorage.setItem(PROCESSES, JSON.stringify(processes));
  }, [JSON.stringify(processes)]);
};

export default useUpdateLocalStorage;
