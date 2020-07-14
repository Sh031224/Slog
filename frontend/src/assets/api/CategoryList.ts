import axios from "axios";
import { server } from "../../config/index.json";

class CategoryList {
  async GetCategoryList() {
    try {
      const url = `${server}/api/v1/category/`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new CategoryList();
