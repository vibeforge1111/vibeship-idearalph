#!/usr/bin/env node

import { execSync, spawnSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync, cpSync } from 'fs';
import { homedir, platform } from 'os';
import { join } from 'path';

const args = process.argv.slice(2);
const command = args[0];
const withSpawner = args.includes('--with-spawner') || args.includes('-s');
const help = args.includes('--help') || args.includes('-h');
const jsonOutput = args.includes('--json');

const isWin = platform() === 'win32';
const home = homedir();

// Colors (work in most terminals)
const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(msg) { console.log(msg); }
function step(n, msg) { log(`\n${c.cyan}[${n}]${c.reset} ${msg}`); }
function ok(msg) { log(`${c.green}✓${c.reset} ${msg}`); }
function err(msg) { log(`${c.red}✗${c.reset} ${msg}`); }
function warn(msg) { log(`${c.yellow}!${c.reset} ${msg}`); }

function emitResult(status, data) {
  if (jsonOutput) {
    console.log(JSON.stringify({ status, ...data }));
  }
}

function showHelp() {
  log(`
${c.bold}IdeaRalph${c.reset} - AI-powered idea generation for vibe coders

${c.bold}Usage:${c.reset}
  npx idearalph install [options]

${c.bold}Options:${c.reset}
  --with-spawner, -s   Also install 462 Spawner skills (recommended)
  --help, -h           Show this help

${c.bold}Examples:${c.reset}
  ${c.cyan}npx idearalph install${c.reset}                  Install IdeaRalph
  ${c.cyan}npx idearalph install --with-spawner${c.reset}   Install IdeaRalph + Spawner
`);
}

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: opts.stdio || 'pipe', ...opts });
  } catch (e) {
    if (opts.throwOnError) throw e;
    return null;
  }
}

async function install() {
  log(`
${c.bold}${c.blue}╔═════════════════════════════════════════╗
║   IdeaRalph Installer for Vibe Coders   ║
╚═════════════════════════════════════════╝${c.reset}
`);

  // Check prerequisites
  if (!run('node --version')) {
    err('Node.js is required. Install from https://nodejs.org');
    emitResult('error', { message: 'Node.js is required' });
    process.exit(1);
  }
  if (!run('git --version')) {
    err('Git is required.');
    emitResult('error', { message: 'Git is required' });
    process.exit(1);
  }

  const installDir = join(home, '.idearalph');
  const mcpDir = join(installDir, 'mcp-server');
  const tempDir = join(installDir, 'temp');

  // Step 1: Setup directory
  step('1/4', 'Setting up...');
  mkdirSync(installDir, { recursive: true });

  // Step 2: Download
  step('2/4', 'Downloading IdeaRalph...');

  if (existsSync(mcpDir)) {
    warn('Updating existing installation...');
    run('git pull', { cwd: mcpDir });
  } else {
    run(`git clone --depth 1 https://github.com/vibeforge1111/vibeship-idearalph.git "${tempDir}"`, { stdio: 'pipe' });

    // Move mcp-server folder
    const srcMcp = join(tempDir, 'mcp-server');
    if (existsSync(srcMcp)) {
      cpSync(srcMcp, mcpDir, { recursive: true });
    }
    rmSync(tempDir, { recursive: true, force: true });
  }
  ok('Downloaded');

  // Step 3: Build
  step('3/4', 'Building...');
  run('npm install', { cwd: mcpDir, stdio: 'pipe' });
  run('npm run build', { cwd: mcpDir, stdio: 'pipe' });
  ok('Built');

  // Step 4: Configure Claude
  step('4/4', 'Configuring Claude Code...');

  const mcpPath = join(mcpDir, 'dist', 'index.js');

  // Try claude CLI
  const cliResult = run(`claude mcp add idearalph -- node "${mcpPath}"`);

  if (cliResult !== null) {
    ok('Added to Claude Code');
  } else {
    // Manual config
    warn('Claude CLI not found, configuring manually...');

    const configDir = isWin
      ? join(process.env.APPDATA || '', 'Claude')
      : join(home, '.claude');
    const configFile = join(configDir, 'claude_desktop_config.json');

    mkdirSync(configDir, { recursive: true });

    let config = { mcpServers: {} };
    if (existsSync(configFile)) {
      try {
        config = JSON.parse(readFileSync(configFile, 'utf-8'));
        if (!config.mcpServers) config.mcpServers = {};
      } catch {}
    }

    config.mcpServers.idearalph = {
      command: 'node',
      args: [mcpPath]
    };

    writeFileSync(configFile, JSON.stringify(config, null, 2));
    ok('Config updated');
  }

  // Optional: Spawner
  if (withSpawner) {
    log(`\n${c.bold}${c.blue}Installing Spawner Skills...${c.reset}\n`);
    const result = spawnSync('npx', ['github:vibeforge1111/vibeship-spawner-skills', 'install', '--mcp'], {
      stdio: 'inherit',
      shell: true
    });
    if (result.status === 0) {
      ok('Spawner installed');
    } else {
      warn('Spawner install had issues. Try manually:');
      log(`  ${c.cyan}npx github:vibeforge1111/vibeship-spawner-skills install --mcp${c.reset}`);
    }
  }

  // Done
  log(`
${c.bold}${c.green}╔═════════════════════════════════════════╗
║          Installation Complete!         ║
╚═════════════════════════════════════════╝${c.reset}

${c.bold}Restart Claude Code${c.reset}, then try:

  "Brainstorm startup ideas in AI"
  "Validate my idea: [your idea]"
  "Create a PRD for this"

${c.cyan}Installed to:${c.reset} ${mcpDir}
`);

  if (!withSpawner) {
    log(`${c.yellow}Tip:${c.reset} For better output, add Spawner skills:
  ${c.cyan}npx idearalph install --with-spawner${c.reset}
`);
  }

  emitResult('success', { installDir: mcpDir });
}

// Main
if (help || !command) {
  showHelp();
} else if (command === 'install') {
  install().catch(e => {
    err(`Installation failed: ${e.message}`);
    emitResult('error', { message: e.message });
    process.exit(1);
  });
} else {
  log(`Unknown command: ${command}`);
  showHelp();
}
