const express = require('express');

const Actions = require('./actions-model');

const router = express.Router();




router.get('/', async (req, res) => {
    try {
      const actions = await Actions.find(req.query);
      res.status(200).json(actions);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions',
      });
    }
  });


  
  router.get('/:id', async (req, res) => {
    try {
      const action = await Actions.findById(req.params.id);
  
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions',
      });
    }
  });
  
  router.get('/:id/actions', async (req, res) => {
    try {
      const actions = await Actions.findActionActions(req.params.id);
  
      if (actions.length > 0) {
        res.status(200).json(actions);
      } else {
        res.status(404).json({ message: 'No actions for this actions' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the actions for this actions',
      });
    }
  });
  
  


  router.delete('/:id', async (req, res) => {
    try {
      const count = await Actions.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The action has been nuked' });
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the action',
      });
    }
  });
  


  router.put('/:id', async (req, res) => {
    try {
      const action = await Actions.update(req.params.id, req.body);
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'The action could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the action',
      });
    }
  });
  

  router.post("/", async (req, res) => {
    console.log("action", req.body);
    try {
      const actionData = req.body;
      const actionId = await Actions.insert(actionData);
      const action = await Actions.findById(actionId.id);
      res.status(201).json(action);
    } catch (error) {
      let message = "There was an error while saving the action to the database";
  
      if (error.errno === 19) {
        message = "please provide both the name and the description";
      }
      res.status(500).json({ message: message, error });
    }
  });

        



module.exports = router;
