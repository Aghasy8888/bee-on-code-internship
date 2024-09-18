'use client';

import * as Yup from 'yup';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import {
  ADD_PRODUCT,
  ADD_PRODUCT_MODAL,
  ARTICLE_NUMBER_ALREADY_EXISTS,
  PRODUCTS,
} from '@/constants';
import {
  CategoryPanel,
  ModalWrapper,
  TextInput,
  UploadImages,
} from '@/components';
import { addProductValidationSchema } from '@/helpers/validationSchemas';
import useFocusRef from '@/hooks/useFocusRef';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  selectActiveCategory,
  selectActiveCategoryForAddProduct,
  selectActiveSubCategoryForAddProduct,
  selectProducts,
  setActiveCategory,
  setActiveSubCategory,
  setItems,
} from '@/redux/features/generalSlice';
import {
  doesArticleNumberExist,
  processImagesForLocalStorage,
} from '@/helpers';

import styles from './AddProductModal.module.scss';

interface INameState {
  articleNumber: string;
  setArticleNumber: TSetString;
}

interface IPriceState {
  price: number;
  setPrice: TSetNumber;
}

interface IImageFilesState {
  imageFiles: (ICustomFile | null)[];
  setImageFiles: TSetImageFiles;
}

interface IAddProductModalProps {
  setModalIsOpen: TSetBoolean;
  articleNumberState: INameState;
  priceState: IPriceState;
  imageFilesState: IImageFilesState;
}

const AddProductModal = ({
  setModalIsOpen,
  articleNumberState: { articleNumber, setArticleNumber },
  priceState: { price, setPrice },
  imageFilesState: { imageFiles, setImageFiles },
}: IAddProductModalProps) => {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector(selectActiveCategory);
  const products = useAppSelector(selectProducts);
  const activeCategoryForAddProduct = useAppSelector(
    selectActiveCategoryForAddProduct
  );
  const activeSubCategoryForAddProduct = useAppSelector(
    selectActiveSubCategoryForAddProduct
  );
  const [articleNumberError, setArticleNumberError] = useState<string | null>(
    null
  );
  const [priceError, setPriceError] = useState<string | null>(null);
  const [imageFilesError, setImageFilesError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  useFocusRef(nameInputRef);

  const handleFileChange = (event: TChangeEvent | TMouseEvent, i?: number) => {
    const newImageFile = event.target.files?.[0];

    if (newImageFile) {
      const updatedImageFiles = [...imageFiles];
      updatedImageFiles[i as number] = newImageFile;
      setImageFiles(updatedImageFiles);
    }
  };

  const onDeleteFile = (i?: number) => {
    const updatedImageFiles = [...imageFiles];
    updatedImageFiles[i as number] = null;
    setImageFiles(updatedImageFiles);
    setModalIsOpen(true);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (articleNumberError === ARTICLE_NUMBER_ALREADY_EXISTS) {
      return;
    }

    try {
      setArticleNumberError(null);
      setPriceError(null);
      setImageFilesError(null);
      const priceToValidate = price ? String(price) : '';

      await addProductValidationSchema.validate(
        { articleNumber, price: priceToValidate, imageFiles },
        { abortEarly: false }
      );

      const images = await processImagesForLocalStorage(imageFiles);

      const product: IProduct = {
        articleNumber,
        images,
        parent: `${activeCategoryForAddProduct?.name}->${activeSubCategoryForAddProduct}`,
        price,
      };

      dispatch(
        setActiveCategory({ data: activeCategoryForAddProduct, toMain: true })
      );
      dispatch(
        setActiveSubCategory({
          data: activeSubCategoryForAddProduct,
          toMain: true,
        })
      );
      dispatch(setItems({ data: product, itemName: PRODUCTS }));
      setArticleNumber('');
      setPrice(0);
      setImageFiles([null, null, null, null]);
      setModalIsOpen(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path === 'articleNumber') setArticleNumberError(err.message);
          if (err.path === 'price') setPriceError(err.message);
          if (err.path === 'imageFiles') setImageFilesError(err.message);
        });
      }
    }
  };

  const onArticleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const articleNumberExists = doesArticleNumberExist(products, e);

    if (articleNumberExists) {
      setArticleNumberError(ARTICLE_NUMBER_ALREADY_EXISTS);
    } else {
      setArticleNumberError(null);
    }

    setArticleNumber(e.target.value);
  };

  return (
    <ModalWrapper
      lessThanTwo={(activeCategory as ICategory).subCategories.length < 2}
      setModalIsOpen={setModalIsOpen}
      title={ADD_PRODUCT}
      className="product"
    >
      <div className={styles.container}>
        <CategoryPanel from={ADD_PRODUCT_MODAL} />
        <form onSubmit={(e) => onSubmit(e)} className={styles.form}>
          <UploadImages
            onDeleteFile={onDeleteFile}
            imageFileError={imageFilesError}
            handleFileChange={handleFileChange}
            imageFiles={imageFiles}
          />
          <div className={styles.articleNumberAndPrice}>
            <TextInput
              changeHandler={(e) => onArticleNameChange(e)}
              error={articleNumberError}
              inputValue={articleNumber}
              label="Артикул"
              name="articleNumber"
              required
              ref={nameInputRef}
            />
            <TextInput
              type="number"
              changeHandler={(e) => setPrice(e.target.value)}
              error={priceError}
              inputValue={price}
              label="Цена "
              name="price"
              required
            />
          </div>
        </form>
      </div>
      <div className={styles.addButtonCtn}>
        {
          // @ts-expect-error: onSubmit ts error is handled\
          <button className={styles.addButton} onClick={onSubmit}>
            добавить
          </button>
        }
      </div>
    </ModalWrapper>
  );
};

export default AddProductModal;
