import { category } from "lib/api";
import createAsyncThunk from "lib/createAsyncThunk";
import {
  createCategoryAsync,
  deleteCategoryOrderAsync,
  getCategoriesAsync,
  modifyCategoryAsync,
  modifyCategoryOrderAsync
} from "./actions";

export const getCategoriesThunk = createAsyncThunk(getCategoriesAsync, category.getCategoryList);
export const createCategoryThunk = createAsyncThunk(
  createCategoryAsync,
  category.createCategory,
  getCategoriesThunk
);
export const modifyCategoryThunk = createAsyncThunk(
  modifyCategoryAsync,
  category.modifyCategory,
  getCategoriesThunk
);
export const modifyCategoryOrderThunk = createAsyncThunk(
  modifyCategoryOrderAsync,
  category.modifyOrderNumber,
  getCategoriesThunk
);
export const deleteCategoryThunk = createAsyncThunk(
  deleteCategoryOrderAsync,
  category.deleteCategory,
  getCategoriesThunk
);
