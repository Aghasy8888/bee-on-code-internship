import { ReactNode } from 'react';
import Image from 'next/image';
import { XIcon } from '@/public/assets';

import styles from './ModalWrapper.module.scss';

interface IModalWrapperProps {
  children: ReactNode;
  title: string;
  setModalIsOpen: TSetBoolean;
  lessThanTwo: boolean;
  className?: string;
}

const ModalWrapper = ({
  children,
  title,
  setModalIsOpen,
  lessThanTwo,
  className,
}: IModalWrapperProps) => {
  return (
    <div className={styles.bigContainer}>
      <dialog
        className={`${styles.modalWrapper} ${
          className ? styles[className] : ''
        } ${title.includes(':') ? styles.subCategory : ''} ${
          lessThanTwo ? styles.lessThanTwoCategories : ''
        }`}
      >
        <div className={styles.titleAndXIcon}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button type="button" onClick={() => setModalIsOpen(false)}>
            <Image alt="xIcon" src={XIcon} width={16} height={16} />
          </button>
        </div>
        {children}
      </dialog>
    </div>
  );
};

export default ModalWrapper;
