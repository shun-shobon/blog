import endent from "endent";
import { inspect } from "unist-util-inspect";
import { test } from "vitest";

import { parseMarkdown } from "./markdown";

test.only("parseMarkdown", () => {
  const markdown = endent`
    # 1. Heading 1

    This is 1. paragraph.

    ## 1.1. Heading 2

    This is 1.1. paragraph.

    ## 1.2. Heading 2

    This is 1.2. paragraph.

    ### 1.2.1. Heading 3

    This is 1.2.1. paragraph.

    ## 1.3. Heading 2

    This is 1.3. paragraph.

    # 2. Heading 1

    This is 2. paragraph.

    # 3. Heading 1

    This is 3. paragraph.
  `;

  const ast = parseMarkdown(markdown);
  console.log(inspect(ast));
});
