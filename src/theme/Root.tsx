import React, {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import NotesMobileDirectory from '../components/NotesMobileDirectory';

const NAV_SECTIONS = [
  {key: 'home', path: '/'},
  {key: 'projects', path: '/projects'},
  {key: 'blog', path: '/blog'},
  {key: 'notes', path: '/notes'},
  {key: 'about', path: '/about'},
] as const;

function normalizePath(pathname: string): string {
  const withoutBase = pathname.replace(/^\/SHELL_workspace(?=\/|$)/, '') || '/';
  const withoutTrailingSlash = withoutBase.length > 1 ? withoutBase.replace(/\/$/, '') : withoutBase;
  return withoutTrailingSlash || '/';
}

function getSection(pathname: string): string | null {
  const normalized = normalizePath(pathname);
  if (normalized === '/') {
    return 'home';
  }
  return NAV_SECTIONS.find((section) => section.path !== '/' && normalized.startsWith(section.path))?.key ?? null;
}

export default function Root({children}: {children: React.ReactNode}): React.ReactNode {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    const activeSection = getSection(location.pathname);

    function updateNavigationState() {
      document.querySelectorAll<HTMLAnchorElement>('.navbar__link, .navbar-sidebar .menu__link').forEach((link) => {
        const linkSection = getSection(new URL(link.href, window.location.origin).pathname);
        const isActive = Boolean(activeSection && linkSection === activeSection);

        link.classList.toggle('navbar__link--active', isActive && link.classList.contains('navbar__link'));
        link.classList.toggle('menu__link--active', isActive && link.classList.contains('menu__link'));

        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else if (link.getAttribute('aria-current') === 'page') {
          link.removeAttribute('aria-current');
        }
      });
    }

    updateNavigationState();
    const timer = window.setTimeout(updateNavigationState, 0);
    const observer = new MutationObserver(updateNavigationState);
    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  useEffect(() => {
    const currentPath = location.pathname;
    const previous = previousPath.current;

    const isHome = currentPath === '/' || currentPath.endsWith('/SHELL_workspace/');

    if (previous && previous !== currentPath && !isHome) {
      document.body.setAttribute('data-route-transition', 'true');
      const timer = window.setTimeout(() => {
        document.body.removeAttribute('data-route-transition');
      }, 520);

      previousPath.current = currentPath;
      return () => window.clearTimeout(timer);
    }

    previousPath.current = currentPath;
    return undefined;
  }, [location.pathname]);

  return (
    <>
      <NotesMobileDirectory />
      {children}
    </>
  );
}
