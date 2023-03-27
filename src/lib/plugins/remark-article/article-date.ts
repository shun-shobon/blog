import { exec as execNonPromise } from "node:child_process";
import { promisify } from "node:util";

import { Temporal } from "@js-temporal/polyfill";

export const exec = promisify(execNonPromise);

export interface ArticleDate {
  createdAt: string;
  updatedAt?: string | undefined;
}

export async function readArticleChangedDate(
  repoPath: string,
  file: string,
): Promise<ArticleDate> {
  const dates = await readFileModifiedDates(repoPath, file);

  const createdAt = dates.at(-1)?.toZonedDateTimeISO("Asia/Tokyo").toString();
  const updatedAt = dates.at(0)?.toZonedDateTimeISO("Asia/Tokyo").toString();

  if (createdAt == null || updatedAt == null) {
    throw new Error("Expected dates to be non-empty");
  }

  if (createdAt === updatedAt) {
    return { createdAt };
  }
  return { createdAt, updatedAt };
}

async function readFileModifiedDates(
  repoPath: string,
  file: string,
): Promise<Array<Temporal.Instant>> {
  const command = `git log --date=unix --format=%ad -- ${file}`;
  const { stdout, stderr } = await exec(command, {
    cwd: repoPath,
  });

  if (stderr) throw new Error(stderr);

  return stdout
    .trim()
    .split("\n")
    .map(Number)
    .map((unixTime) => Temporal.Instant.fromEpochSeconds(unixTime));
}
