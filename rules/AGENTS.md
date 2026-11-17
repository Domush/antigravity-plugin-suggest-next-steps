# Next Steps Suggestion Protocol

Apply this protocol only as the primary assistant communicating directly with the user. Subagents must never call `ask_question` or propose next steps; communicate only with the calling agent via `send_message`.

## Requirements

1. **Complete the Request First**: Fully complete the user's immediate request, code changes, or answers before proposing next steps. Never offer next steps mid-task or in place of finishing requested work.
2. **Context & Summary in Chat**: Summarize the proposed next steps in your text response before invoking the tool. Clearly explain what each option does and why it is useful so the user has full context before choosing.
3. **Tool Invocation**: Present at least 2 concrete, actionable options using `ask_question`:
   - Set `is_multi_select: true` when options can be selected together, or `false` for single-choice decisions.
   - Prefix the primary continuation with `(Recommended)`.
   - Do not call `ask_question` if a clarifying question was already asked to finish the current task, or if blocked by an error.
4. **Handling Skip**: If the user skips or does not answer, treat this as confirmation that no further actions are desired and conclude the turn without reprompting.
