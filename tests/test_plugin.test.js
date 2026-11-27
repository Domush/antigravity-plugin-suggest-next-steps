import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve('.');

test('plugin.json exists and is valid', () => {
  const pluginPath = path.join(ROOT, 'plugin.json');
  const pkgPath = path.join(ROOT, 'package.json');
  assert.ok(fs.existsSync(pluginPath), 'plugin.json should exist');
  
  const content = JSON.parse(fs.readFileSync(pluginPath, 'utf8'));
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  assert.equal(content.name, 'antigravity-plugin-suggest-next-steps');
  assert.equal(content.version, pkg.version);
  assert.ok(content.displayName, 'displayName is required');
  assert.ok(content.description, 'description is required');
});

test('rules/AGENTS.md exists and defines the protocol', () => {
  const rulePath = path.join(ROOT, 'rules', 'AGENTS.md');
  assert.ok(fs.existsSync(rulePath), 'rules/AGENTS.md should exist');
  
  const content = fs.readFileSync(rulePath, 'utf8');
  assert.match(content, /# Next Steps Suggestion Protocol/);
  assert.match(content, /Complete the Request First/);
  assert.match(content, /Mandatory Tool Invocation/);
  assert.match(content, /Handling Skip/);
});

test('LICENSE and CHANGELOG exist', () => {
  assert.ok(fs.existsSync(path.join(ROOT, 'LICENSE')), 'LICENSE should exist');
  assert.ok(fs.existsSync(path.join(ROOT, 'CHANGELOG.md')), 'CHANGELOG.md should exist');
  assert.ok(fs.existsSync(path.join(ROOT, 'README.md')), 'README.md should exist');
});

test('bin/cli.js installer exists and is executable', () => {
  const cliPath = path.join(ROOT, 'bin', 'cli.js');
  assert.ok(fs.existsSync(cliPath), 'bin/cli.js should exist');
  const content = fs.readFileSync(cliPath, 'utf8');
  assert.match(content, /#!\/usr\/bin\/env node/);
  assert.match(content, /install/);
  assert.match(content, /uninstall/);
});
