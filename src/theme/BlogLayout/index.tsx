import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogArchiveRail from '../../components/BlogArchiveRail';
import type {Props} from '@theme/BlogLayout';

export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className={clsx('blog-shell', {'blog-shell--with-toc': toc})}>
        {hasSidebar && <BlogArchiveRail items={sidebar.items as never} />}
        <main className="blog-reading-pane">{children}</main>
        {toc && (
          <aside className="blog-toc-rail" aria-label="当前文章大纲">
            <div className="blog-toc-rail__title">文章大纲</div>
            {toc}
          </aside>
        )}
      </div>
    </Layout>
  );
}
