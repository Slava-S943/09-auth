import Link from 'next/link';
import css from './SidebarNotes.module.css';

export default function DefaultsSidebar() {
  return (
    <nav>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/all">
            All notes
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/Todo">
            Todo
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/Work">
            Work
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/Personal">
            Personal
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/Meeting">
            Meeting
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link className={css.menuLink} href="/notes/filter/Shopping">
            Shopping
          </Link>
        </li>
      </ul>
    </nav>
  );
}
