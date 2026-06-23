#!/usr/bin/env node
/**
 * CLI tool entry point
 * Project ID: ef725a
 */

'use strict';

const { parseArgs } = require('util');

const COMMANDS_ef725a = {
  run: cmdRun_ef725a,
  list: cmdList_ef725a,
  version: cmdVersion_ef725a,
};

function cmdRun_ef725a(positionals, opts) {
  const task = positionals[0] || 'default';
  const output = opts.output || './output';
  console.log(`Running task: ${task}`);
  console.log(`Output: ${output}`);
  console.log(`Instance: ef725a`);
}

function cmdList_ef725a(positionals, opts) {
  const filter = opts.filter || '';
  const items = ['task-a', 'task-b', 'task-c'].filter(
    (t) => !filter || t.includes(filter)
  );
  console.log('Available tasks:');
  items.forEach((item) => console.log(`  - ${item}`));
}

function cmdVersion_ef725a() {
  const pkg = require('./package.json');
  console.log(`${pkg.name} v${pkg.version} (id: ef725a)`);
}

function printHelp_ef725a() {
  console.log(`Usage: tool <command> [options]

Commands:
  run <task>     Run a task
  list           List available tasks
  version        Show version info

Options:
  --output, -o   Output directory (default: ./output)
  --filter, -f   Filter pattern for list command
  --help, -h     Show this help
`);
}

function main() {
  const { values, positionals } = parseArgs({
    args: process.argv.slice(2),
    options: {
      output: { type: 'string', short: 'o' },
      filter: { type: 'string', short: 'f' },
      help: { type: 'boolean', short: 'h' },
    },
    allowPositionals: true,
    strict: false,
  });

  if (values.help || positionals.length === 0) {
    printHelp_ef725a();
    process.exit(0);
  }

  const [cmd, ...rest] = positionals;
  const handler = COMMANDS_ef725a[cmd];
  if (!handler) {
    console.error(`Unknown command: ${cmd}`);
    process.exit(1);
  }
  handler(rest, values);
}

main();
