'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import CommandPalette, { type CommandItem } from './CommandPalette';

interface CompactNavLink {
  label: string;
  href: string;
}

interface CompactSkillLoadout {
  label: string;
  codename: string;
}

interface CommandCenterProps {
  navLinks: CompactNavLink[];
  skillLoadouts: CompactSkillLoadout[];
  github: string;
  linkedin: string;
  email: string;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tagName = target.tagName.toLowerCase();
  return tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target.isContentEditable || Boolean(target.closest('[contenteditable]'));
}

function focusHashTarget(href: string) {
  const id = href.startsWith('#') ? href.slice(1) : href;
  const target = document.getElementById(id);
  if (!target) return;

  // The document owns the scroll policy, so command jumps do not stack a
  // second scripted easing curve on top of anchor navigation.
  target.scrollIntoView({ behavior: 'auto', block: 'start' });
  window.requestAnimationFrame(() => target.focus({ preventScroll: true }));
}

function uniqueKeywords(keywords: string[]) {
  return Array.from(new Set(keywords.map((keyword) => keyword.trim().toLowerCase()).filter(Boolean)));
}

export default function CommandCenter({ navLinks, skillLoadouts, github, linkedin, email }: CommandCenterProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [anomalyActive, setAnomalyActive] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const suppressNextRestoreRef = useRef(false);

  const commands = useMemo<CommandItem[]>(() => {
    const navigationCommands: CommandItem[] = navLinks.map((link) => ({
      id: `nav-${link.href}`,
      label: `Jump to ${link.label}`,
      eyebrow: 'NAVIGATE',
      detail: `Move focus to ${link.label}.`,
      keywords: uniqueKeywords([link.label, link.href.replace('#', '')]),
      action: { type: 'hash', href: link.href },
    }));

    const skillCommands: CommandItem[] = skillLoadouts.map((loadout) => ({
      id: `inspect-${loadout.codename}`,
      label: `Inspect ${loadout.label}`,
      eyebrow: 'SKILL EVIDENCE',
      detail: `Jump to stats loadout: ${loadout.codename}.`,
      keywords: uniqueKeywords([loadout.label, loadout.codename, 'stats', 'loadout']),
      action: { type: 'hash', href: '#stats' },
    }));

    return [
      ...navigationCommands,
      ...skillCommands,
      {
        id: 'github',
        label: 'Open GitHub',
        eyebrow: 'EXTERNAL TRACE',
        detail: 'Review repositories and build history.',
        keywords: ['github', 'code', 'repos'],
        action: { type: 'external', href: github },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        eyebrow: 'EXTERNAL TRACE',
        detail: 'Open professional profile.',
        keywords: ['linkedin', 'profile'],
        action: { type: 'external', href: linkedin },
      },
      {
        id: 'email',
        label: 'Direct Email',
        eyebrow: 'CONTACT',
        detail: email,
        keywords: ['email', 'contact', 'hire'],
        action: { type: 'mailto', href: `mailto:${email}` },
      },
      {
        id: 'toggle-anomaly',
        label: anomalyActive ? 'Disable Anomaly Layer' : 'Enable Anomaly Layer',
        eyebrow: 'ANOMALY',
        detail: 'Toggle decorative oddity annotations. No persistence.',
        keywords: ['anomaly', 'secret', 'oddity'],
        action: { type: 'toggle-anomaly' },
      },
    ];
  }, [anomalyActive, email, github, linkedin, navLinks, skillLoadouts]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-anomaly-active', anomalyActive);
    return () => document.documentElement.classList.remove('is-anomaly-active');
  }, [anomalyActive]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) || isTypingTarget(event.target)) {
        return;
      }

      event.preventDefault();
      if (paletteOpen) {
        return;
      }

      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current;
      setPaletteOpen(true);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paletteOpen]);

  const closePalette = () => {
    setPaletteOpen(false);
    window.requestAnimationFrame(() => {
      if (suppressNextRestoreRef.current) {
        suppressNextRestoreRef.current = false;
        return;
      }

      openerRef.current?.focus?.();
    });
  };

  const runCommand = (command: CommandItem) => {
    suppressNextRestoreRef.current = true;
    setPaletteOpen(false);

    window.requestAnimationFrame(() => {
      if (command.action.type === 'hash') {
        focusHashTarget(command.action.href);
        return;
      }

      if (command.action.type === 'external') {
        window.open(command.action.href, '_blank', 'noopener,noreferrer');
        openerRef.current?.focus?.();
        return;
      }

      if (command.action.type === 'mailto') {
        window.location.href = command.action.href;
        openerRef.current?.focus?.();
        return;
      }

      setAnomalyActive((value) => !value);
      openerRef.current?.focus?.();
    });
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="command-trigger"
        onClick={() => {
          openerRef.current = triggerRef.current;
          setPaletteOpen(true);
        }}
      >
        <span>COMMAND</span>
        <strong>Ctrl/Cmd K</strong>
      </button>
      {anomalyActive ? <div className="anomaly-overlay" aria-hidden /> : null}
      <CommandPalette
        open={paletteOpen}
        commands={commands}
        anomalyActive={anomalyActive}
        onClose={closePalette}
        onRunCommand={runCommand}
      />
    </>
  );
}
