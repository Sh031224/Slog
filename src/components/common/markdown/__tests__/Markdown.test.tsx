import { render } from "setupTests";
import Markdown, { IMarkdownProps } from "../Markdown";

describe("Markdown", () => {
  const setup = (props = {}) => {
    const initialProps: IMarkdownProps = {
      content: "## Testing"
    };

    return render(<Markdown {...initialProps} {...props} />);
  };

  it("matches snapshot", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const { getByText } = setup();

    expect(
      getByText(
        (content, element) =>
          element.tagName.toLowerCase() === "h2" && content.startsWith("Testing")
      )
    );
  });
});
