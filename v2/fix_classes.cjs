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
      
      // Remove all `!` from className attributes to prevent Tailwind v4 compiler bugs
      content = content.replace(/className=(["'`])(.*?)(["'`])/g, (match, quote1, classString, quote2) => {
        const cleanedClassString = classString.replace(/!/g, '');
        return `className=${quote1}${cleanedClassString}${quote2}`;
      });
      
      if (originalContent !== content) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Cleaned ! from ${fullPath}`);
      }
    }
  }
}

const srcDir = path.join(__dirname, 'src');
processDirectory(srcDir);
console.log('Class modification completed!');
