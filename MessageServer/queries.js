const createKeyspaces = [
	`CREATE KEYSPACE IF NOT EXISTS service_2 WITH REPLICATION = {'class': 'SimpleStrategy','replication_factor' : 2}`,
];

const createChatTables = [
	// Create message table
	`CREATE TABLE IF NOT EXISTS service_2.messages (
    mid uuid,
    content text,
    image_id uuid,
    sender_id uuid,
    created_at timestamp,
    conversation_id uuid,
    PRIMARY KEY (mid)
  )`,

];

const createChatTableIndexes = [
  'CREATE INDEX IF NOT EXISTS message_index ON service_2.messages(conversation_id)',
  ];


module.exports = {
	createKeyspaces,
	createChatTables,
	createChatTableIndexes,
};
