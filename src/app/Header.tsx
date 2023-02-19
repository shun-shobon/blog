import { Link } from "@/components/Link";

export function Header(): JSX.Element {
  return (
    <header className="border-b border-purple-700 px-6 py-4 dark:border-purple-300">
      <ul className="flex items-center gap-4 text-lg font-bold">
        <li className="mr-auto font-serif text-2xl text-slate-900 dark:text-slate-100">
          星朧の夜
        </li>
        <li>
          <Link href="/">HOME</Link>
        </li>
      </ul>
    </header>
  );
}
