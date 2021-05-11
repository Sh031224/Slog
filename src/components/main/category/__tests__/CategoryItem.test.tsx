import { render } from "setupTests";
import CategoryItem, { ICategoryItemProps } from "../CategoryItem";

describe("Category", () => {
  const setup = (props: Partial<ICategoryItemProps> = {}) => {
    const initialProps: ICategoryItemProps = {
      href: "/",
      params: "",
      name: "Testing",
      postCount: 99,
      getIsActive: () => true
    };
    return render(<CategoryItem {...initialProps} {...props} />);
  };

  it("renders correctly", () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it("item render", () => {
    const { getByText } = setup();

    getByText("Testing");
  });
});
