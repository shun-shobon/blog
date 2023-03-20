import { exec as execNonPromise } from "node:child_process";
import { promisify } from "node:util";

import { Temporal } from "@js-temporal/polyfill";

export const exec = promisify(execNonPromise);

export type ArticleDate = {
  createdAt: string;
  updatedAt?: string | undefined;
};

export async function readArticleChangedDate(
  repoPath: string,
  file: string,
): Promise<ArticleDate> {
  const dates = await readFileModifiedDates(repoPath, file);

  const createdAt = dates.at(-1)?.toZonedDateTimeISO("Asia/Tokyo").toString();
  const updatedAt = dates.at(0)?.toZonedDateTimeISO("Asia/Tokyo").toString();

  if (!createdAt || !updatedAt) {
    throw new Error("Expected dates to be non-empty");
  }

  if (createdAt === updatedAt) {
    return { createdAt };
  } else {
    return { createdAt, updatedAt };
  }
}

async function readFileModifiedDates(
  repoPath: string,
  file: string,
): Promise<Temporal.Instant[]> {
  const command = `git log --date=unix --format=%ad -- ${file}`;
  const { stdout, stderr } = await exec(command, {
    cwd: repoPath,
  });

  if (stderr) throw new Error(stderr);

  return stdout
    .trim()
    .split("\n")
    .map((line) => Number(line))
    .map((unixTime) => Temporal.Instant.fromEpochSeconds(unixTime));
}
