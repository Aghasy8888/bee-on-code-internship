'use client';

import * as Yup from 'yup';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { CATEGORIES, CATEGORY_ALREADY_EXISTS, FEMALE } from '@/constants';
import {
  GenderSelection,
  ModalWrapper,
  TextInput,
  UploadImage,
} from '@/components';
import { addCategoryValidationSchema } from '@/helpers/validationSchemas';
import useFocusRef from '@/hooks/useFocusRef';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectCategories, setItems } from '@/redux/features/generalSlice';
import { processImagesForLocalStorage } from '@/helpers';
import {setGender as setGenderInRedux} from '@/redux/features/helperSlice';

import styles from './AddCategoryModal.module.scss';

interface IGenderState {
  gender: string;
  setGender: TSetString;
}

interface INameState {
  name: string;
  setName: TSetString;
}

interface IImageFileState {
  imageFile: File | null;
  setImageFile: TSetImageFile;
}

interface IAddCategoryModalProps {
  setModalIsOpen: TSetBoolean;
  genderState: IGenderState;
  nameState: INameState;
  imageFileState: IImageFileState;
  genderForFilter: string;
}

const AddCategoryModal = ({
  setModalIsOpen,
  genderState: { gender, setGender },
  genderForFilter,
  imageFileState: { imageFile, setImageFile },
  nameState: { name, setName },
}: IAddCategoryModalProps) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const filteredCategories = categories.filter(
    (c) => c.gender === genderForFilter
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [imageFileError, setImageFileError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  useFocusRef(nameInputRef);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImageFile = event.target.files?.[0];

    if (newImageFile) {
      setImageFile(newImageFile);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameError === CATEGORY_ALREADY_EXISTS) {
      return;
    }

    try {
      setNameError(null);
      setImageFileError(null);

      await addCategoryValidationSchema.validate(
        { name, imageFile },
        { abortEarly: false }
      );

      const img = await processImagesForLocalStorage([imageFile]);

      const category: ICategory = {
        gender,
        img,
        name,
        subCategories: [],
      };

      dispatch(setGenderInRedux(category.gender));
      dispatch(setItems({ data: category, itemName: CATEGORIES }));
      setGender(FEMALE);
      setName('');
      setImageFile(null);
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === 'name') setNameError(err.message);
          if (err.path === 'imageFile') setImageFileError(err.message);
        });
      }
    }
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const categoryExists = categories.some(
      (c) => c.name.toLowerCase() === e.target.value.toLowerCase()
    );

    if (categoryExists) {
      setNameError(CATEGORY_ALREADY_EXISTS);
    } else {
      setNameError(null);
    }

    setName(e.target.value);
  };

  return (
    <ModalWrapper
      lessThanTwo={filteredCategories.length < 2}
      setModalIsOpen={setModalIsOpen}
      title="добавить категория"
    >
      <form className={styles.form} onSubmit={(e) => onSubmit(e)}>
        <GenderSelection gender={gender} setGender={setGender} />

        <TextInput
          changeHandler={(e) => onNameChange(e)}
          error={nameError}
          inputValue={name}
          placeholder="Категория"
          required
          ref={nameInputRef}
        />

        <UploadImage
          imageFileError={imageFileError}
          handleFileChange={handleFileChange}
          imageFile={imageFile}
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

export default AddCategoryModal;
