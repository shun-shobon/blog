import type { Root } from "mdast";
import type { Plugin } from "unified";
import { removePosition } from "unist-util-remove-position";

export const remarkRemovePosition: Plugin<Array<never>, Root> = () => {
  return (tree) => {
    removePosition(tree, true);
  };
};
