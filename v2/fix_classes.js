const fs = require('fs');
const path = require('path');

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const originalContent = content;
      // Regex explanation:
      // (?:([a-zA-Z0-9_-]+):)?  -> optional responsive/state prefix like 'md:', 'hover:'
      // ([a-zA-Z0-9_\]\.\(\)\[%-]+)! -> class name followed by '!'
      // (?=[\s"'`]) -> must be followed by space, quote, or backtick
      content = content.replace(/(?:([a-zA-Z0-9_-]+):)?([a-zA-Z0-9_\]\.\(\)\[%-]+)!(?=[\s"'`])/g, (match, prefix, className) => {
        if (prefix) {
          return `${prefix}:!${className}`; // e.g., md:px-0! -> md:!px-0
        }
        return `!${className}`; // e.g., py-32! -> !py-32
      });
      
      if (originalContent !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed classes in ${fullPath}`);
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');
processDirectory(srcDir);
console.log('Class modification completed!');
