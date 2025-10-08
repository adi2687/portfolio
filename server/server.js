const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Paths to data files
const DATA_DIR = path.join(__dirname, '../public/data');
const PROJECTS_FILE = path.join(DATA_DIR, 'projects.json');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');
const EXPERIENCE_FILE = path.join(DATA_DIR, 'experience.json');

// Helper function to read JSON file
async function readJSONFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// Helper function to write JSON file
async function writeJSONFile(filePath, data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// ==================== PROJECTS ROUTES ====================

// Get all projects
app.get('/api/projects', async (req, res) => {
  const projects = await readJSONFile(PROJECTS_FILE);
  if (projects) {
    res.json(projects);
  } else {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
  const projects = await readJSONFile(PROJECTS_FILE);
  if (projects) {
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Create new project
app.post('/api/projects', async (req, res) => {
  const projects = await readJSONFile(PROJECTS_FILE);
  if (projects) {
    const newProject = {
      ...req.body,
      id: Date.now()
    };
    projects.push(newProject);
    
    const success = await writeJSONFile(PROJECTS_FILE, projects);
    if (success) {
      res.status(201).json(newProject);
    } else {
      res.status(500).json({ error: 'Failed to save project' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
  const projects = await readJSONFile(PROJECTS_FILE);
  if (projects) {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
      projects[index] = { ...projects[index], ...req.body };
      
      const success = await writeJSONFile(PROJECTS_FILE, projects);
      if (success) {
        res.json(projects[index]);
      } else {
        res.status(500).json({ error: 'Failed to update project' });
      }
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
  const projects = await readJSONFile(PROJECTS_FILE);
  if (projects) {
    const filteredProjects = projects.filter(p => p.id !== parseInt(req.params.id));
    
    const success = await writeJSONFile(PROJECTS_FILE, filteredProjects);
    if (success) {
      res.json({ message: 'Project deleted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// ==================== SKILLS ROUTES ====================

// Get all skills
app.get('/api/skills', async (req, res) => {
  const skills = await readJSONFile(SKILLS_FILE);
  if (skills) {
    res.json(skills);
  } else {
    res.status(500).json({ error: 'Failed to load skills' });
  }
});

// Update skills
app.put('/api/skills', async (req, res) => {
  const success = await writeJSONFile(SKILLS_FILE, req.body);
  if (success) {
    res.json({ message: 'Skills updated successfully' });
  } else {
    res.status(500).json({ error: 'Failed to update skills' });
  }
});

// ==================== EXPERIENCE ROUTES ====================

// Get all experience
app.get('/api/experience', async (req, res) => {
  const experience = await readJSONFile(EXPERIENCE_FILE);
  if (experience) {
    res.json(experience);
  } else {
    res.status(500).json({ error: 'Failed to load experience' });
  }
});

// Update experience
app.put('/api/experience', async (req, res) => {
  const success = await writeJSONFile(EXPERIENCE_FILE, req.body);
  if (success) {
    res.json({ message: 'Experience updated successfully' });
  } else {
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

// ==================== BACKUP ROUTES ====================

// Create backup of all data
app.post('/api/backup', async (req, res) => {
  try {
    const projects = await readJSONFile(PROJECTS_FILE);
    const skills = await readJSONFile(SKILLS_FILE);
    const experience = await readJSONFile(EXPERIENCE_FILE);
    
    const backup = {
      timestamp: new Date().toISOString(),
      projects,
      skills,
      experience
    };
    
    const backupDir = path.join(__dirname, '../backups');
    await fs.mkdir(backupDir, { recursive: true });
    
    const backupFile = path.join(backupDir, `backup-${Date.now()}.json`);
    await fs.writeFile(backupFile, JSON.stringify(backup, null, 2));
    
    res.json({ message: 'Backup created successfully', file: backupFile });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create backup' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Data directory: ${DATA_DIR}`);
});
