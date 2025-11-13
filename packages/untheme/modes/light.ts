import type reference from "../reference";

type RefToken = keyof typeof reference;

export default {
  // Surface tokens
  "sys-surface": "ref-slate-3",
  "sys-surface-dim": "ref-slate-4",
  "sys-surface-bright": "ref-slate-2",
  "sys-surface-container": "ref-slate-5",
  "sys-surface-container-low": "ref-slate-4",
  "sys-surface-container-high": "ref-slate-6",
  "sys-surface-variant": "ref-slate-5",

  // Content tokens
  "sys-on-surface": "ref-slate-12",
  "sys-on-surface-variant": "ref-slate-11",
  "sys-outline": "ref-slate-7",
  "sys-outline-variant": "ref-slate-6",

  // Primary
  "sys-primary": "ref-blue-9",
  "sys-primary-hover": "ref-blue-10",
  "sys-primary-active": "ref-blue-11",
  "sys-primary-container": "ref-blue-3",
  "sys-on-primary": "ref-blue-4",
  "sys-on-primary-container": "ref-blue-12",

  // Secondary
  "sys-secondary": "ref-violet-9",
  "sys-secondary-hover": "ref-violet-10",
  "sys-secondary-active": "ref-violet-11",
  "sys-secondary-container": "ref-violet-3",
  "sys-on-secondary": "ref-slate-1",
  "sys-on-secondary-container": "ref-violet-12",

  // Success
  "sys-success": "ref-green-9",
  "sys-success-hover": "ref-green-10",
  "sys-success-active": "ref-green-11",
  "sys-success-container": "ref-green-3",
  "sys-on-success": "ref-slate-1",
  "sys-on-success-container": "ref-green-12",

  // Warning
  "sys-warning": "ref-amber-9",
  "sys-warning-hover": "ref-amber-10",
  "sys-warning-active": "ref-amber-11",
  "sys-warning-container": "ref-amber-3",
  "sys-on-warning": "ref-slate-12",
  "sys-on-warning-container": "ref-amber-12",

  // Error
  "sys-error": "ref-red-9",
  "sys-error-hover": "ref-red-10",
  "sys-error-active": "ref-red-11",
  "sys-error-container": "ref-red-3",
  "sys-on-error": "ref-slate-1",
  "sys-on-error-container": "ref-red-12",

  // Info
  "sys-info": "ref-cyan-9",
  "sys-info-hover": "ref-cyan-10",
  "sys-info-active": "ref-cyan-11",
  "sys-info-container": "ref-cyan-3",
  "sys-on-info": "ref-slate-1",
  "sys-on-info-container": "ref-cyan-12",

  // Interactive states
  "sys-hover": "ref-slate-4",
  "sys-pressed": "ref-slate-5",
  "sys-active": "ref-slate-5",
  "sys-active-highlight": "ref-slate-4",
  "sys-focus": "ref-blue-8",
  "sys-disabled": "ref-slate-6",
  "sys-on-disabled": "ref-slate-9",

  // Special
  "sys-scrim": "ref-slate-12",
  "sys-shadow": "ref-slate-12",

  // Shiki syntax highlighting
  "shiki-text": "ref-slate-12",
  "shiki-comment": "ref-green-11",
  "shiki-keyword": "ref-blue-11",
  "shiki-number": "ref-green-10",
  "shiki-string": "ref-orange-11",
  "shiki-function": "ref-amber-11",
  "shiki-type": "ref-teal-11",
  "shiki-parameter": "ref-sky-11",
  "shiki-variable": "ref-blue-9",
  "shiki-error": "ref-red-11",
  "shiki-regex": "ref-tomato-11",
  "shiki-regex-constant": "ref-violet-9",
  "shiki-tag": "ref-gold-11",
  "shiki-punctuation": "ref-slate-9",
  "shiki-operator": "ref-pink-11",
  "shiki-label": "ref-slate-11",
  "shiki-header": "ref-indigo-6",
  "shiki-list-marker": "ref-blue-10",
} satisfies Record<string, RefToken>;
