import React from "react";

// 라우트로 사용된 컴포넌트는 history, location, match 3개의 props를 전달받음
const NotFoundPage = ({ history, location, match }) => {
  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <h2>Path: {location.pathname}</h2>
    </div>
  );
};

export default NotFoundPage;
