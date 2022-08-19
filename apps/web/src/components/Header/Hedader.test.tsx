import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header.tsx", () => {
  const setup = (props = {}) => {
    return render(<Header {...props} />);
  };

  it("matches snapshot", () => {
    const { container } = setup();

    expect(container.querySelector("header")?.textContent).toBe("Header");
  });
});
