const fs = require('fs');
const path = require('path');

const directoryToSearch = './src'; // Replace with the directory you want to search

// Arrays to exclude files and directories
const excludedFiles = ['env.config.ts', '.env', 'prod.env']; // Add file names to exclude
const excludedDirectories = ['node_modules']; // Add directory names to exclude

let literalProcessEnvs = [];

function findFilesWithEnv(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!excludedDirectories.includes(file)) {
        findFilesWithEnv(fullPath); // Recursively search in subdirectories
      }
    } else if (
      stat.isFile() &&
      (file.endsWith('.js') || file.endsWith('.ts'))
    ) {
      if (!excludedFiles.includes(file)) {
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('process.env')) {
            literalProcessEnvs.push({
              foundAt: `Found "process.env" in: ${fullPath}`,
              line: `Line ${index + 1}: ${line.trim()}`,
            });
          }
        });
      }
    }
  });
}

function checkForLiteralUseOfProcessEnvVariables() {
  findFilesWithEnv(directoryToSearch);
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
