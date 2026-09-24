// Local execution only. Reads ONE approved key; never writes or logs its value.
import { readFileSync } from "node:fs";
import { spawn } from "node:child_process";
const sourcePath = "C:/Users/ADMIN/Desktop/Dispensary Templates/castle-heights/.env.local";
const sourceText = readFileSync(sourcePath, "utf8");
const match = sourceText.match(/^APPS_SCRIPT_URL\s*=\s*(.+)$/m);
if (!match) throw new Error("Approved source key not found");
const endpoint = match[1].trim().replace(/^['"]|['"]$/g, "");
const mode = process.argv[2];
const commands = { build: "npm.cmd run build", start: "npm.cmd run start -- --port 3017", dev: "npm.cmd run dev -- --port 3017" };
if (!commands[mode]) throw new Error("Unknown local operation");
const child = spawn("cmd.exe", ["/d", "/s", "/c", commands[mode]], { env: { ...process.env, NODE_OPTIONS: "--use-system-ca", APPS_SCRIPT_URL: endpoint, MENU_STORE_CODE: "TPC01" }, stdio: ["inherit", "pipe", "pipe"], windowsHide: true });
// Defense in depth against accidental endpoint echo by a subprocess.
for (const [stream, output] of [[child.stdout, process.stdout], [child.stderr, process.stderr]]) stream.on("data", (chunk) => output.write(chunk.toString().replaceAll(endpoint, "[REDACTED_ENDPOINT]")));
child.on("exit", (code) => process.exit(code || 0));
