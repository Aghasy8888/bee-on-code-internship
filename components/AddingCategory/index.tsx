'use client';

import Image from 'next/image';
import { memo, useState } from 'react';
import { plusIcon, plusIconActive } from '@/public/assets';
import { AddCategoryModal, Categories } from '@/components';
import useCloseModal from '@/hooks/useCloseModal';
import { FEMALE } from '@/constants';
import { ModalBackground } from '@/common';
import { useAppSelector } from '@/redux/hooks';
import { selectGender } from '@/redux/features/helperSlice';

import styles from './AddingCategory.module.scss';

interface IAddingCategoryProps {
  from: string;
}

const AddingCategory = ({
  from = '',
}: IAddingCategoryProps) => {
  const genderForFilter = useAppSelector(selectGender);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gender, setGender] = useState(FEMALE);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  useCloseModal(modalIsOpen, setModalIsOpen);

  return (
    <div className={styles.addingCategory}>
      <Categories gender={genderForFilter} from={from} />

      {!from && (
        <button
          className={`${styles.addCategoryBtn} ${
            modalIsOpen ? styles.z_1 : ''
          }`}
          onClick={() => setModalIsOpen(true)}
        >
          <Image
            alt="plusIcon"
            src={modalIsOpen ? plusIconActive : plusIcon}
            width={12}
            height={12}
            priority
          />
        </button>
      )}

      {modalIsOpen && (
        <>
          <AddCategoryModal
            genderForFilter={genderForFilter}
            genderState={{ gender, setGender }}
            imageFileState={{ imageFile, setImageFile }}
            nameState={{ name, setName }}
            setModalIsOpen={setModalIsOpen}
          />
          <ModalBackground />
        </>
      )}
    </div>
  );
};

export default memo(AddingCategory);
