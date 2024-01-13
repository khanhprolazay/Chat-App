import '@fontsource/inter';
import '@fontsource/quicksand';
import '@fontsource/poppins';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import { Route, Routes } from 'react-router-dom';

function App() {

	return (
		<Routes>
			<Route
				path='/login'
				element={<LoginPage />}
			/>
			<Route
				path='/'
				element={<MainPage />}
			/>
			<Route
				path='*'
				element={<ErrorPage />} 
			/>
		</Routes>
	);
}

export default App;
