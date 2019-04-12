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
  return db('actions');
}

function findById(id) {
  return db('actions').where({ id: Number(id) });
}

function insert(action) {
  return db('actions')
    .insert(action)
    .then(ids => ({ id: ids[0] }));
}

function update(id, action) {
  return db('actions')
    .where('id', Number(id))
    .update(action);
}

function remove(id) {
  return db('actions')
    .where('id', Number(id))
    .del();
}
