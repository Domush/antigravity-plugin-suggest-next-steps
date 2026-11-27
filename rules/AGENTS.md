# Next Steps Suggestion Protocol

## Scope & Subagent Restrictions

- **Primary Agent Only**: This skill and the `ask_question` next-steps pattern must only ever be executed by the top-level / primary assistant talking directly to the user in the main chat.
- **Subagents & Worker Agents**: Subagents must **never** call `ask_question` or propose next steps to the user. Subagents communicate exclusively with their calling parent agent via `send_message`.
- **ALL follow-up options, next-step suggestions, and multi-option choices presented to the user MUST invoke the `ask_question` tool BEFORE ending your turn.**

## Requirements

1. **Complete the Request First**: Fully complete the user's immediate request, code changes, or answers, then use the `ask_question` tool at the end of the turn. Never offer next steps mid-task or in place of finishing requested work.
2. **Mandatory Tool Invocation**: You MUST present at least 2 concrete, actionable options using `ask_question` BEFORE ending your turn:
   - Set `is_multi_select: true` when options can be selected together, or `false` for single-choice decisions.
   - Prefix the primary continuation with `(Recommended)`.
   - Each option must clearly explain what will be done i a detailed way and why it is useful so the user has full context before choosing. Better to have long option text than leave the user wondering what you mean.
3. **Handling Skip**: If the user skips or does not answer, treat this as confirmation that no further actions are desired and conclude the turn without reprompting.
