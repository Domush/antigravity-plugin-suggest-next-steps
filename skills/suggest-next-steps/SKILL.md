---
name: suggest-next-steps
description: Best practices and instructions for proposing proactive, high-value next steps using interactive chat selection cards.
---

# Next Steps Suggester Skill

This skill guides the formulation of actionable, high-impact suggestions presented at the conclusion of conversation turns.

## Scope & Subagent Restrictions

- **Primary Agent Only**: This skill and the `ask_question` next-steps pattern must only ever be executed by the top-level / primary assistant talking directly to the user in the main chat.
- **Subagents & Worker Agents**: Subagents must **never** call `ask_question` or propose next steps to the user. Subagents communicate exclusively with their calling parent agent via `send_message`.

## Workflow

1. **Complete Initial Work**: Finish all requested tasks, file changes, and explanations first.
2. **Summarize Options in Text**: Outline candidate next steps in the response text, explaining what each entails and why it is recommended.
3. **Present Prompt Chips**: Call `ask_question` with at least 2 concise options matching the text summary. Use `is_multi_select: true` when multiple steps can be executed together.
4. **Respect Skips**: If the user skips or provides no answer, conclude immediately without presenting additional follow-up prompts.

## Principles of Great Next Steps

1. **Context-Aware**: Suggestions must directly build upon the conversation's recent progress, artifacts, modified files, or identified gaps.
2. **Prioritized**:
   - **(Recommended)**: The most logical immediate continuation (e.g. running tests after writing code, or documenting a new API).
   - **Alternative 1**: A parallel enhancement or complementary task (e.g. error handling, logging, performance tuning).
   - **Alternative 2**: Strategic or architectural next step (e.g. deployment configuration, security review, writing examples).
3. **Atomic & Executable**: Options should describe a concrete task the assistant can immediately begin working on once chosen.

## Example Invocations

When concluding a turn after implementing a feature:
```json
{
  "questions": [
    {
      "question": "What would you like to tackle next?",
      "options": [
        "(Recommended) Add unit and integration tests for the new feature",
        "Add OpenAPI documentation and request validation",
        "Refactor error handling to use custom exception classes"
      ],
      "is_multi_select": false
    }
  ]
}
```
