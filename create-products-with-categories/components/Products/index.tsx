'use client';

import { useState } from 'react';
import Image from 'next/image';
import useCloseModal from '@/hooks/useCloseModal';
import { plusIcon, plusIconActive } from '@/public/assets';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveCategory } from '@/redux/features/generalSlice';
import { AddProductModal, ProductCards } from '@/components';
import { ModalBackground } from '@/common';
import { PRODUCTS } from '@/constants';
import useGetItemFromStorage from '@/hooks/useGetItemFromStorage';

import styles from './Products.module.scss';

const Products = () => {
  const [articleNumber, setArticleNumber] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [imageFiles, setImageFiles] = useState<(ICustomFile | null)[]>([null, null, null, null]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useCloseModal(modalIsOpen, setModalIsOpen);
  const activeCategory = useAppSelector(selectActiveCategory);
  useGetItemFromStorage(PRODUCTS);  

  return (
    <section className={styles.products}>
      <div className={styles.container}>
        {activeCategory && (
          <>
            <button
              className={`${styles.addProductsBtn} ${
                modalIsOpen ? styles.z_1 : ''
              }`}
              onClick={() => setModalIsOpen(true)}
            >
              <Image
                alt="plusIcon"
                src={modalIsOpen ? plusIconActive : plusIcon}
                width={24}
                height={24}
                priority
              />
            </button>
            <ProductCards />
          </>
        )}

        {modalIsOpen && (
          <>
            <AddProductModal
              articleNumberState={{ articleNumber, setArticleNumber }}
              setModalIsOpen={setModalIsOpen}
              imageFilesState={{ imageFiles, setImageFiles }}
              priceState={{ price, setPrice }}
            />
            <ModalBackground />
          </>
        )}
      </div>
    </section>
  );
};

export default Products;
