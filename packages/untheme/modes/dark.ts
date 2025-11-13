import type reference from "../reference";

type RefToken = keyof typeof reference;

export default {
  // Surface tokens
  "sys-surface": "ref-slate-dark-3",
  "sys-surface-dim": "ref-slate-dark-4",
  "sys-surface-bright": "ref-slate-dark-2",
  "sys-surface-container": "ref-slate-dark-5",
  "sys-surface-container-low": "ref-slate-dark-4",
  "sys-surface-container-high": "ref-slate-dark-6",
  "sys-surface-variant": "ref-slate-dark-5",

  // Content tokens
  "sys-on-surface": "ref-slate-dark-12",
  "sys-on-surface-variant": "ref-slate-dark-11",
  "sys-outline": "ref-slate-dark-7",
  "sys-outline-variant": "ref-slate-dark-6",

  // Primary
  "sys-primary": "ref-blue-dark-9",
  "sys-primary-hover": "ref-blue-dark-10",
  "sys-primary-active": "ref-blue-dark-11",
  "sys-primary-container": "ref-blue-dark-3",
  "sys-on-primary": "ref-blue-dark-4",
  "sys-on-primary-container": "ref-blue-dark-12",

  // Secondary
  "sys-secondary": "ref-violet-dark-9",
  "sys-secondary-hover": "ref-violet-dark-10",
  "sys-secondary-active": "ref-violet-dark-11",
  "sys-secondary-container": "ref-violet-dark-3",
  "sys-on-secondary": "ref-slate-dark-1",
  "sys-on-secondary-container": "ref-violet-dark-12",

  // Success
  "sys-success": "ref-green-dark-9",
  "sys-success-hover": "ref-green-dark-10",
  "sys-success-active": "ref-green-dark-11",
  "sys-success-container": "ref-green-dark-3",
  "sys-on-success": "ref-slate-dark-1",
  "sys-on-success-container": "ref-green-dark-12",

  // Warning
  "sys-warning": "ref-amber-dark-9",
  "sys-warning-hover": "ref-amber-dark-10",
  "sys-warning-active": "ref-amber-dark-11",
  "sys-warning-container": "ref-amber-dark-3",
  "sys-on-warning": "ref-slate-dark-12",
  "sys-on-warning-container": "ref-amber-dark-12",

  // Error
  "sys-error": "ref-red-dark-9",
  "sys-error-hover": "ref-red-dark-10",
  "sys-error-active": "ref-red-dark-11",
  "sys-error-container": "ref-red-dark-3",
  "sys-on-error": "ref-slate-dark-1",
  "sys-on-error-container": "ref-red-dark-12",

  // Info
  "sys-info": "ref-cyan-dark-9",
  "sys-info-hover": "ref-cyan-dark-10",
  "sys-info-active": "ref-cyan-dark-11",
  "sys-info-container": "ref-cyan-dark-3",
  "sys-on-info": "ref-slate-dark-1",
  "sys-on-info-container": "ref-cyan-dark-12",

  // Interactive states
  "sys-hover": "ref-slate-dark-4",
  "sys-pressed": "ref-slate-dark-5",
  "sys-active": "ref-slate-dark-5",
  "sys-active-highlight": "ref-slate-dark-4",
  "sys-focus": "ref-blue-dark-8",
  "sys-disabled": "ref-slate-dark-6",
  "sys-on-disabled": "ref-slate-dark-9",

  // Special
  "sys-scrim": "ref-slate-dark-12",
  "sys-shadow": "ref-slate-dark-12",

  // Shiki syntax highlighting
  "shiki-text": "ref-slate-dark-12",
  "shiki-comment": "ref-green-dark-11",
  "shiki-keyword": "ref-blue-dark-9",
  "shiki-number": "ref-green-dark-10",
  "shiki-string": "ref-orange-dark-11",
  "shiki-function": "ref-amber-dark-11",
  "shiki-type": "ref-teal-dark-11",
  "shiki-parameter": "ref-sky-dark-11",
  "shiki-variable": "ref-blue-dark-11",
  "shiki-error": "ref-red-dark-11",
  "shiki-regex": "ref-tomato-dark-11",
  "shiki-regex-constant": "ref-violet-dark-9",
  "shiki-tag": "ref-gold-dark-11",
  "shiki-punctuation": "ref-slate-dark-9",
  "shiki-operator": "ref-pink-dark-11",
  "shiki-label": "ref-slate-dark-11",
  "shiki-header": "ref-indigo-dark-6",
  "shiki-list-marker": "ref-blue-dark-10",
} satisfies Record<string, RefToken>;
