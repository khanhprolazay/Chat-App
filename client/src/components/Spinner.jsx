import 'css/Spinner.css';

function Spinner({width, height}) {
	const style = {
		width: `${width}px`,
		height: `${height}px`,
	};
	return (
		<div
			className='spinner-container'
			style={style}></div>
	);
}

export default Spinner;
