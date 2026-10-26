import Token from 'markdown-it/lib/token.mjs';

export function obsidianCallouts(md) {
  md.core.ruler.after('block', 'book-callouts', state => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      const open = tokens[i];
      if (open.type !== 'blockquote_open' || tokens[i + 1]?.type !== 'paragraph_open' || tokens[i + 2]?.type !== 'inline') continue;
      const marker = tokens[i + 2];
      const match = marker.content.match(/^\[!([a-z]+)\]([+-])?(?:[ \t]+([^\n]*))?(?:\n([\s\S]*))?$/i);
      if (!match) continue;
      const type = match[1].toLowerCase();
      let depth = 1, end = i + 1;
      for (; end < tokens.length; end++) {
        if (tokens[end].type === 'blockquote_open') depth++;
        if (tokens[end].type === 'blockquote_close' && --depth === 0) break;
      }
      if (end >= tokens.length) continue;
      open.tag = 'aside';
      open.attrSet('class', `book-callout book-callout-${type}`);
      open.attrSet('data-callout', type);
      open.attrSet('role', 'note');
      tokens[end].tag = 'aside';
      const replacement = [];
      if (match[3]) {
        const start = new Token('paragraph_open', 'p', 1); start.attrSet('class', 'book-callout-title'); start.block = true;
        const title = new Token('inline', '', 0); title.content = match[3]; title.children = []; md.inline.parse(title.content, md, state.env, title.children);
        const close = new Token('paragraph_close', 'p', -1); close.block = true;
        replacement.push(start, title, close);
      }
      if (match[4]) {
        marker.content = match[4]; marker.children = []; md.inline.parse(marker.content, md, state.env, marker.children);
        replacement.push(tokens[i + 1], marker, tokens[i + 3]);
      }
      tokens.splice(i + 1, 3, ...replacement);
    }
  });
}
