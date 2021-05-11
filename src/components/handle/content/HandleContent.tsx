import React from "react";
import styled from "styled-components";
import { FiCode, FiEye } from "react-icons/fi";
import { AiOutlinePicture } from "react-icons/ai";
import { ICreatePostDTO } from "interface/IPost";
import Markdown from "components/common/markdown/Markdown";

interface IHandleContentProps {
  textareaRef: React.MutableRefObject<HTMLTextAreaElement>;
  value: ICreatePostDTO;
  handleValue: (e: React.ChangeEvent<HTMLElement>) => void;
  isPreviewTab: boolean;
  setIsPreviewTab: React.Dispatch<React.SetStateAction<boolean>>;
  handleContentTab: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleUpload: (e: React.ChangeEvent<HTMLElement>) => void;
}

const HandleContent: React.FC<IHandleContentProps> = ({
  value,
  handleValue,
  isPreviewTab,
  setIsPreviewTab,
  textareaRef,
  handleContentTab,
  handleUpload
}) => {
  return (
    <HandleContentWrapper>
      <HandleContentBox>
        <HandleContentHeader>
          <HandleContentHeaderTab>
            <HandleContentHeaderTabItem
              aria-label="change-tab"
              isActive={!isPreviewTab}
              onClick={() => setIsPreviewTab(false)}
            >
              <HandleContentHeaderEdit />
              Edit Content
            </HandleContentHeaderTabItem>
            <HandleContentHeaderTabItem
              aria-label="change-preview"
              isActive={isPreviewTab}
              onClick={() => setIsPreviewTab(true)}
            >
              <HandleContentHeaderPreview />
              Preview
            </HandleContentHeaderTabItem>
          </HandleContentHeaderTab>
          <HandleContentHeaderImage>
            <label htmlFor="upload">
              <AiOutlinePicture />
            </label>
            <input type="file" accept="png, gif, jpeg, jpg" id="upload" onChange={handleUpload} />
          </HandleContentHeaderImage>
        </HandleContentHeader>
        <HandleContentPreview isActive={isPreviewTab}>
          <Markdown content={value.content} />
        </HandleContentPreview>
        <HandleContentTextArea
          isActive={!isPreviewTab}
          value={value.content}
          name="content"
          onChange={handleValue}
          ref={textareaRef}
          onKeyDown={handleContentTab}
        />
      </HandleContentBox>
    </HandleContentWrapper>
  );
};

const HandleContentWrapper = styled.section`
  margin-top: 2rem;
  input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
  .upload-image {
    ${({ theme }) => theme.device.mobile} {
      width: 15rem !important;
      p {
        font-size: 0.7rem !important;
      }
    }
  }
`;

const HandleContentBox = styled.div`
  width: 100%;
  border-radius: 5px;
  border: ${({ theme }) => theme.colors.bdLightLightGray} 1px solid;
  position: relative;
`;

const HandleContentHeader = styled.div`
  display: table;
  width: 100%;
  border-bottom: ${({ theme }) => theme.colors.bdLightLightGray} 1px solid;
  background-color: ${({ theme }) => theme.colors.bgSoLightGray};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  position: relative;
  padding: 0.25rem 0.5rem;
`;

const HandleContentHeaderTab = styled.div`
  margin: calc(-0.25rem - 1px) 0 calc(-0.25rem - 1.5px) calc(-0.5rem - 1.5px);
  cursor: pointer;
  display: inline-block;
`;

const HandleContentHeaderTabItem = styled.button<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  color: ${({ theme }) => theme.colors.ftMarkdownBlack};
  line-height: 23px;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.bgWhite : "transparent")};
  ${({ theme, isActive }) =>
    isActive && `border: 1px solid ${theme.colors.bdLightLightGray};border-bottom: none;`}
  ${({ theme }) => theme.device.mobile} {
    font-size: 0.7rem;
    padding: 0.5rem 0.9rem;
  }
  &:first-child {
    border-top-left-radius: 5px;
  }
`;

const HandleContentHeaderEdit = styled(FiCode)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.ftLittleGray};
  margin-right: 0.8rem;
  ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
`;

const HandleContentHeaderPreview = styled(FiEye)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.ftLittleGray};
  margin-right: 0.8rem;
  ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
    margin-right: 0.5rem;
  }
`;

const HandleContentHeaderImage = styled.div`
  display: inline-block;
  width: calc(100% - 20rem);
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.ftDarkGray};
  ${({ theme }) => theme.device.mobile} {
    width: calc(100% - 13rem);
    font-size: 1rem;
  }
  svg {
    cursor: pointer;
  }
`;

const HandleContentTextArea = styled.textarea<{ isActive: boolean }>`
  font-family: NotoSansKR;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  display: ${({ isActive }) => (isActive ? "block" : "none")};
  resize: none;
  width: 100%;
  height: 40rem;
  overflow: auto;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const HandleContentPreview = styled.div<{ isActive: boolean }>`
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0.3rem 1rem;
  height: 40rem;
  overflow: scroll;
  display: ${({ isActive }) => (isActive ? "block" : "none")};
`;

export default HandleContent;
