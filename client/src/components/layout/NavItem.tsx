function NavItem(props: { href: string; label: string }) {
  return (
    <div className="flex items-center px-4 py-2 text-sm font-medium">
      <a href={props.href ?? '#'} className="block hover:text-gray-600 dark:hover:text-gray-400">
        {props.label}
      </a>
    </div>
  );
}

export default NavItem;
