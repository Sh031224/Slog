import moment from "moment";

const getTime = (time: string | Date) => {
  return moment(time).format("YYYY년 MM월 DD일 HH시 mm분");
};

const checkModify = (created_at: string | Date, updated_at: string | Date) => {
  return !(created_at === updated_at);
};

export default {
  getTime,
  checkModify
};
