# Next Steps Suggester Plugin

An Antigravity plugin that prompts the agent to display interactive, clickable prompt chips proposing at least 2 logical next steps at the conclusion of completed tasks.

## Features

- **Interactive Selection Cards**: Rendered natively via Antigravity's question prompt UI. Supports both single-select and multi-select choices.
- **Explain Before Asking**: Outlines candidate next steps and their rationales directly in chat before triggering prompts.
- **Smart Prioritization**: The single best continuation is tagged with `(Recommended)`.
- **Skip Respect**: When a user skips the prompt, the agent cleanly concludes without re-prompting.
- **Subagent-Safe**: Scoped strictly to the root assistant; subagents never prompt the user directly.

## Configuration

This plugin is installed locally at:
`~/.gemini/config/plugins/suggest-next-steps/`

It is automatically discovered and loaded across all your Antigravity sessions. You can enable or disable it anytime from the Customizations settings panel.
