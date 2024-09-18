// Import createSlice from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import { CATEGORIES, PRODUCTS } from '@/constants';

interface IGeneralState {
  products: IProduct[];
  categories: ICategory[];
  activeCategory: ICategory | null;
  activeSubCategory: string;
  activeCategoryForAddProduct: ICategory | null;
  activeSubCategoryForAddProduct: string;
}

// Initial state
const initialState: IGeneralState = {
  products: [],
  categories: [],
  activeCategory: null,
  activeSubCategory: '',
  activeCategoryForAddProduct: null,
  activeSubCategoryForAddProduct: '',
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setItems(
      state,
      {
        payload: { data, itemName },
      }: { payload: { data: unknown; itemName: string } }
    ) {
      //@ts-expect-error 'string' can be used to index state
      state[itemName] = [...state[itemName], data];
    },
    setSubCategories(state, { payload }) {
      const targetCategoryIndex = state.categories.findIndex(
        (category) => category.name === state.activeCategory?.name
      );

      (state.activeCategory as ICategory).subCategories = [
        ...(state.activeCategory as ICategory).subCategories,
        payload,
      ];
      state.categories[targetCategoryIndex] = state.activeCategory as ICategory;
    },
    setActiveCategory(
      state,
      {
        payload: { data, toMain = false },
      }: { payload: { data: ICategory | null; toMain?: boolean } }
    ) {
      const activeCategory = !toMain
        ? 'activeCategoryForAddProduct'
        : 'activeCategory';
      const activeSubCategory = !toMain
        ? 'activeSubCategoryForAddProduct'
        : 'activeSubCategory';

      state[activeCategory] = data;
      state[activeSubCategory] = data ? data.name : '';
    },
    setDefaultActiveCategory(state, { payload }) {
      state.activeCategory = payload;
      state.activeSubCategory = payload ? payload.name : '';
      state.activeCategoryForAddProduct = payload;
      state.activeSubCategoryForAddProduct = payload ? payload.name : '';
    },
    setActiveSubCategory(
      state,
      {
        payload: { data, toMain = false },
      }: { payload: { data: string; toMain?: boolean } }
    ) {
      const activeSubCategory = !toMain
        ? 'activeSubCategoryForAddProduct'
        : 'activeSubCategory';

      state[activeSubCategory] = data;
    },
    setDataFromStorage(
      state,
      {
        payload: { data, name },
      }: { payload: { data: unknown | ICategory[]; name: string } }
    ) {
      if (!data) return state;
      switch (name) {
        case CATEGORIES:
          state.categories = data as ICategory[];
          break;
        case PRODUCTS:
          state.products = data as IProduct[];
          break;
      }
    },
  },
});

export const {
  setActiveCategory,
  setActiveSubCategory,
  setSubCategories,
  setDataFromStorage,
  setItems,
  setDefaultActiveCategory,
} = generalSlice.actions;

export const selectCategories = (state: RootState) =>
  state.generalSlice.categories;
export const selectActiveCategory = (state: RootState) =>
  state.generalSlice.activeCategory;
export const selectActiveSubCategory = (state: RootState) =>
  state.generalSlice.activeSubCategory;
export const selectActiveCategoryForAddProduct = (state: RootState) =>
  state.generalSlice.activeCategoryForAddProduct;
export const selectActiveSubCategoryForAddProduct = (state: RootState) =>
  state.generalSlice.activeSubCategoryForAddProduct;
export const selectProducts = (state: RootState) => state.generalSlice.products;

export default generalSlice.reducer;
