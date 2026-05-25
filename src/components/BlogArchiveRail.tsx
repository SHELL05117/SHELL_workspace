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
  return '未归档';
}

function getMonthDay(item: SidebarItem) {
  const parsed = item.date ? new Date(item.date) : undefined;
  if (!parsed || Number.isNaN(parsed.getTime())) {
    return '--';
  }
  return new Intl.DateTimeFormat('zh-CN', {
    month: '2-digit',
    day: '2-digit',
  }).format(parsed);
}

export default function BlogArchiveRail({items = []}: {items?: SidebarItem[]}) {
  const sortedItems = [...items].sort((a, b) => {
    const left = a.date ? new Date(a.date).getTime() : 0;
    const right = b.date ? new Date(b.date).getTime() : 0;
    return right - left;
  });

  const groups = sortedItems.reduce<Record<string, SidebarItem[]>>((acc, item) => {
    const year = getYear(item);
    acc[year] = acc[year] ?? [];
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(groups).sort((a, b) => Number(b) - Number(a));

  return (
    <aside className="blog-archive-rail" aria-label="文章归档">
      <div className="blog-archive-rail__title">
        <span>Archive</span>
        <strong>{sortedItems.length}</strong>
      </div>
      <div className="blog-archive-rail__timeline">
        {years.map((year) => (
          <section className="blog-archive-rail__year" key={year}>
            <h2>{year}</h2>
            <ol>
              {groups[year].map((item) => (
                <li key={item.permalink}>
                  <Link to={item.permalink}>
                    <time>{getMonthDay(item)}</time>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </aside>
  );
}
