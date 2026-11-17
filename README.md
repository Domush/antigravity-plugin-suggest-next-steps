# Next Steps Suggester for Google Antigravity

> **Proactive, 1-click prompt chips at the end of every turn. Turn completed tasks into immediate momentum.**

[![npm version](https://img.shields.io/npm/v/antigravity-plugin-suggest-next-steps.svg)](https://www.npmjs.com/package/antigravity-plugin-suggest-next-steps)
[![Live Simulator](https://img.shields.io/badge/Live%20Simulator-domush.github.io-6366f1?style=flat&logo=github)](https://domush.github.io/antigravity-plugin-suggest-next-steps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Antigravity App Compatible](https://img.shields.io/badge/Antigravity%20App-Native%20Plugin-818cf8.svg)]()

**Next Steps Suggester** stops "blank canvas fatigue" in the **Google Antigravity App**. Whenever your agent finishes a task, it presents at least two relevant, clickable follow-up options directly in chat using Antigravity's native prompt chips.

Instead of stopping and typing out a whole new prompt, you click an option and the agent immediately gets to work.

> 🌐 **Try the Live Interactive Simulator:** [domush.github.io/antigravity-plugin-suggest-next-steps](https://domush.github.io/antigravity-plugin-suggest-next-steps/)

---
<img width="1016" height="550" alt="image" src="https://github.com/user-attachments/assets/5dbd6b8c-067e-46a9-ac10-8d4031d8e243" />

## Quick Install (10 Seconds)

Install directly into Google Antigravity using `npx`:

```bash
# Global install (available across all Antigravity chats)
npx antigravity-plugin-suggest-next-steps install

# Or per-project install (scoped to current workspace only)
npx antigravity-plugin-suggest-next-steps install --workspace
```

Restart or open the **Google Antigravity App**, and the plugin is active immediately.

---

## How It Works

```text
┌────────────────────────────────────────────────────────┐
│ 1. Agent completes your request in full                │
│    "Authentication middleware created and verified."   │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. Agent explains candidate follow-ups in chat text    │
│    • (Recommended) Refresh Token Rotation in Redis     │
│    • Add OAuth2 Google / GitHub Providers              │
│    • Generate OpenAPI / Swagger documentation          │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. Native 1-Click Interactive Prompt Card              │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Suggested next steps:                            │  │
│  │ [✓] (Recommended) Add refresh token rotation     │  │
│  │ [ ] Add OAuth2 Google / GitHub Providers         │  │
│  │ [ ] Generate OpenAPI / Swagger documentation     │  │
│  │                                                  │  │
│  │ [Skip / Conclude Turn]       [Confirm Selection] │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

You click an option, and the agent immediately continues with that task. If you're done, simply click **Skip** and the agent concludes cleanly.

---

## Why You'll Love It

* ⚡ **Zero Friction**: Eliminate the pause where you have to think about what to prompt next.
* 🎯 **Smart Prioritization**: The single highest-leverage continuation (like running tests, updating docs, or staging a deployment) is tagged with `(Recommended)`.
* ☑️ **Multi-Select Batching**: When multiple tasks can be handled together (e.g. write docs + commit + tag release), select all that apply.
* 🛡️ **No Subagent Spam**: Strictly isolated to the main chat assistant. Background workers and subagents are barred from prompting you directly.
* 🚪 **Respectful Skip**: If you skip or dismiss the prompt, the agent wraps up immediately with zero nagging.
* 🔒 **100% Local & Private**: No analytics, no background telemetry, and zero runtime dependencies.

---

## Managing the Plugin

### Enable / Disable Anytime
Open the **Google Antigravity App** &rarr; open **Customizations** &rarr; **Plugins**, and toggle **Next Steps Suggester** on or off with one click.

### Uninstall
To remove the plugin from your system:

```bash
# Remove global plugin
npx antigravity-plugin-suggest-next-steps uninstall

# Remove per-project plugin
npx antigravity-plugin-suggest-next-steps uninstall --workspace
```

---

## License

MIT © [Phillip Webber](https://github.com/Domush)
