const fs = require('fs');
const path = require('path');

const excludedFiles = ['env.config.ts', 'literal-staged-file-env-check.js'];

let literalProcessEnvs = [];

function findFilesWithEnv(stagedFiles) {
  for (const stagedFile of stagedFiles) {
    const basePath = path.join(__dirname, stagedFile);
    const fileName = path.parse(basePath).base;
    const fileProperties = fs.lstatSync(basePath);
    if (
      fileProperties.isFile() &&
      (fileName.endsWith('.js') || fileName.endsWith('.ts')) &&
      !excludedFiles.includes(fileName)
    ) {
      const content = fs.readFileSync(basePath, 'utf-8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('process.env')) {
          literalProcessEnvs.push({
            foundAt: `Found "process.env" in: ${basePath}`,
            line: `Line ${index + 1}: ${line.trim()}`,
          });
        }
      });
    }
  }
}

function checkForLiteralUseOfProcessEnvVariables() {
  const stagedFiles = process.argv.slice(2);
  findFilesWithEnv(stagedFiles);
  if (literalProcessEnvs.length > 0) {
    for (const literalProcessEnv of literalProcessEnvs) {
      console.log(literalProcessEnv.foundAt + '\n');
      console.error(literalProcessEnv.line + '\n');
    }
    console.error(
      `******Kindly remove the literal use of process.env for process variables******`,
    );
    console.log(`\n`);
    throw new Error();
  }
}

checkForLiteralUseOfProcessEnvVariables();
