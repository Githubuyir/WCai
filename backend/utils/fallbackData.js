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
  const teamAnalysisPath = path.join(__dirname, '../../frontend/src/pages/TeamAnalysis.jsx');
  if (!fs.existsSync(teamAnalysisPath)) {
    console.error("TeamAnalysis.jsx not found at " + teamAnalysisPath);
    return {};
  }
  
  let content = fs.readFileSync(teamAnalysisPath, 'utf8');
  const startIdx = content.indexOf("const teamsDatabase = useMemo(() => {");
  if (startIdx === -1) {
    console.error("teamsDatabase block not found in TeamAnalysis.jsx");
    return {};
  }
  
  const returnIdx = content.indexOf("return {", startIdx);
  if (returnIdx === -1) {
    console.error("return block inside teamsDatabase not found");
    return {};
  }
  
  const endUseMemoIdx = content.indexOf("  }, []);", returnIdx);
  if (endUseMemoIdx === -1) {
    console.error("end of useMemo inside teamsDatabase not found");
    return {};
  }
  
  const returnBlock = content.substring(returnIdx, endUseMemoIdx).trim();
  let objectStr = returnBlock.substring(7).trim(); // remove 'return '
  if (objectStr.endsWith(';')) {
    objectStr = objectStr.substring(0, objectStr.length - 1);
  }
  
  const tempTeamsFile = path.join(__dirname, 'tempTeams.js');
  // Define mock heroImages and stadiumBg variables that are referenced in the object structure
  const fileContent = `const heroImages = {};\nconst stadiumBg = "";\nmodule.exports = ${objectStr};`;
  fs.writeFileSync(tempTeamsFile, fileContent, 'utf8');
  
  let teams = {};
  try {
    teams = require('./tempTeams');
  } catch (err) {
    console.error("Error loading teamsDatabase from TeamAnalysis.jsx:", err);
  } finally {
    try {
      fs.unlinkSync(tempTeamsFile);
    } catch (e) {}
  }
  
  return teams;
}

module.exports = {
  getMatchesData,
  getTeamsData
};
