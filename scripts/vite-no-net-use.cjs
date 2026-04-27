const childProcess = require("node:child_process");
const { EventEmitter } = require("node:events");
const { syncBuiltinESMExports } = require("node:module");

const originalExec = childProcess.exec;

childProcess.exec = function exec(command, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  if (process.platform === "win32" && command === "net use") {
    const child = new EventEmitter();
    child.stdout = new EventEmitter();
    child.stderr = new EventEmitter();
    child.stdin = null;
    child.kill = () => false;

    process.nextTick(() => {
      if (callback) {
        callback(new Error("Skipped optional Vite Windows network-drive probe."), "", "");
      }
      child.emit("exit", 0, null);
      child.emit("close", 0, null);
    });

    return child;
  }

  return originalExec.call(this, command, options, callback);
};

syncBuiltinESMExports();

import("../node_modules/vite/bin/vite.js");
