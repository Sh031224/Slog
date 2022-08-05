import { Category } from "types/category";
import { CreatePostDTO } from "types/post";
import React, { memo } from "react";
import styled from "styled-components";

type Props = {
  value: CreatePostDTO;
  handleValue: (e: React.ChangeEvent<HTMLElement>) => void;
  categories: Category[];
};

const HandleUtil: React.FC<Props> = ({ value, handleValue, categories }) => {
  return (
    <HandleUtilWrapper>
      <HandleUtilThumbnail
        type="text"
        placeholder="미리보기 이미지를 넣어주세요."
        value={value.thumbnail}
        onChange={handleValue}
        name="thumbnail"
      />
      <HandleUtilCategory
        name="category_idx"
        onChange={handleValue}
        value={value.category_idx}
        required
      >
        <option value="">카테고리를 선택해주세요.</option>
        {categories.map((item, idx) => (
          <option value={item.idx} key={idx}>
            {item.name}
          </option>
        ))}
      </HandleUtilCategory>
    </HandleUtilWrapper>
  );
};

const HandleUtilWrapper = styled.section`
  display: flex;
  margin-bottom: 1rem;
  justify-content: space-between;
`;

const HandleUtilThumbnail = styled.input`
  padding: 0.4rem;
  font-size: 0.8rem;
  outline: none;
  width: 65%;
  border: ${({ theme }) => theme.colors.bdLightLightGray} 1px solid;
  border-radius: 5px;
  outline: none;
  &:focus {
    border: ${({ theme }) => theme.colors.bdLightGray} 2px solid;
  }
`;

const HandleUtilCategory = styled.select`
  width: 35%;
  border: ${({ theme }) => theme.colors.bdLightLightGray} 1px solid;
  border-radius: 5px;
  padding: 0.4rem;
  font-size: 0.8rem;
  outline: none;
  margin-left: 1rem;
  color: ${({ theme }) => theme.colors.ftBlack};
  &:invalid {
    color: ${({ theme }) => theme.colors.ftGray};
  }
`;

export default memo(HandleUtil);
