import styled from "styled-components";

type Props = {
  isNew: boolean;
  isTemp: boolean;
  save: () => void;
  tempSave: () => void;
};

const HandleFooter: React.FC<Props> = ({ isNew, isTemp, save, tempSave }) => {
  return (
    <HandleFooterWrapper>
      <HandleFooterBtn aria-label="cancel-handle">취소</HandleFooterBtn>
      {(isNew || isTemp) && (
        <HandleFooterBtn aria-label="temp-handle" onClick={tempSave}>
          임시 저장
        </HandleFooterBtn>
      )}
      <HandleFooterBtn aria-label="save-handle" onClick={save}>
        저장
      </HandleFooterBtn>
    </HandleFooterWrapper>
  );
};

const HandleFooterWrapper = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const HandleFooterBtn = styled.button`
  border: none;
  padding: 0.5rem 1rem;
  margin-left: 1.5rem;
  box-shadow: 1px 1px 10px ${({ theme }) => theme.colors.sdBlack};
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  &:last-child {
    background-color: ${({ theme }) => theme.colors.bgBlue};
    color: ${({ theme }) => theme.colors.ftWhite};
  }
`;

export default HandleFooter;
