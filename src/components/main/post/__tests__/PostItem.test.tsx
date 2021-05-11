import { render } from "setupTests";
import PostItem, { IPostItemProps } from "../PostItem";

describe("Post Item", () => {
  const setup = (props: Partial<IPostItemProps> = {}) => {
    const initialProps: IPostItemProps = {
      item: {
        idx: 1,
        title: "Testing",
        description: "This is Testing Post",
        content: "content",
        view: 1,
        is_temp: false,
        fk_category_idx: 1,
        thumbnail: "",
        comment_count: 1,
        created_at: new Date(10),
        updated_at: new Date(10)
      }
    };
    return render(<PostItem {...initialProps} {...props} />);
  };

  it("renders correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it("post href", () => {
    const { container } = setup();

    expect(container.querySelector("a")).toHaveAttribute("href", "/post/1");
  });
});
