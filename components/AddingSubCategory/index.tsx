'use client';

import Image from 'next/image';
import { memo, useState } from 'react';
import { AddSubCategoryModal, SubCategories } from '@/components';
import { plusIcon, subPlusIconActive } from '@/public/assets';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveCategory, selectCategories } from '@/redux/features/generalSlice';
import { ModalBackground } from '@/common';
import useCloseModal from '@/hooks/useCloseModal';

import styles from './AddingSubCategory.module.scss';

const AddingSubCategory = ({ from = '' }: { from: string }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const categories = useAppSelector(selectCategories);
  const activeCategory = useAppSelector(selectActiveCategory);

  useCloseModal(modalIsOpen, setModalIsOpen);

  return (
    <div className={styles.addingSubCategory}>
      {activeCategory && <SubCategories from={from}/>}

      {!from && (
        <button
          className={`${styles.addSubCategoryBtn} ${
            modalIsOpen ? styles.z_1 : ''
          }`}
          disabled={!categories.length}
          onClick={() => setModalIsOpen(true)}
        >
          <Image
            alt="plusIcon"
            src={modalIsOpen ? subPlusIconActive : plusIcon}
            width={12}
            height={12}
            priority
          />
        </button>
      )}

      {modalIsOpen && (
        <>
          <AddSubCategoryModal
            nameState={{ name, setName }}
            setModalIsOpen={setModalIsOpen}
          />
          <ModalBackground />
        </>
      )}
    </div>
  );
};

export default memo(AddingSubCategory);
