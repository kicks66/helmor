---
name: kmor-cli
description: Use the Kmor CLI to remote-control Kmor from the terminal. Use when the user asks to inspect Kmor data/settings, manage repositories/workspaces/sessions/files, send prompts to agents, list models, use GitHub integration, inspect scripts, migrate from Conductor, run Kmor as an MCP server, generate shell completions, quit a running app, check/install/update the Kmor CLI beta, install/update Kmor skills through the beta app flow, or needs the Kmor command reference.
---

# Kmor CLI

Use this skill to guide simple terminal-first Kmor workflows. Keep the answer practical: prefer one or two concrete commands over a long CLI tutorial.

## First Checks

1. Check whether the CLI is installed and which data mode it targets:

```bash
kmor cli-status
```

2. Check the active data directory and database:

```bash
kmor data
```

Use `--json` when the output will be parsed by scripts or another tool.

## CLI Install And Update

Treat Kmor CLI install/update as beta.

- Prefer the Kmor desktop onboarding/settings flow for installing or repairing the managed CLI entrypoint.
- Use `kmor cli-status` to verify whether the PATH entry points at the current app-managed CLI.
- Do not invent a stable standalone install/update command unless it exists in `kmor --help` or a subcommand help page.
- If the user is blocked, ask them to run `kmor cli-status` and share the output, or inspect the app's CLI install panel if working inside the Kmor repo.

## Kmor Skills Install And Update

Treat Kmor skills install/update as a beta app-managed flow.

- Prefer the Kmor desktop onboarding/settings flow for installing or updating bundled Kmor skills.
- Do not invent a `kmor skills` command; the top-level CLI help does not currently expose one.
- If the user asks to update a bundled Kmor skill inside the repo, edit the skill files directly and validate them with the skill validation tooling.
- Keep user-facing skill content concise and English-first unless the user explicitly asks for another language.

## Common Tasks

### Manage Repositories And Workspaces

Use these command groups for local-first project setup and workspace orchestration:

```bash
kmor repo --help
kmor workspace --help
```

When creating workspaces, prefer explicit repo names and concise purpose labels:

```bash
kmor workspace new --repo kmor
```

### Inspect Sessions And Files

Use sessions for conversation history and files for editor-surface operations:

```bash
kmor session --help
kmor files --help
```

### Send A Prompt To An Agent

Use `send` when the user wants to dispatch work from the terminal:

```bash
kmor send --help
```

Favor JSON output for automation:

```bash
kmor --json send --help
```

### Integrations And Local Tooling

Use the relevant command group:

```bash
kmor github --help
kmor scripts --help
kmor models --help
```

### MCP Server

Run Kmor as an MCP server over stdio:

```bash
kmor mcp
```

Use this when another agent/runtime needs to call Kmor through Model Context Protocol.

## Command Reference

Read `references/kmor-help.md` when you need the full top-level `kmor --help` command list.

For exact flags on a command group, run the group's help instead of guessing:

```bash
kmor <command> --help
```
