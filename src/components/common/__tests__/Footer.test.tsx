import { render } from "setupTests";
import Footer from "../Footer";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: ""
    };
  }
}));

describe("Footer", () => {
  const setup = (props = {}) => {
    return render(<Footer {...props} />);
  };

  it("renders correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
