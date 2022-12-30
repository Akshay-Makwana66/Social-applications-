const client = require("../db");   //importing db.js file

// Adding api---
const addFeed = async (data) => {
  if (
    !data.id ||
    !data.title ||
    !data.description ||
    !data.image ||
    !data.author
  ) {
    return { error: "Invalid request data" };
  }
    // adding feeds query--
  let addingFeeds = await client.query(
    `INSERT INTO feeds(id,title,description,image,author) VALUES(${data.id},'${data.title}','${data.description}','${data.image}','${data.author}')`
);   
  return addingFeeds;
};

// Get Api ---
const getFeeds = async () => {
    // getting list of all feeds query--
  let gettingFeeds = await client.query(`SELECT * FROM feeds`);
  return gettingFeeds;
};

// Update Api ---
const updateFeed = async (data) => {
  let updateId = data.id;      //storing id--

//   update feeds query--
  let updatingFeeds =
    await client.query(`UPDATE feeds SET title = '${data.title}',description='${data.description}',
         image='${data.image}',author='${data.author}'  WHERE id = ${updateId}`);
  return updatingFeeds;
};

// Delete Api ---
const deleteFeed = async (data) => {
  let feedId = data.id;  //stroing id--

//   delete feeds query--
  let deletingFeeds = await client.query(
    `DELETE FROM feeds WHERE id = ${feedId}`
  );
  return deletingFeeds;
};

module.exports = { addFeed, getFeeds, updateFeed, deleteFeed };
