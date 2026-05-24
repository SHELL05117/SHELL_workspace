import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {HtmlClassNameProvider, PageMetadata, ThemeClassNames} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import SearchMetadata from '@theme/SearchMetadata';
import type {Props} from '@theme/BlogListPage';
import BlogExplorer, {type BlogCardPost} from '../../components/BlogExplorer';

function BlogListPageMetadata(props: Props): ReactNode {
  const {metadata} = props;
  const {
    siteConfig: {title: siteTitle},
  } = useDocusaurusContext();
  const {blogDescription, blogTitle, permalink} = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function getPost(item: Props['items'][number]): BlogCardPost {
  const metadata = item.content.metadata;
  return {
    title: metadata.title,
    permalink: metadata.permalink,
    date: metadata.date,
    formattedDate: new Date(metadata.date).toLocaleDateString('zh-CN'),
    description: metadata.description,
    readingTime: metadata.readingTime,
    authors: metadata.authors?.map((author) => author.name).filter(Boolean) ?? [],
    tags: metadata.tags?.map((tag) => tag.label).filter(Boolean) ?? [],
  };
}

function BlogListPageContent(props: Props): ReactNode {
  const {metadata, items, sidebar} = props;
  const posts = items.map(getPost).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <BlogLayout sidebar={sidebar}>
      <header className="blog-index-header">
        <p className="stage-kicker">Blog Archive</p>
        <h1>Blog</h1>
        <p>技术文章、项目复盘、开发日志和长期维护记录。</p>
      </header>
      <BlogExplorer posts={posts} />
      <BlogListPaginator metadata={metadata} />
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider className={clsx(ThemeClassNames.wrapper.blogPages, ThemeClassNames.page.blogListPage)}>
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
