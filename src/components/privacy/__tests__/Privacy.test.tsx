import { render } from "setupTests";
import Privacy from "../Privacy";

describe("Privacy", () => {
  const setup = (props = {}) => {
    return render(<Privacy {...props} />);
  };

  it("renders correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
