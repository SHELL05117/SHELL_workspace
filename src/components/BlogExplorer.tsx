import React, {useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {ArrowUpRight, Search} from 'lucide-react';

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

const ALL_TAGS = '全部';

function authorLine(post: BlogCardPost) {
  return post.authors.length > 0 ? post.authors.join(' / ') : 'SHELL';
}

function readingLength(post: BlogCardPost) {
  if (!post.readingTime) {
    return '阅读时长待估';
  }
  return `约 ${Math.max(1, Math.round(post.readingTime))} 分钟`;
}

function postDate(post: BlogCardPost) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(post.date));
}

export default function BlogExplorer({posts}: {posts: BlogCardPost[]}) {
  const pagefindUrl = useBaseUrl('/pagefind/pagefind.js');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState(ALL_TAGS);
  const [pagefindMatches, setPagefindMatches] = useState<string[] | null>(null);
  const allTags = useMemo(() => [ALL_TAGS, ...Array.from(new Set(posts.flatMap((post) => post.tags))).sort()], [posts]);

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
      const tagMatch = activeTag === ALL_TAGS || post.tags.includes(activeTag);
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
          <Search aria-hidden="true" size={17} />
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

      <div className="blog-result-meta">
        <span>{filteredPosts.length} 篇文章</span>
        <span>{activeTag === ALL_TAGS ? '全部主题' : activeTag}</span>
      </div>

      <div className="blog-card-list">
        {filteredPosts.map((post) => (
          <article className="blog-browser-card" key={post.permalink}>
            <Link className="blog-browser-card__link clean-link" to={post.permalink}>
              <div className="blog-browser-card__date">
                <span>{postDate(post)}</span>
                <small>{readingLength(post)}</small>
              </div>
              <div className="blog-browser-card__body">
                <p className="blog-browser-card__meta">{authorLine(post)}</p>
                <h2>{post.title}</h2>
                <p className="blog-browser-card__subtitle">{post.description}</p>
                <div className="blog-browser-card__tags">
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="blog-browser-card__read">
                阅读
                <ArrowUpRight aria-hidden="true" size={16} />
              </span>
            </Link>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && <p className="blog-empty-state">没有找到匹配的文章。</p>}
    </section>
  );
}
