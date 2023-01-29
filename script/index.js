const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");

const baseFile = path.resolve(process.cwd(), "index.py");

content = "";

function log(res) {
  if (content == res) return;
  console.log(res);
  content = res;
}

function run() {
  exec(
    `python3 ${baseFile}`,
    { env: process.env, encoding: "utf8", stdout: "pipe" },
    (err, stdout, stderr) => {
      if (err) {
        throw new Error(err);
        return;
      }
      log(`stdout: ${stdout}`);
    }
  ).on("exit", code => {
    log("complile time:", Date.now());
  });
}

function watch() {
  console.info("watch file:" + baseFile);
  fs.watch(
    baseFile,
    { presistent: false, recursive: false, encoding: "utf8" },
    (eventType, fileNName) => {
      if (eventType == "change") {
        run();
      }
    }
  );
}

watch();
