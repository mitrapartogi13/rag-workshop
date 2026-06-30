/**
 * Minimal, dependency-free syntax highlighter.
 *
 * We deliberately avoid pulling in a full highlighting engine (Shiki/Prism)
 * to keep the bundle lean and the output predictable. The tokenizer covers
 * the two languages this workshop actually uses, namely Python and shell, and
 * falls back to plain (escaped) text for anything else.
 *
 * Each token is wrapped in a `.tok-*` span; the colors live in globals.css.
 */

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const PYTHON_KEYWORDS = [
  "def", "class", "return", "import", "from", "as", "if", "elif", "else",
  "for", "while", "in", "is", "not", "and", "or", "with", "try", "except",
  "finally", "raise", "lambda", "yield", "pass", "break", "continue",
  "global", "nonlocal", "del", "assert", "async", "await", "True", "False",
  "None", "self",
].join("|");

/**
 * Highlight Python. The single master regex is ordered so that "greedy"
 * constructs (comments, strings) win before identifiers, which prevents a
 * `#` inside a string from being treated as a comment and vice-versa.
 */
function highlightPython(code: string): string {
  const escaped = escapeHtml(code);
  const pattern = new RegExp(
    [
      "(&[a-z]+;)", // 1: already-escaped html entity, leave untouched
      "(#.*$)", // 2: comment
      "(\"\"\"[\\s\\S]*?\"\"\"|'''[\\s\\S]*?'''|\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*')", // 3: string
      "(\\b\\d+\\.?\\d*\\b)", // 4: number
      "(@[A-Za-z_][\\w.]*)", // 5: decorator
      `\\b(${PYTHON_KEYWORDS})\\b`, // 6: keyword
      "([A-Za-z_]\\w*)(?=\\s*\\()", // 7: function call
    ].join("|"),
    "gm"
  );

  return escaped.replace(
    pattern,
    (match, entity, comment, str, num, decorator, keyword, fn) => {
      if (entity) return entity;
      if (comment) return `<span class="tok-comment">${comment}</span>`;
      if (str) return `<span class="tok-string">${str}</span>`;
      if (num) return `<span class="tok-number">${num}</span>`;
      if (decorator) return `<span class="tok-decorator">${decorator}</span>`;
      if (keyword) return `<span class="tok-keyword">${keyword}</span>`;
      if (fn) return `<span class="tok-function">${fn}</span>`;
      return match;
    }
  );
}

/**
 * Highlight shell/bash. Lighter than Python: we color comments, strings,
 * variables and option flags, leaving bare commands in the default tone.
 */
function highlightBash(code: string): string {
  const escaped = escapeHtml(code);
  const pattern = new RegExp(
    [
      "(&[a-z]+;)", // 1: escaped entity
      "(#.*$)", // 2: comment
      "(\"(?:\\\\.|[^\"\\\\])*\"|'[^']*')", // 3: string
      "(\\$\\w+|\\$\\{[^}]+\\})", // 4: variable
      "(\\s-{1,2}[A-Za-z][\\w-]*)", // 5: flag
    ].join("|"),
    "gm"
  );

  return escaped.replace(
    pattern,
    (match, entity, comment, str, variable, flag) => {
      if (entity) return entity;
      if (comment) return `<span class="tok-comment">${comment}</span>`;
      if (str) return `<span class="tok-string">${str}</span>`;
      if (variable) return `<span class="tok-variable">${variable}</span>`;
      if (flag) return `<span class="tok-flag">${flag}</span>`;
      return match;
    }
  );
}

export type SupportedLang = "python" | "bash" | "shell" | "text";

export function highlight(code: string, lang: string): string {
  switch (lang) {
    case "python":
      return highlightPython(code);
    case "bash":
    case "shell":
      return highlightBash(code);
    default:
      return escapeHtml(code);
  }
}
