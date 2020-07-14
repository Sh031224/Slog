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
}

export default CategoryStore;
