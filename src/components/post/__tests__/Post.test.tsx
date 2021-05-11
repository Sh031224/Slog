import { render } from "setupTests";
import Post from "../Post";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/post/1",
      pathname: "",
      query: { idx: 1 },
      asPath: "",
      push: jest.fn()
    };
  }
}));

describe("Post", () => {
  const setup = (props = {}) => {
    return render(<Post {...props} />);
  };

  it("renders correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
