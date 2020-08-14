import React from "react";
import "./HandlePostFooter.scss";

interface HandlePostFooterProps {
  tempPostHandle: () => void;
  savePostHandle: () => void;
  isTemp: boolean;
}

const HandlePostFooter = ({
  tempPostHandle,
  savePostHandle,
  isTemp
}: HandlePostFooterProps) => {
  return (
    <div className="handle-post-footer">
      <div className="handle-post-footer-cancel">취소</div>
      {isTemp && (
        <div
          className="handle-post-footer-temp"
          onClick={() => tempPostHandle()}
        >
          임시 저장
        </div>
      )}
      <div className="handle-post-footer-save" onClick={() => savePostHandle()}>
        저장
      </div>
    </div>
  );
};

export default HandlePostFooter;
