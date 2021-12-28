import { render } from "@testing-library/react";

import { Summary } from "./Summary";

describe("Summary", () => {
  it("renders", () => {
    const component = render(<Summary>Summary</Summary>);

    expect(component.getByText("Summary")).toBeInTheDocument();

    expect(component.asFragment()).toMatchSnapshot();
  });
});
