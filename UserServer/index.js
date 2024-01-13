require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const cassandraClient = require('./config/cassandra');
const queries = require('./queries');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

const AuthRouter = require('./routes/auth.routes.js');
const UserRouter = require('./routes/user.routes.js');
const MappingRouter = require('./routes/mapping.routes');
const ConversationRouter = require('./routes/conversation.routes.js');
const ParticipantRouter = require('./routes/participant.routes.js');

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);
app.use('/mapping', MappingRouter);
app.use('/conversation', ConversationRouter);
app.use('/participant', ParticipantRouter);

const server = http.createServer(app);
cassandraClient
	.connect()
	.then(async () => {
		await Promise.all(queries.createKeyspaces.map(query => cassandraClient.execute(query)));
		await Promise.all(queries.createChatTables.map(query => cassandraClient.execute(query)));
		await Promise.all(queries.createChatTableIndexes.map(query => cassandraClient.execute(query)));
	})
	.then(async () => {
		await cassandraClient.execute(queries.createUserMappingTable);
	})
	.then(() => {
			server.listen(5001, () => {
				console.log('User server is running on port 5001');
		});
	})
	.catch((err) => console.log(err));
