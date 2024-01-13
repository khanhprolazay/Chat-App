const createKeyspaces = [
	`CREATE KEYSPACE IF NOT EXISTS service_1 WITH REPLICATION = {'class': 'SimpleStrategy','replication_factor' : 2}`,
];

const createChatTables = [
	// Create user table
	`CREATE TABLE IF NOT EXISTS service_1.users (
    uid uuid,
    username text,
    password text,
    display_name text,
    avatar_image_id uuid,
    phone text,
    is_active boolean,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (uid)
  )`,

	// Create conversation table
	`CREATE TABLE IF NOT EXISTS service_1.conversations (
    cid uuid,
    type text,
    title text,
    creator_id uuid,
    lasted_message_content text,
    lasted_message_time timestamp,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (cid)
  )`,


	// Create participant table
	`CREATE TABLE IF NOT EXISTS service_1.participants (
    conversation_id uuid,
    user_id uuid,
    type text,
    created_at timestamp,
    updated_at timestamp,
    PRIMARY KEY (conversation_id, user_id)
  )`,

	// Create friends table and index
	`CREATE TABLE IF NOT EXISTS service_1.invitations (
    sender_id uuid,
    receiver_id uuid,
    PRIMARY KEY (sender_id, receiver_id)
  )`,

  `CREATE TABLE IF NOT EXISTS service_1.friends (
    user_1 uuid,
    user_2 uuid,
    cid uuid,
    is_checked boolean,
    PRIMARY KEY (user_1, user_2)
  )`,
];

const createChatTableIndexes = [
	'CREATE INDEX IF NOT EXISTS username_index ON service_1.users(username)',
	'CREATE INDEX IF NOT EXISTS uid_index ON service_1.participants(user_id)',
	`CREATE INDEX IF NOT EXISTS receiver_idx ON service_1.invitations (receiver_id)`,
  `CREATE INDEX IF NOT EXISTS createtor_idx on service_1.conversations (creator_id)`,
];

const createUserMappingTable = `CREATE TABLE IF NOT EXISTS service_1.mapping (
  uid uuid,
  socket_id text, 
  PRIMARY KEY (uid)
)`;


module.exports = {
	createKeyspaces,
	createChatTables,
	createChatTableIndexes,
	createUserMappingTable,
};
