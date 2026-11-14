import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const revealSelector = '[data-reveal], [data-reveal-group]';

export default function ScrollReveal() {
  const { pathname } = useLocation();

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.documentElement.classList.add('reveal-ready');

    if (!('IntersectionObserver' in window) || reduceMotion) {
      targets.forEach((target) => target.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting);
        });
      },
      {
        rootMargin: '0px 0px -6% 0px',
        threshold: 0
      }
    );

    const observeTarget = (target: HTMLElement) => {
      observer.observe(target);
    };

    targets.forEach(observeTarget);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          if (!(mutation.target instanceof HTMLElement)) return;
          if (mutation.target.matches(revealSelector)) {
            observeTarget(mutation.target);
          }
          return;
        }

        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          if (node.matches(revealSelector)) observeTarget(node as HTMLElement);
          node.querySelectorAll<HTMLElement>(revealSelector).forEach(observeTarget);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-reveal', 'data-reveal-group']
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
