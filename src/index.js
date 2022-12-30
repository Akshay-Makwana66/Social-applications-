const {addFeed,getFeeds,updateFeed,deleteFeed} = require('./controller/controller')  //importing controller file--
const WebSocket = require('ws');   //importing websocket--

// Set up a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Set up an event to handle new WebSocket connections
wss.on('connection', (ws) => {
  console.log('New WebSocket connection');

  // Set up an event to handle messages from the client
  ws.on('message',async (message) => {
    console.log(`Received message: ${message}`);

    // Parse the message to determine the type of event   
    const data = JSON.parse(message);
    if (data.type === 'getTodayFeeds') {
      // Get all feeds posted today
      const feeds = await getFeeds();
     
      // Send the feeds back to the client over the WebSocket connection
      ws.send(JSON.stringify({ type: 'todayFeeds', feeds:feeds.rows})); 
    } else if (data.type === 'addFeed') {
      // Add the new feed to the collection   
      await addFeed(data.feed);    
      // Send a confirmation back to the client over the WebSocket connection
      ws.send(JSON.stringify({ type: 'feedAdded' }));
    } else if (data.type === 'editFeed') {    
      // Update the feed in the collection
      await updateFeed(data.feed);
      // Send a confirmation back to the client over the WebSocket connection
      ws.send(JSON.stringify({ type: 'feedEdited' }));
    } else if (data.type === 'deleteFeed') {        
      // Delete the feed from the collection
      await deleteFeed(data.feed);     
      // Send a confirmation back to the client over the WebSocket connection
      ws.send(JSON.stringify({ type: 'feedDeleted' }));   
    }        
  });   
});   

  

