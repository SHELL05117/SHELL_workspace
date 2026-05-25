import React, {useEffect, useRef} from 'react';
import {useLocation} from '@docusaurus/router';
import NotesMobileDirectory from '../components/NotesMobileDirectory';

export default function Root({children}: {children: React.ReactNode}): React.ReactNode {
  const location = useLocation();
  const previousPath = useRef<string | null>(null);

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
