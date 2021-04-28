const objectUtils = {
  isEmpty: (key: any) => {
    return Object.keys(key).length === 0 && key.constructor === Object;
  }
};

export default objectUtils;
