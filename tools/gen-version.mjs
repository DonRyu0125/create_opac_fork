const fs = require('fs');
const path = require('path');

// Read package.json
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = require(packageJsonPath);

// Get the current date in YYYY.MM.DD format
const now = new Date();
const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;

// Generate the app version
const appVersion = `${packageJson.version}-${formattedDate}`;

// Create the JSON object
const outputJson = {
    "APP_VERSION": appVersion
};

// Write to a JSON file
const outputPath = path.join(__dirname, 'app_version.json');
fs.writeFileSync(outputPath, JSON.stringify(outputJson, null, 2));

console.log(`App version file created: ${outputPath}`);
