import type { ReactNode } from 'react';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  lead: string;
  actions?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}

export default function PageIntro({
  eyebrow,
  title,
  lead,
  actions,
  aside,
  compact = false
}: PageIntroProps) {
  return (
    <section className={`page-intro ${compact ? 'page-intro--compact' : ''}`}>
      <div className="page-intro__copy" data-reveal="left">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro__lead">{lead}</p>
        {actions && <div className="page-intro__actions">{actions}</div>}
      </div>
      {aside && (
        <div className="page-intro__aside" data-reveal="right">
          {aside}
        </div>
      )}
    </section>
  );
}
