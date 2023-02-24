import type { ArticleSummary } from "@/lib/lib";

type Props = {
  summary: ArticleSummary;
};

export function ArticleMatter({ summary }: Props): JSX.Element {
  return (
    <dl className="grid gap-2">
      <dt className="sr-only">投稿日</dt>
      <dd>
        <time dateTime={summary.postedAt.toString()}>
          {summary.postedAt.toString()}
        </time>
      </dd>
      {summary.tags.length > 0 && (
        <>
          <dt className="sr-only">タグ</dt>
          <dd>
            <ul className="flex flex-wrap gap-2">
              {summary.tags.map((tag, idx) => (
                <li
                  key={idx}
                  className="rounded-md rounded-br-none border border-purple-700 px-2 py-1 text-slate-800 before:content-['#'] dark:border-purple-300 dark:text-slate-200"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </dd>
        </>
      )}
    </dl>
  );
}
