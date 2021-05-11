import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";
import { lightTheme } from "style/theme";
import { store } from "stores";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lightTheme}>
        <NotificationContainer />
        {children}
      </ThemeProvider>
    </Provider>
  );
};

const customRender = (ui, options = {}) => render(ui, { wrapper: Providers, ...options });

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import "jest-styled-components";

(window as any).scrollTo = () => {};

export { customRender as render };
