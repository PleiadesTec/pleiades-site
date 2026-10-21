import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

interface Link {
  label: string;
  href: string;
  isCurrent: boolean;
  isActive: boolean;
}

export default function MobileMenu({ links }: { links: Link[] }) {
  const [enhanced, setEnhanced] = useState(false);
  // Reflect native interaction before hydration instead of resetting the DOM to SSR state.
  const [open, setOpen] = useState(() => typeof document !== 'undefined' && (document.querySelector<HTMLDetailsElement>('.mobile-menu-fallback')?.open ?? false));
  const fallback = useRef<HTMLDetailsElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const handoff = useRef<{ href?: string; summary: boolean; outside: boolean } | null>(null);
  const desktopTransfer = useRef(false);

  useEffect(() => {
    const details = fallback.current;
    const active = document.activeElement;
    handoff.current = {
      href: active instanceof HTMLAnchorElement && details?.contains(active) ? active.getAttribute('href') ?? undefined : undefined,
      summary: active?.tagName === 'SUMMARY' && !!details?.contains(active),
      outside: !active || !details?.contains(active),
    };
    setOpen(details?.open ?? false);
    setEnhanced(true);
  }, []);

  useEffect(() => {
    if (!enhanced) return;
    if (!open && handoff.current?.summary) {
      trigger.current?.focus();
      handoff.current = null;
    }
    const desktop = window.matchMedia('(width >= 48rem)');
    const onChange = () => {
      if (!desktop.matches) return;
      const active = document.activeElement;
      const shouldMove = active === trigger.current || !!content.current?.contains(active);
      desktopTransfer.current = shouldMove;
      setOpen(false);
      if (shouldMove) {
        requestAnimationFrame(() => {
          const nav = document.querySelector('[data-desktop-navigation]');
          (nav?.querySelector<HTMLAnchorElement>('a[data-active="true"]') ?? nav?.querySelector<HTMLAnchorElement>('a'))?.focus();
        });
      }
    };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, [enhanced, open]);

  const navigation = (
    <nav aria-label="手机导航" className="min-h-0 flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-2">
        {links.map(link => (
          <li key={link.href}>
            <a href={link.href} aria-current={link.isCurrent ? 'page' : undefined} data-active={link.isActive} className="navigation-link flex min-h-12 items-center py-2" onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  if (!enhanced) {
    return (
      <details ref={fallback} open={open} className="mobile-menu-fallback">
        <summary className="flex size-11 cursor-pointer list-none items-center justify-center rounded-lg text-sm hover:bg-accent">菜单</summary>
        <div className="mobile-menu-panel">{navigation}</div>
      </details>
    );
  }

  return (
    <Sheet open={open} onOpenChange={value => { handoff.current = null; desktopTransfer.current = false; setOpen(value); }}>
      <SheetTrigger asChild>
        <Button ref={trigger} variant="ghost" size="icon" aria-label="打开导航菜单"><Menu className="size-5" aria-hidden="true" /></Button>
      </SheetTrigger>
      <SheetContent ref={content} className="mobile-navigation-sheet" onOpenAutoFocus={event => {
        const previous = handoff.current;
        handoff.current = null;
        if (previous?.outside) event.preventDefault();
        if (previous?.href) {
          const link = Array.from(content.current?.querySelectorAll('a') ?? []).find(item => item.getAttribute('href') === previous.href);
          if (link) { event.preventDefault(); link.focus(); }
        }
      }} onCloseAutoFocus={event => {
        if (desktopTransfer.current) { event.preventDefault(); desktopTransfer.current = false; }
      }}>
        <SheetHeader className="shrink-0 p-0 pr-14">
          <SheetTitle className="text-2xl">导航</SheetTitle>
          <SheetDescription>选择页面前往查看。</SheetDescription>
        </SheetHeader>
        {navigation}
      </SheetContent>
    </Sheet>
  );
}
