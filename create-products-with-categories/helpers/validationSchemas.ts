import { PHOTO_IS_REQUIRED } from '@/constants';
import * as Yup from 'yup';

export const addCategoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((originalValue) =>
      originalValue === '' ? undefined : originalValue
    )
    .required('Имя обязательно')
    .trim()
    .label('Имя')
    .max(254, 'Имя должен содержать не более 254 символов'),

  imageFile: Yup.string().required('Фото обязательно'),
});

export const addSubCategoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .transform((originalValue) =>
      originalValue === '' ? undefined : originalValue
    )
    .required('Имя обязательно')
    .trim()
    .label('Имя')
    .max(254, 'Имя должен содержать не более 254 символов'),
});

export const addProductValidationSchema = Yup.object().shape({
  articleNumber: Yup.string()
    .transform((originalValue) =>
      originalValue === '' ? undefined : originalValue
    )
    .required('Артикул обязательно')
    .trim()
    .label('Артикул')
    .max(254, 'Артикул должен содержать не более 254 символов'),
  price: Yup.string()
    .transform((originalValue) =>
      originalValue === '' ? undefined : originalValue
    )
    .required('Цена обязательна')
    .label('Цена'),
    imageFiles: Yup.array()
    .of(Yup.mixed().nullable()) // Allows null values but does not validate each item individually
    .required('Файлы обязательны')
    .test(
      'at-least-one-non-null',
      PHOTO_IS_REQUIRED,
      (value) => Array.isArray(value) && value.some(file => file !== null)
    )
});
