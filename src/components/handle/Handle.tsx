import useHandlePost from "hooks/handle/useHandlePost";

import styled from "styled-components";
import HandleContent from "./content/HandleContent";
import HandleFooter from "./footer/HandleFooter";
import HandleHeader from "./header/HandleHeader";
import HandleUtil from "./util/HandleUtil";

const Handle: React.FC = () => {
  const {
    value,
    handleValue,
    categories,
    isPreviewTab,
    setIsPreviewTab,
    handleContentTab,
    handleUpload,
    textareaRef,
    isNew,
    save,
    tempSave
  } = useHandlePost();

  return (
    <HandleWrapper>
      <HandleBox>
        <HandleHeader value={value} handleValue={handleValue} />
        <HandleUtil value={value} handleValue={handleValue} categories={categories} />
        <HandleContent
          value={value}
          handleValue={handleValue}
          isPreviewTab={isPreviewTab}
          setIsPreviewTab={setIsPreviewTab}
          textareaRef={textareaRef}
          handleContentTab={handleContentTab}
          handleUpload={handleUpload}
        />
        <HandleFooter isNew={isNew} isTemp={value.is_temp} save={save} tempSave={tempSave} />
      </HandleBox>
    </HandleWrapper>
  );
};

const HandleWrapper = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const HandleBox = styled.div`
  max-width: 900px;
  position: relative;
  width: 100%;
  padding: 0 1rem;
`;

export default Handle;
