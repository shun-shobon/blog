import * as path from "node:path";

import type { Alternative, Image, Parent, Resource } from "mdast";
import sharp from "sharp";
import type { Node } from "unist";

import { UnreachableError } from "../utils";
import { isImage, isParent } from "./utils";
import { visit, Visitor } from "./visit";

export interface LocalImage extends Node, Resource, Alternative {
  type: "localImage";
  width: number;
  height: number;
  aspectRatio: `${number} / ${number}`;
}

export async function mdastLocalImage(tree: Parent, basePath: string) {
  const promises: Promise<void>[] = [];

  const visitor = visitorBuilder(basePath, promises);
  visit(tree, isLocalImage, visitor);

  await Promise.all(promises);
}

function isLocalImage(node: Node): node is Image {
  if (!isImage(node)) return false;

  if (node.url.startsWith("/")) return false;

  try {
    new URL(node.url);
    return false;
  } catch {
    return true;
  }
}

function visitorBuilder(
  basePath: string,
  promises: Promise<void>[],
): Visitor<Image> {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    const imagePath = path.join(basePath, node.url);
    const promise = (async () => {
      const result = await getImageSize(imagePath);
      if (!result) return;
      const { width, height } = result;

      const localImage: LocalImage = {
        type: "localImage",
        url: node.url,
        title: node.title,
        alt: node.alt,
        width,
        height,
        aspectRatio: `${width} / ${height}`,
      };

      parent.children[idx] = localImage;
    })();

    promises.push(promise);
  };
}

type ImageSizeResult = { width: number; height: number } | undefined;

async function getImageSize(imagePath: string): Promise<ImageSizeResult> {
  const image = sharp(imagePath);

  const result = await image.metadata().catch(() => undefined);
  if (!result) return undefined;

  const { width, height } = result;
  if (!width || !height) return undefined;

  return { width, height };
}
