#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

let pkgVersion = "1.1.0";
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"));
  if (pkg.version) pkgVersion = pkg.version;
} catch {}

const cliArg = process.argv[2] || "install";

if (cliArg === "--version" || cliArg === "-v") {
  console.log(`antigravity-plugin-suggest-next-steps v${pkgVersion}`);
  process.exit(0);
}

if (cliArg === "--help" || cliArg === "-h") {
  console.log(`
Antigravity Next Steps Suggester CLI (v${pkgVersion})

Usage:
  npx antigravity-plugin-suggest-next-steps install [options]     Install plugin into Google Antigravity
  npx antigravity-plugin-suggest-next-steps uninstall [options]   Remove installed plugin

Options:
  --global, -g     Install globally in ~/.gemini/config/plugins/ (default)
  --workspace, -w  Install in current workspace (.gemini/plugins/suggest-next-steps)
  --help, -h       Show this help message
  --version, -v    Display version number
`);
  process.exit(0);
}

const isWorkspace = process.argv.includes("--workspace") || process.argv.includes("-w");
const homeDir = process.env.USERPROFILE || process.env.HOME || "";

let targetDir = "";
if (isWorkspace) {
  targetDir = path.join(process.cwd(), ".gemini", "plugins", "suggest-next-steps");
} else {
  targetDir = path.join(homeDir, ".gemini", "config", "plugins", "suggest-next-steps");
}

if (cliArg === "uninstall") {
  if (fs.existsSync(targetDir)) {
    fs.rmSync(targetDir, { recursive: true, force: true });
    console.log(`\n✔ Next Steps Suggester successfully removed from:`);
    console.log(`  ${targetDir}\n`);
  } else {
    console.log(`\nℹ Plugin not found at: ${targetDir}\n`);
  }
  process.exit(0);
}

if (cliArg === "install") {
  console.log(`\n📦 Installing Next Steps Suggester v${pkgVersion}...`);
  try {
    fs.mkdirSync(targetDir, { recursive: true });

    const filesToCopy = [
      "plugin.json",
      "package.json",
      "README.md",
      "LICENSE",
      "CHANGELOG.md"
    ];

    const dirsToCopy = ["rules", "skills", "assets"];

    for (const file of filesToCopy) {
      const src = path.join(rootDir, file);
      const dest = path.join(targetDir, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    }

    for (const dir of dirsToCopy) {
      const srcDir = path.join(rootDir, dir);
      const destDir = path.join(targetDir, dir);
      if (fs.existsSync(srcDir)) {
        fs.cpSync(srcDir, destDir, { recursive: true });
      }
    }

    console.log(`\n✨ Installation complete!`);
    console.log(`📍 Location: ${targetDir}`);
    console.log(`🚀 Restart or open the Google Antigravity App to activate Next Steps Suggester.\n`);
  } catch (err) {
    console.error(`\n❌ Installation failed: ${err.message}\n`);
    process.exit(1);
  }
  process.exit(0);
}

console.error(`\n❌ Unknown command: ${cliArg}`);
console.log(`Run 'npx antigravity-plugin-suggest-next-steps --help' for usage.\n`);
process.exit(1);
