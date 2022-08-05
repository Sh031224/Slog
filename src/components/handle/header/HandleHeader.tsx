import { memo } from "react";
import styled from "styled-components";

import type { CreatePostDTO } from "types/post";

type Props = {
  value: CreatePostDTO;
  handleValue: (e: React.ChangeEvent<HTMLElement>) => void;
};

const HandleHeader: React.FC<Props> = ({ value, handleValue }) => {
  return (
    <HandleHeaderWrapper>
      <HandleTextInput
        type="text"
        maxLength={255}
        placeholder="제목을 입력하세요."
        value={value.title}
        name="title"
        onChange={handleValue}
      />
      <HandleTextInput
        type="text"
        maxLength={255}
        placeholder="설명을 입력하세요."
        value={value.description}
        name="description"
        onChange={handleValue}
      />
    </HandleHeaderWrapper>
  );
};

const HandleHeaderWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`;

const HandleTextInput = styled.input`
  border: ${({ theme }) => theme.colors.bdLightLightGray} 1px solid;
  border-radius: 5px;
  padding: 0.75rem;
  outline: none;
  margin-bottom: 1rem;
  &:focus {
    border: ${({ theme }) => theme.colors.bdLightGray} 2px solid;
  }
  &:first-child {
    font-size: 1.3rem;
  }
`;

export default memo(HandleHeader);
