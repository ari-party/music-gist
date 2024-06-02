import isFullwidthCodePoint from 'is-fullwidth-code-point';

export default function table(items: string[][]): string {
  const rows = [];

  for (const [left, right] of items) {
    let spaces = 58 - right.length - 1 - left.length;

    for (const character of left) {
      const codePoint = character.codePointAt(0) as number;

      if (isFullwidthCodePoint(codePoint)) spaces -= 1;
    }

    rows.push(`${left}${' '.repeat(spaces)}${right}`);
  }

  return rows.join('\n');
}
