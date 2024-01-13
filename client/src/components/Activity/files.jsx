import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faFolder, faTv, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";

function Files() {
	return (
		<div className='mainpage-activity-files'>
			<h3>Other files</h3>
			<div>
				<div>
					<div><FontAwesomeIcon icon={faFolder} /></div>
					<h5>Documents</h5>
				</div>
				<FontAwesomeIcon icon={faAngleRight} />
			</div>
			<div>
				<div>
					<div><FontAwesomeIcon icon={faTv} /></div>
					<h5>Channels</h5>
				</div>
				<FontAwesomeIcon icon={faAngleRight} />
			</div>
			<div>
				<div>
					<div><FontAwesomeIcon icon={faPeopleGroup} /></div>
					<h5>Groups</h5>
				</div>
				<FontAwesomeIcon icon={faAngleRight} />
			</div>
		</div>
	);
}

export default Files;
