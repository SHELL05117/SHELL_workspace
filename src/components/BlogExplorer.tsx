import React, {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {Search} from 'lucide-react';

export type BlogCardPost = {
  title: string;
  permalink: string;
  date: string;
  formattedDate: string;
  description: string;
  readingTime?: number;
  authors: string[];
  tags: string[];
};

function authorLine(post: BlogCardPost) {
  return post.authors.length > 0 ? post.authors.join(' / ') : 'SHELL';
}

function readingLength(post: BlogCardPost) {
  if (!post.readingTime) {
    return '阅读长度待估算';
  }
  return `约 ${Math.max(1, Math.round(post.readingTime))} 分钟`;
}

export default function BlogExplorer({posts}: {posts: BlogCardPost[]}) {
  const pagefindUrl = useBaseUrl('/pagefind/pagefind.js');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('全部');
  const [pagefindMatches, setPagefindMatches] = useState<string[] | null>(null);
  const allTags = useMemo(() => ['全部', ...Array.from(new Set(posts.flatMap((post) => post.tags))).sort()], [posts]);

  async function runSearch(nextQuery: string) {
    setQuery(nextQuery);
    if (!nextQuery.trim()) {
      setPagefindMatches(null);
      return;
    }

    try {
      const loadPagefind = new Function('url', 'return import(url)') as (url: string) => Promise<{
        search: (query: string) => Promise<{results: Array<{data: () => Promise<{url: string}>}>}>;
      }>;
      const pagefind = await loadPagefind(pagefindUrl);
      const search = await pagefind.search(nextQuery);
      const urls = await Promise.all(
        search.results.slice(0, 30).map(async (result: {data: () => Promise<{url: string}>}) => {
          const data = await result.data();
          return data.url;
        }),
      );
      setPagefindMatches(urls);
    } catch {
      setPagefindMatches(null);
    }
  }

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return posts.filter((post) => {
      const tagMatch = activeTag === '全部' || post.tags.includes(activeTag);
      const fallbackSearchMatch =
        !normalizedQuery ||
        [post.title, post.description, ...post.tags, authorLine(post)]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      const pagefindMatch =
        !pagefindMatches ||
        pagefindMatches.some((url) => url.endsWith(post.permalink) || post.permalink.endsWith(url));
      return tagMatch && fallbackSearchMatch && pagefindMatch;
    });
  }, [activeTag, pagefindMatches, posts, query]);

  return (
    <section className="blog-explorer" aria-label="博客文章浏览">
      <div className="blog-explorer__tools">
        <label className="blog-search">
          <Search aria-hidden="true" size={18} />
          <input
            value={query}
            onChange={(event) => void runSearch(event.target.value)}
            placeholder="搜索标题、标签或摘要"
            type="search"
          />
        </label>
        <div className="blog-tag-filter" aria-label="标签筛选">
          {allTags.map((tag) => (
            <button
              className={tag === activeTag ? 'is-active' : undefined}
              key={tag}
              onClick={() => setActiveTag(tag)}
              type="button">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="blog-card-list">
        {filteredPosts.map((post) => (
          <article className="blog-browser-card" key={post.permalink}>
            <div>
              <p className="blog-browser-card__meta">
                {post.formattedDate} · {authorLine(post)} · {readingLength(post)}
              </p>
              <h2>
                <Link to={post.permalink}>{post.title}</Link>
              </h2>
              <p className="blog-browser-card__subtitle">{post.description}</p>
              <div className="blog-browser-card__tags">
                {post.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <Link className="blog-browser-card__read" to={post.permalink}>
              阅读
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && <p className="blog-empty-state">没有找到匹配的文章。</p>}
    </section>
  );
}
