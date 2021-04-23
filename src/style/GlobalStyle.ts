import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
}

img {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
}

html,
body {
  font-family: NotoSansKR;
  min-height: 100vh;
  margin: 0;
  -webkit-overflow-scrolling: none;
}

.notification {
  @media screen and (max-width: 500px) {
    width: 250px;
    &-title {
      font-size: 1rem;
    }
    &-message {
      font-size: 0.9rem;
    }
  }
}

.react-confirm-alert-body {
  @media screen and (max-width: 500px) {
    width: 300px !important;
  }
}

.notification-success:before {
  content: "✓";
}

.notification-info:before {
  content: "ℹ";
}

.notification-warning:before {
  content: "!";
}

.notification-error:before {
  content: "𝗑";
}

.react-confirm-alert-button-group > button:last-child {
  background-color: #fff;
  border: 1px solid gray;
  color: gray;
}

a {
  text-decoration: none;
}

@keyframes loading {
  0% {
    background-color: rgba(182, 182, 182, 0.1);
  }
  50% {
    background-color: rgba(182, 182, 182, 0.25);
  }
  100% {
    background-color: rgba(182, 182, 182, 0.1);
  }
}

`;

export default GlobalStyle;
