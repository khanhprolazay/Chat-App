require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const socketEvents = require('./socketEvents');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const AuthRouter = require('./routes/auth.routes.js');
const UserRouter = require('./routes/user.routes.js');
const MessageRouter = require('./routes/message.routes.js');
const ConversationRouter = require('./routes/conversation.routes.js');
// const ParticipantRouter = require('./routes/participant.routes.js')

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/message', MessageRouter);
app.use('/api/conversation', ConversationRouter);
// app.use('/api/participant', ParticipantRouter);

const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["uid"],
  }
});

socketEvents(io).then(() => {
	server.listen(5000, () => {
		console.log('Server is listen on port 5000');
	})
})
.catch(err => console.log(err)) 