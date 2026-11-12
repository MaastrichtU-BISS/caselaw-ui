import { readFileSync, writeFileSync } from 'node:fs';
const { components, groups } = JSON.parse(
    readFileSync('docs-site/generated/components.json', 'utf8'),
  ),
  shots = JSON.parse(readFileSync('docs-site/generated/screenshots.json', 'utf8'));
let text =
  '# Component screenshots\n\nReal renders of the shipped components, using synthetic research-project data.\nAll ' +
  components.length +
  ' components have desktop and phone references.\nOpen the documentation site for state selection, interactive examples and API tables.\n\nRun `npm run docs:dev` locally, or build the static site with `npm run docs:build`.\n\n';
for (const group of groups) {
  text += '## ' + group + '\n\n';
  for (const c of components.filter((c) => c.category === group)) {
    const available = shots.filter((s) => s.name === c.name);
    const desktop = available.find((s) => s.viewport === 'desktop'),
      phone = available.find((s) => s.state === desktop?.state && s.viewport === 'phone');
    text +=
      '### ' +
      c.name +
      '\n\n' +
      c.description +
      '\n\n' +
      (c.vue && c.svelte ? 'Vue and Svelte.' : c.vue ? 'Vue only.' : 'Svelte only.') +
      '\n\n';
    if (desktop)
      text +=
        '![' + c.name + ' · ' + desktop.state + ' · desktop](screenshots/' + desktop.file + ')\n\n';
    if (phone)
      text +=
        '<details>\n<summary>Phone layout</summary>\n\n![' +
        c.name +
        ' · ' +
        phone.state +
        ' · phone](screenshots/' +
        phone.file +
        ')\n\n</details>\n\n';
  }
}
writeFileSync('docs/visual-reference.md', text.trimEnd() + '\n');
console.log('Generated Markdown screenshot reference.');
