'use client';

import * as Yup from 'yup';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  ADD_SUBCATEGORY_TITLE,
  CHOOSE_DIFFERENT_NAME,
  SUBCATEGORY_ALREADY_EXISTS,
} from '@/constants';
import { ModalWrapper, TextInput } from '@/components';
import { addSubCategoryValidationSchema } from '@/helpers/validationSchemas';
import useFocusRef from '@/hooks/useFocusRef';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActiveCategory,
  setSubCategories,
} from '@/redux/features/generalSlice';
import { doesCategoryExist } from '@/helpers';

import styles from './AddSubCategoryModal.module.scss';

interface INameState {
  name: string;
  setName: TSetString;
}

interface IAddSubCategoryModalProps {
  setModalIsOpen: TSetBoolean;
  nameState: INameState;
}

const AddSubCategoryModal = ({
  setModalIsOpen,
  nameState: { name, setName },
}: IAddSubCategoryModalProps) => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const [nameError, setNameError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  useFocusRef(nameInputRef);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      nameError === SUBCATEGORY_ALREADY_EXISTS ||
      nameError === CHOOSE_DIFFERENT_NAME
    ) {
      return;
    }

    try {
      setNameError(null);

      await addSubCategoryValidationSchema.validate(
        { name },
        { abortEarly: false }
      );

      dispatch(setSubCategories(name));
      setName('');
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === 'name') setNameError(err.message);
        });
      }
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const categoryExists = doesCategoryExist(activeCategory as ICategory, e);
    const wrongName =
      activeCategory?.name.toLowerCase() === e.target.value.toLowerCase(); // subcategory name is the same as category name

    if (categoryExists) {
      setNameError(SUBCATEGORY_ALREADY_EXISTS);
    } else if (wrongName) {
      setNameError(CHOOSE_DIFFERENT_NAME);
    } else {
      setNameError(null);
    }

    setName(e.target.value);
  };

  return (
    <ModalWrapper
      lessThanTwo={(activeCategory as ICategory).subCategories.length < 2}
      setModalIsOpen={setModalIsOpen}
      title={`${activeCategory?.name} : ${ADD_SUBCATEGORY_TITLE}`}
      className='subCategory'
    >
      <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
        <TextInput
          changeHandler={(e) => onNameChange(e)}
          error={nameError}
          inputValue={name}
          placeholder="Подкатегория"
          required
          ref={nameInputRef}
        />
        {
          // @ts-expect-error: onSubmit ts error is handled
          <button className={styles.addButton} onClick={onSubmit}>
            добавить
          </button>
        }
      </form>
    </ModalWrapper>
  );
};

export default AddSubCategoryModal;
