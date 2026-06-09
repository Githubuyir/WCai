const fs = require('fs');
const path = require('path');

function getMatchesData() {
  const mockDataPath = path.join(__dirname, '../../frontend/src/data/mockData.js');
  if (!fs.existsSync(mockDataPath)) {
    console.error("mockData.js not found at " + mockDataPath);
    return [];
  }
  
  let content = fs.readFileSync(mockDataPath, 'utf8');
  // Convert ES modules export syntax to CommonJS
  content = content.replace(/export\s+const\s+/g, 'const ');
  content = content.replace(/export\s+function\s+/g, 'function ');
  content += '\nmodule.exports = { matchesData };';
  
  const tempFile = path.join(__dirname, 'tempMockData.js');
  fs.writeFileSync(tempFile, content, 'utf8');
  
  let matches = [];
  try {
    const data = require('./tempMockData');
    matches = data.matchesData;
  } catch (err) {
    console.error("Error loading mockData.js:", err);
  } finally {
    try {
      fs.unlinkSync(tempFile);
    } catch (e) {}
  }
  
  return matches;
}

function getTeamsData() {
  const teamsDataPath = path.join(__dirname, '../../frontend/src/data/teamsData.js');
  if (!fs.existsSync(teamsDataPath)) {
    console.error("teamsData.js not found at " + teamsDataPath);
    return {};
  }
  
  let content = fs.readFileSync(teamsDataPath, 'utf8');
  // Convert ES modules export syntax to CommonJS
  content = content.replace(/export\s+const\s+/g, 'const ');
  content = content.replace(/export\s+function\s+/g, 'function ');
  content += '\nmodule.exports = { TEAMS_LINEUPS, REAL_TEAMS_DATA, getStartingXIForFormation, parsePlayers, getStartingXI, teamsDatabase };';
  
  const tempTeamsFile = path.join(__dirname, 'tempTeamsData.js');
  fs.writeFileSync(tempTeamsFile, content, 'utf8');
  
  let teamsModule = {};
  try {
    teamsModule = require('./tempTeamsData');
  } catch (err) {
    console.error("Error loading teamsData.js:", err);
    return {};
  } finally {
    try {
      fs.unlinkSync(tempTeamsFile);
    } catch (e) {}
  }
  
  const { teamsDatabase } = teamsModule;
  return teamsDatabase || {};
}

module.exports = {
  getMatchesData,
  getTeamsData
};
