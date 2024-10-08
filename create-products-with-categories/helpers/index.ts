import { ChangeEvent } from 'react';

export const getItemFromStorage = (
  item: string,
  window: Window & typeof globalThis
) => {
  if (
    typeof window !== 'undefined' &&
    typeof window.localStorage.getItem(item) === 'string'
  ) {
    return JSON.parse(window.localStorage.getItem(item) as string);
  }
};

export const doesCategoryExist = (
  activeCategory: ICategory,
  e: ChangeEvent<HTMLInputElement>
) => {
  const targetValueLowerCase = e.target.value.toLowerCase();

  return activeCategory.subCategories.some(
    (s) => s.toLowerCase() === targetValueLowerCase
  );
};

export const doesArticleNumberExist = (
  products: IProduct[],
  e: ChangeEvent<HTMLInputElement>
) => {
  const targetValueLowerCase = e.target.value.toLowerCase();

  return products.some(
    (p) => p.articleNumber.toLowerCase() === targetValueLowerCase
  );
};

export const findFirstNullIndex = (elements: (File | null)[]) => {
  if (!elements) return -1;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i] === null) return i;
  }

  return -1;
};

export const removeNulls = (array: (ICustomFile | null)[]) => array.filter(element => element !== null);

export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const processImagesForLocalStorage = async (imageFiles: (File | null)[]) => {
  const nonNullFiles = imageFiles.filter(file => file !== null) as File[];
  const base64Images = await Promise.all(nonNullFiles.map((file) => convertToBase64(file)));
  
 return JSON.stringify(base64Images);
};

