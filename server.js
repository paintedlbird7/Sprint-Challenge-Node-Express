const express = require('express');
//import router

const projectsRouter = require('./projects/projects-route.js')

const actionsRouter = require('./actions/actions-route.js')

const server = express();

server.use(express.json());

server.use('/api/projects', projectsRouter) 

server.use('/api/actions', actionsRouter) 

// Delegates requests to /api/posts to the router.

// const Posts = require('./posts/posts-model.js');


server.get('/', (req, res) => {
  res.send(`
    <h2>Hello World</h>
  `);
});


module.exports = server // CommonJS way of exporting out of a module.

// Same as export default server