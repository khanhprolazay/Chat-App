import 'css/Activity.css';
import Header from './header';
import Stories from './stories';
import Profiles from './profile';
import Files from './files';
import React from 'react';

function Activity(props) {
	return (
		<div className='mainpage-activity-container'>
			<Header />
			<div>
        <Stories />
        <Profiles />
        <Files />
      </div>
		</div>
	);
}

export default React.memo(Activity, (pre, nex) => {
	return pre.socket.id !== nex.socket.id;
});
