# Changelog

All notable changes to the **Next Steps Suggester** plugin will be documented in this file.

## [1.1.1] - 2026-11-17

### Added
- **1-Click npx CLI Installer (`bin/cli.js`)**: Added automated `npx` installer supporting both global (`~/.gemini/config/plugins/suggest-next-steps`) and per-project workspace installation (`.gemini/plugins/suggest-next-steps`).
- **Streamlined Documentation**: Rewrote `README.md` to be user-centric with 10-second setup instructions and clear workflow illustrations.

## [1.1.0] - 2026-11-17

### Added
- **Multi-Select Support**: `is_multi_select: true` enabled when options can be tackled concurrently.
- **Handling User Skip**: Explicit instruction that skipping indicates no further actions are desired, terminating the turn without re-prompting.

### Changed
- **Option Minimum**: Updated guideline to propose at least 2 options (formerly "1-3").
- **Fulfill First Mandate**: Enforced completing current work and user requests in full prior to presenting suggestions.
- **Context Summaries in Chat**: Required summarizing proposed steps and their purposes in response text before invoking the question tool.
- **Subagent Guard**: Restriced suggestion prompts exclusively to the primary root assistant; subagents must communicate via `send_message`.

## [1.0.0] - 2026-11-16

### Added
- Initial release of the `suggest-next-steps` plugin.
- Added always-on agent rule and reference skill for turn-ending suggestions.
