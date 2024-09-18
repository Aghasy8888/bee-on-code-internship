'use client';

import useUpdateLocalStorage from '@/hooks/useUpdateLocalStorage';
import useDefaultActiveCategory from '@/hooks/useDefaultActiveCategory';
import { AddingCategory, AddingSubCategory, GenderFilter } from '@/components';
import useGetItemFromStorage from '@/hooks/useGetItemFromStorage';
import { CATEGORIES } from '@/constants';

import styles from './CategoryPanel.module.scss';

interface ICategoryPanelProps {
  from?: string;
}

const CategoryPanel = ({from = ''}: ICategoryPanelProps) => {
  useDefaultActiveCategory();
  useUpdateLocalStorage();
  useGetItemFromStorage(CATEGORIES);  

  return (
    <section className={`${styles.categoryPanel} ${styles[from]}`}>
      <div className={styles.container}>
        <div className={styles.genderAndAddCategoryCtn}>
          <GenderFilter />
          <AddingCategory from={from}/>
        </div>
        <AddingSubCategory from={from}/>
      </div>
    </section>
  );
};

export default CategoryPanel;
