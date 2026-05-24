import React from 'react';
import {cn} from '../../lib/utils';

export function Card({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('shad-card', className)} {...props} />;
}

export function CardHeader({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('shad-card__header', className)} {...props} />;
}

export function CardTitle({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('shad-card__title', className)} {...props} />;
}

export function CardContent({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('shad-card__content', className)} {...props} />;
}
