import React from 'react';
import {cn} from '../../lib/utils';

export function Separator({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('shad-separator', className)} role="separator" {...props} />;
}
