import { render } from "@testing-library/react";

import { Layout } from "./Layout";

describe("Layout", () => {
  it("renders", () => {
    const component = render(<Layout>Layout</Layout>);

    expect(component.getByText("Layout")).toBeInTheDocument();

    expect(component.asFragment()).toMatchSnapshot();
  });
});
