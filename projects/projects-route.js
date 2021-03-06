const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();




router.get('/', async (req, res) => {
    try {
      const projects = await Projects.find(req.query);
      res.status(200).json(projects);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const project = await Projects.findById(req.params.id);
  
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the project',
      });
    }
  });
  
  router.get('/:id/projects', async (req, res) => {
    try {
      const projects = await Projects.findProjectProjects(req.params.id);
  
      if (projects.length > 0) {
        res.status(200).json(projects);
      } else {
        res.status(404).json({ message: 'No projects for this project' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects for this project',
      });
    }
  });
  
    
  router.get('/:id/actions', async (req, res) => {
    try {
      const projects = await Projects.find(req.query);
      res.status(200).json(projects);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the projects',
      });
    }
  });
  


  router.delete('/:id', async (req, res) => {
    try {
      const count = await Projects.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The project has been nuked' });
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the project',
      });
    }
  });
  


  router.put('/:id', async (req, res) => {
    try {
      const project = await Projects.update(req.params.id, req.body);
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'The project could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the project',
      });
    }
  });
  

  router.post("/", async (req, res) => {
    console.log("project", req.body);
    try {
      const projectData = req.body;
      const projectId = await Projects.insert(projectData);
      const project = await Projects.findById(projectId.id);
      res.status(201).json(project);
    } catch (error) {
      let message = "There was an error while saving the project to the database";
  
      if (error.errno === 19) {
        message = "please provide both the name and the description";
      }
      res.status(500).json({ message: message, error });
    }
  });

        



module.exports = router;