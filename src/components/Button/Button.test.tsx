import { render } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("renders", () => {
    const component = render(<Button>Button</Button>);

    expect(component.getByText("Button")).toBeInTheDocument();

    expect(component.asFragment()).toMatchSnapshot();
  });
});
