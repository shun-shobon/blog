import * as fs from "node:fs/promises";
import * as path from "node:path";

import type { Alternative, Image, Parent, Resource } from "mdast";
import sharp from "sharp";
import type { Node } from "unist";

import { UnreachableError } from "../../utils";
import { isImage, isParent } from "../utils";
import { visit, Visitor } from "../visit";
import type { ArticlePath } from ".";

const ARTICLE_PATH = "/articles";

export interface LocalImage extends Node, Resource, Alternative {
  type: "localImage";
  width: number;
  height: number;
  aspectRatio: `${number} / ${number}`;
}

export async function mdastLocalImage(
  tree: Parent,
  articlePath: ArticlePath,
): Promise<void> {
  const promises: Array<Promise<void>> = [];

  const visitor = visitorBuilder(articlePath, promises);
  visit(tree, isLocalImage, visitor);

  await Promise.all(promises);
}

function isLocalImage(node: Node): node is Image {
  if (!isImage(node)) return false;

  try {
    new URL(node.url);
    return false;
  } catch {
    return true;
  }
}

function resolveRelativeUrl(url: string, slug: string): string {
  const normarlizedUrl = url.replace(/^\.\//u, "");

  return `${ARTICLE_PATH}/${slug}/${normarlizedUrl}`;
}

function visitorBuilder(
  articlePath: ArticlePath,
  promises: Array<Promise<void>>,
): Visitor<Image> {
  return (node, idx, parent) => {
    if (!isParent(parent) || idx === null) throw new UnreachableError();

    const promise = (async () => {
      const imagePath = path.join(
        articlePath.fromDir,
        articlePath.slug,
        node.url,
      );
      const result = await getImageSize(imagePath);
      if (!result) return;
      const { width, height } = result;

      const localImage: LocalImage = {
        type: "localImage",
        url: resolveRelativeUrl(node.url, articlePath.slug),
        title: node.title,
        alt: node.alt,
        width,
        height,
        aspectRatio: `${width} / ${height}`,
      };

      parent.children[idx] = localImage;
      await copyLocalImage(articlePath, node.url);
    })();

    promises.push(promise);
  };
}

type ImageSizeResult = { width: number; height: number } | undefined;

async function getImageSize(imagePath: string): Promise<ImageSizeResult> {
  const image = sharp(imagePath);

  const result = await image.metadata().catch(() => {
    /* noop */
  });
  if (!result) return undefined;

  const { width, height } = result;
  if (width == null || height == null) return undefined;

  return { width, height };
}

async function copyLocalImage(
  articlePath: ArticlePath,
  url: string,
): Promise<void> {
  const from = path.join(articlePath.fromDir, articlePath.slug, url);
  const to = path.join(articlePath.toDir, articlePath.slug, url);

  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}
