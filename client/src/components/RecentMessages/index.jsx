import 'css/RecentMessages.css';
import Header from './header';
import Body from './body';
import React from 'react';

function RecentMessages({ socket }) {
	return (
		<div className='mainpage-recentmessages-container'>
			<Header />
			<Body socket={socket} />
		</div>
	);
}

export default React.memo(RecentMessages, (pre, nex) => {
	return pre.socket.id !== nex.socket.id;
});
