// Approved Preston-only provisioning. No credential values in arguments or logs.
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
const team = "team_IqYig3d4WKblBzRjJ50L7GEc";
const project = "prj_i4GLP2Okj1j6fmS6xyHFZUqg5mz1";
const link = JSON.parse(readFileSync(".vercel/project.json", "utf8"));
if (link.orgId !== team || link.projectId !== project) throw new Error("Wrong project link");
const source = readFileSync("C:/Users/ADMIN/Desktop/Dispensary Templates/castle-heights/.env.local", "utf8");
const match = source.match(/^APPS_SCRIPT_URL\s*=\s*(.+)$/m);
if (!match) throw new Error("Approved source key missing");
const endpoint = match[1].trim().replace(/^['"]|['"]$/g, "");
const url = new URL(endpoint);
if (url.protocol !== "https:" || !["script.google.com", "script.googleusercontent.com"].includes(url.hostname)) throw new Error("Source host rejected");
for (const [key, value] of [["APPS_SCRIPT_URL", endpoint], ["MENU_STORE_CODE", "CHC01"]]) {
  const command = `vercel.cmd env add ${key} production,preview --sensitive --yes --project ${project} --scope ${team} --global-config .vercel-auth-preston`;
  const result = spawnSync("cmd.exe", ["/d", "/s", "/c", command], { input: value, encoding: "utf8", windowsHide: true, env: { ...process.env, NODE_OPTIONS: "--use-system-ca", VERCEL_TELEMETRY_DISABLED: "1" } });
  if (result.status !== 0) throw new Error(`Provisioning failed for ${key}; output suppressed to protect source values`);
  console.log(`${key}: sensitive configuration added to approved Preston preview and production environments`);
}
