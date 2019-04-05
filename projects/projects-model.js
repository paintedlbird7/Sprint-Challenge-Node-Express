// already have a projectsModel.js in the helper


const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};



function find() {
  return db('projects');
}

function findById(id) {
  return db('projects').where({ id: Number(id) });
}

function insert(project) {
  return db('projects')
    .insert(project)
    .then(ids => ({ id: ids[0] }));
}

function update(id, project) {
  return db('projects')
    .where('id', Number(id))
    .update(project);
}

function remove(id) {
  return db('projects')
    .where('id', Number(id))
    .del();
}
