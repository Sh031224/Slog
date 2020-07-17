import { observable, action } from "mobx";
import { autobind } from "core-decorators";
import CategoryList from "../../assets/api/CategoryList";

@autobind
class CategoryStore {
  @observable categoryList = [];
  @observable total_post = 0;

  @action
  handleCategoryList = async () => {
    try {
      const response = await CategoryList.GetCategoryList();
      this.categoryList = response.data.categories;
      this.total_post = response.data.total;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  modifyOrderCategory = async (category_idx: number, order_number: number) => {
    try {
      const response = await CategoryList.ModifyOrderNumber(
        category_idx,
        order_number
      );

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  modifyCategoryName = async (category_idx: number, name: string) => {
    try {
      const response = await CategoryList.ModifyCategory(category_idx, name);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  deleteCategory = async (category_idx: number) => {
    try {
      const response = await CategoryList.DeleteCategory(category_idx);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };

  @action
  createCategory = async (name: string) => {
    try {
      const response = await CategoryList.CreateCategory(name);

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }
  };
}

export default CategoryStore;
