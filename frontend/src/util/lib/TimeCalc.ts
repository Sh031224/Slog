import moment from "moment";

const calc = (time: string | Date) => {
  const date = moment.utc(time);
  const today = moment(new Date());

  const calc = today.valueOf() - date.valueOf();

  if (calc < 60 * 5 * 1000) {
    return "방금 전";
  } else if (calc < 60 * 60 * 1000) {
    return `${Math.ceil(calc / 1000 / 60)}분 전`;
  } else if (calc < 60 * 60 * 24 * 1000) {
    return `${Math.ceil(calc / 1000 / 60 / 60)}시간 전`;
  } else if (calc < 60 * 60 * 24 * 7 * 1000) {
    return `${Math.ceil(calc / 1000 / 60 / 60 / 24)}일 전`;
  } else if (calc < 60 * 60 * 24 * 7 * 4 * 1000) {
    return `${Math.ceil(calc / 1000 / 60 / 60 / 24 / 7)}주 전`;
  } else if (calc < 60 * 60 * 24 * 7 * 4 * 12 * 1000) {
    return `${Math.ceil(calc / 1000 / 60 / 60 / 24 / 7 / 4)}달 전`;
  } else {
    return `${Math.ceil(calc / 1000 / 60 / 60 / 24 / 7 / 4 / 12)}년 전`;
  }
};

const getTime = (time: string | Date) => {
  return moment.utc(time).format("YYYY년 MM월 DD일 HH시 mm분");
};

const checkModify = (created_at: string | Date, updated_at: string | Date) => {
  return created_at === updated_at;
};

export default {
  calc,
  getTime,
  checkModify
};
