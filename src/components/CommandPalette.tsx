'use client';

import { useEffect, useRef } from 'react';

export type CommandAction =
  | { type: 'hash'; href: string }
  | { type: 'external'; href: string }
  | { type: 'mailto'; href: string }
  | { type: 'toggle-anomaly' };

export interface CommandItem {
  id: string;
  label: string;
  eyebrow: string;
  detail: string;
  keywords?: string[];
  action: CommandAction;
}

interface CommandPaletteProps {
  open: boolean;
  commands: CommandItem[];
  anomalyActive: boolean;
  onClose: () => void;
  onRunCommand: (command: CommandItem) => void;
}

export default function CommandPalette({ open, commands, anomalyActive, onClose, onRunCommand }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const firstCommandRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
      window.requestAnimationFrame(() => firstCommandRef.current?.focus());
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="command-palette"
      aria-labelledby="command-palette-title"
      aria-describedby="command-palette-desc"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <div className="command-palette__shell">
        <div className="command-palette__header">
          <div>
            <p className="command-palette__kicker">SYSTEM COMMAND / ODDITY OS</p>
            <h2 id="command-palette-title">Command Center</h2>
            <p id="command-palette-desc">Jump, inspect evidence, contact, or toggle the anomaly layer.</p>
          </div>
          <button type="button" className="command-palette__close" onClick={onClose} aria-label="Close command center">
            ×
          </button>
        </div>

        <div className="command-palette__status" aria-hidden>
          <span>Shortcut: Ctrl/Cmd + K</span>
          <span>{anomalyActive ? 'ANOMALY: ON' : 'ANOMALY: OFF'}</span>
        </div>

        <div className="command-palette__list" role="list">
          {commands.map((command, index) => (
            <button
              key={command.id}
              ref={index === 0 ? firstCommandRef : undefined}
              type="button"
              className="command-palette__item"
              onClick={() => onRunCommand(command)}
            >
              <span className="command-palette__eyebrow">{command.eyebrow}</span>
              <strong>{command.label}</strong>
              <span className="command-palette__detail">{command.detail}</span>
              {command.keywords?.length ? (
                <span className="command-palette__keywords" aria-label={`Keywords: ${command.keywords.join(', ')}`}>
                  {command.keywords.map((keyword, keywordIndex) => (
                    <em key={`${command.id}-${keyword}-${keywordIndex}`}>{keyword}</em>
                  ))}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}
