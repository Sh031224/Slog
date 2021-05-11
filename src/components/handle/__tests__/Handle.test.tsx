import { render } from "setupTests";
import Handle from "../Handle";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/handle/1",
      pathname: "",
      query: { idx: 1 },
      asPath: "",
      push: jest.fn()
    };
  }
}));

describe("Handle", () => {
  const setup = (props = {}) => {
    return render(<Handle {...props} />);
  };

  it("renders correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
