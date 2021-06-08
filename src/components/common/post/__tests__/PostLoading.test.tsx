import { render } from "setupTests";
import PostLoading from "../PostLoading";

describe("PostLoading", () => {
  const setup = (props = {}) => {
    return render(<PostLoading {...props} />);
  };

  it("matches snapshot", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
