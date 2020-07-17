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

  async ModifyCategory(category_idx: number, name: string) {
    try {
      const url = `${server}/api/v1/category/${category_idx}`;

      const { data } = await axios.put(url, { name: name });

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ModifyOrderNumber(category_idx: number, order_number: number) {
    try {
      const url = `${server}/api/v1/category/order`;

      const body = {
        idx: category_idx,
        order_number: order_number
      };

      const { data } = await axios.put(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeleteCategory(category_idx: number) {
    try {
      const url = `${server}/api/v1/category/${category_idx}`;

      const { data } = await axios.delete(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async CreateCategory(name: string) {
    try {
      const url = `${server}/api/v1/category/`;

      const body = {
        name: name
      };

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new CategoryList();
