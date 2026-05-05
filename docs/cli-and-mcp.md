# Kmor CLI & MCP Server

Kmor ships a companion CLI inside the desktop app bundle. Release builds
install `kmor`; debug builds install `kmor-dev`. The terminal entrypoint
always points at the currently installed desktop app so CLI and desktop
versions stay aligned.

## Install

### Settings UI

Open the desktop app → Settings → Experimental → **Command Line Tool** → Install.
This installs a symlink to the app bundle's `kmor-cli`:

- Release build: `/usr/local/bin/kmor`
- Debug build: `/usr/local/bin/kmor-dev`

### Development

```bash
bun run dev:cli:build
./src-tauri/target/debug/kmor-cli cli-status
bun run dev:cli:install
kmor-dev cli-status
```

The debug build reads `~/kmor-dev/` — same database as `bun run dev`.

## CLI Usage

```bash
kmor data info
kmor repo list
kmor repo add /path/to/repo
kmor workspace list
kmor workspace show kmor/earth            # human-readable ref
kmor workspace new --repo kmor
kmor session list --workspace kmor/earth
kmor session new --workspace kmor/earth
kmor send --workspace kmor/earth "Refactor the auth module"
```

Debug builds use the same commands under `kmor-dev`.

`--json` on any command outputs machine-readable JSON. `--data-dir <path>` overrides the data directory.

### Workspace References

Most commands accept either a UUID or a `repo-name/directory-name` shorthand:

```bash
kmor workspace show 5508edf1-bc73-4c6e-9c3d-21de3eeb25be   # UUID
kmor workspace show ai-shipany-template/draco                 # shorthand
```

## MCP Server

Run `kmor mcp` (or `kmor-dev mcp` in debug) to start a stdio MCP server implementing JSON-RPC 2.0.

### Exposed Tools

| Tool | Description |
|------|-------------|
| `kmor_data_info` | Data directory and build mode |
| `kmor_repo_list` | List repositories |
| `kmor_repo_add` | Register a local Git repo |
| `kmor_workspace_list` | List workspaces by status |
| `kmor_workspace_show` | Workspace details |
| `kmor_workspace_create` | Create workspace |
| `kmor_session_list` | List sessions |
| `kmor_session_create` | Create session |
| `kmor_send` | Send prompt to AI agent |

### Register with Claude Code

```bash
claude mcp add kmor -- /usr/local/bin/kmor mcp
```

Verify: `claude mcp list`

### Register with Claude Desktop

Edit `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "kmor": {
      "command": "/usr/local/bin/kmor",
      "args": ["mcp"]
    }
  }
}
```

Restart Claude Desktop.

### Register with Cursor

Edit `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "kmor": {
      "command": "/usr/local/bin/kmor",
      "args": ["mcp"]
    }
  }
}
```

### Dev Mode

Use the debug entrypoint instead:

```bash
claude mcp add kmor-dev -- /usr/local/bin/kmor-dev mcp
```

## Testing the MCP Server

### MCP Inspector (Web UI)

```bash
npx @modelcontextprotocol/inspector -- ./src-tauri/target/debug/kmor-cli mcp
```

Opens a browser UI to browse tools, invoke them, and inspect protocol traffic.

### Terminal Inspector

```bash
npx @wong2/mcp-cli -- ./src-tauri/target/debug/kmor-cli mcp
```

### Manual (pipe JSON-RPC)

```bash
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"test","version":"1.0"}}}
{"jsonrpc":"2.0","method":"notifications/initialized"}
{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}' \
| ./src-tauri/target/debug/kmor-cli mcp
```
