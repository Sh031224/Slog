import axios from "axios";
import { server } from "../../config/index.json";

class CategoryList {
  async GetCategoryList() {
    const url = `${server}/api/v1/category/`;

    const { data } = await axios.get(url);

    return data;
  }

  async ModifyCategory(category_idx: number, name: string) {
    const url = `${server}/api/v1/category/${category_idx}`;

    const { data } = await axios.put(url, { name: name });

    return data;
  }

  async ModifyOrderNumber(category_idx: number, order_number: number) {
    const url = `${server}/api/v1/category/order`;

    const body = {
      idx: category_idx,
      order_number: order_number
    };

    const { data } = await axios.put(url, body);

    return data;
  }

  async DeleteCategory(category_idx: number) {
    const url = `${server}/api/v1/category/${category_idx}`;

    const { data } = await axios.delete(url);

    return data;
  }
  async CreateCategory(name: string) {
    const url = `${server}/api/v1/category/`;

    const body = {
      name: name
    };

    const { data } = await axios.post(url, body);

    return data;
  }
}

export default new CategoryList();
