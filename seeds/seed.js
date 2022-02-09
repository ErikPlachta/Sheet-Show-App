//------------------------------------------------------------------------------
//-- IMPORTS



//------------------------------------------------------------------------------
//-- Building seed database with mysql2 

async function seedDatabase () {
  require('dotenv').config(); //-- for local variable caching

  const db = require('./connection_mysql2')
  // execute in parallel, next console.log in 3 seconds
  try {
    await Promise.all([
      db.query('DROP DATABASE IF EXISTS sheet_show'),
      db.query('select sleep(2)'),
      db.query('CREATE DATABASE sheet_show'),
      // db.query('use sheet_show'),
    ]);
    
    await db.end(); //-- Close connection
    return true; //-- return true as promise
  }
  catch (err) { 
    console.log(err);
    await db.end(); //-- Close connection
    return false; //-- return true as promise
  };

}

//------------------------------------------------------------------------------
//-- Building seed tables with Sequelize based on Model data and seed JSON data
async function seedTables() {

  //-- Used to build SQL seed data, and erase anything that may exist
  const sequelize = require('./connection_sequelize');

  //-- Grab database Table models
  const { User, Toon } = require('../models');

  //-- Grab seed data to build a seed database
  const seed_Users = require('./seed_User.json');
  const seed_Toon = require('./seed_Toon.json');


  await sequelize.sync({ force: true });

  // -- Grab all users and build Table based on Model
  const users = await User.bulkCreate(seed_Users, {
    individualHooks: true,
    returning: true,
  });
  // for (const user of seed_Users) {
  //   const newUser = await User.create({
  //   ...user,
  //   });
  // }

  //-- grab all roles and build Table based on Model
  for (const toon of seed_Toon) {
    const newToon = await Toon.create({
    ...toon,
    });
  }


  //-- exit once done building seed database data
  // process.exit(0);
  
};


//------------------------------------------------------------------------------
//-- RUNNIUNG

const seed = async () => {

  seedDatabase()
    .then( results => console.log(`//-- database creation successful: ${results}`))
    .then(() => seedTables())
    .then( () => process.exit(0))
    //-- print error
    .catch(console.log)
};

//------------------------------------------------------------------------------
//-- RUNNING 

seed();

// seedDatabase();

