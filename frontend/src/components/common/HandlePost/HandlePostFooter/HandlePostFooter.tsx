import React from "react";
import "./HandlePostFooter.scss";

interface HandlePostFooterProps {
  tempPostHandle: () => void;
  savePostHandle: () => void;
  isTemp: boolean;
  cancelBtn: () => void;
}

const HandlePostFooter = ({
  tempPostHandle,
  savePostHandle,
  isTemp,
  cancelBtn
}: HandlePostFooterProps) => {
  return (
    <div className="handle-post-footer">
      <div className="handle-post-footer-cancel" onClick={() => cancelBtn()}>
        취소
      </div>
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
