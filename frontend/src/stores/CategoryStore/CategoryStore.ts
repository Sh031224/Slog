import { observable, action } from "mobx";
import Category from "../../assets/api/Category";

class CategoryStore {
  @observable categoryList = [];
  @observable totalPost = 0;

  @action
  handleCategoryList = async () => {
    try {
      const response = await Category.GetCategoryList();
      this.categoryList = response.data.categories;
      this.totalPost = response.data.total;

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  modifyOrderCategory = async (category_idx: number, order_number: number) => {
    try {
      const response = await Category.ModifyOrderNumber(
        category_idx,
        order_number
      );

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  modifyCategoryName = async (category_idx: number, name: string) => {
    try {
      const response = await Category.ModifyCategory(category_idx, name);

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  deleteCategory = async (category_idx: number) => {
    try {
      const response = await Category.DeleteCategory(category_idx);

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  createCategory = async (name: string) => {
    try {
      const response = await Category.CreateCategory(name);

      return new Promise((resolve, _reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((_resolve, reject) => {
        reject(error);
      });
    }
  };
}

export default CategoryStore;
