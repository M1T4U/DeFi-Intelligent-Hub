
import * as React from 'react';
import { ChildrenProps } from '../../types';

interface CardProps extends ChildrenProps {
  title?: string;
  className?: string;
  titleClassName?: string;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
  const { children, title, className = '', titleClassName = '' } = props;
  return (
    <div className={`bg-secondary-light dark:bg-secondary-dark shadow-lg rounded-xl p-4 sm:p-6 ${className}`}>
      {title && (
        <h2 className={`text-xl font-semibold mb-4 text-text-light dark:text-text-dark ${titleClassName}`}>
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};

export default Card;
