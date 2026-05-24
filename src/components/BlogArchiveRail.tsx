import React from 'react';
import Link from '@docusaurus/Link';

type SidebarItem = {
  title: string;
  permalink: string;
  date?: string;
};

function getYear(item: SidebarItem) {
  const parsed = item.date ? new Date(item.date) : undefined;
  if (parsed && !Number.isNaN(parsed.getTime())) {
    return String(parsed.getFullYear());
  }
  return '2026';
}

export default function BlogArchiveRail({items = []}: {items?: SidebarItem[]}) {
  const groups = items.reduce<Record<string, SidebarItem[]>>((acc, item) => {
    const year = getYear(item);
    acc[year] = acc[year] ?? [];
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(groups).sort((a, b) => Number(b) - Number(a));

  return (
    <aside className="blog-archive-rail" aria-label="全部文章">
      <div className="blog-archive-rail__title">全部文章</div>
      {years.map((year) => (
        <section className="blog-archive-rail__year" key={year}>
          <h2>{year}</h2>
          <ol>
            {groups[year].map((item) => (
              <li key={item.permalink}>
                <Link to={item.permalink}>{item.title}</Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </aside>
  );
}
