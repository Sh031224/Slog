import { AxiosError } from "axios";
import { ICategory } from "interface/ICategory";
import { ResponseType } from "interface/IResponse";
import { createAsyncAction } from "typesafe-actions";

export const GET_CATEGORIES = "category/GET_CATEGORIES" as const;
export const GET_CATEGORIES_SUCCESS = "category/GET_CATEGORIES_SUCCESS" as const;
export const GET_CATEGORIES_FAILURE = "category/GET_CATEGORIES_FAILURE" as const;

export const CREATE_CATEGORY = "category/CREATE_CATEGORY" as const;
export const CREATE_CATEGORY_SUCCESS = "category/CREATE_CATEGORY_SUCCESS" as const;
export const CREATE_CATEGORY_FAILURE = "category/CREATE_CATEGORY_FAILURE" as const;

export const MODIFY_CATEGORY = "category/MODIFY_CATEGORY" as const;
export const MODIFY_CATEGORY_SUCCESS = "category/MODIFY_CATEGORY_SUCCESS" as const;
export const MODIFY_CATEGORY_FAILURE = "category/MODIFY_CATEGORY_FAILURE" as const;

export const MODIFY_CATEGORY_ORDER = "category/MODIFY_CATEGORY_ORDER" as const;
export const MODIFY_CATEGORY_ORDER_SUCCESS = "category/MODIFY_CATEGORY_ORDER_SUCCESS" as const;
export const MODIFY_CATEGORY_ORDER_FAILURE = "category/MODIFY_CATEGORY_ORDER_FAILURE" as const;

export const DELETE_CATEGORY = "category/DELETE_CATEGORY" as const;
export const DELETE_CATEGORY_SUCCESS = "category/DELETE_CATEGORY_SUCCESS" as const;
export const DELETE_CATEGORY_FAILURE = "category/DELETE_CATEGORY_FAILURE" as const;

export const getCategoriesAsync = createAsyncAction(
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE
)<void, { categories: ICategory[]; total: number }, AxiosError<ResponseType>>();

export const createCategoryAsync = createAsyncAction(
  CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const modifyCategoryAsync = createAsyncAction(
  MODIFY_CATEGORY,
  MODIFY_CATEGORY_SUCCESS,
  MODIFY_CATEGORY_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const modifyCategoryOrderAsync = createAsyncAction(
  MODIFY_CATEGORY_ORDER,
  MODIFY_CATEGORY_ORDER_SUCCESS,
  MODIFY_CATEGORY_ORDER_FAILURE
)<void, void, AxiosError<ResponseType>>();

export const deleteCategoryOrderAsync = createAsyncAction(
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
)<void, void, AxiosError<ResponseType>>();
