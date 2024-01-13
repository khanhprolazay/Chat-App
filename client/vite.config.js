import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default () => {
	return defineConfig({
		plugins: [react()],
		server: { port: 3000 },
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
				api: path.resolve(__dirname, './src/api'),
				css: path.resolve(__dirname, './src/assets/css'),
				slices: path.resolve(__dirname, './src/redux/slices'),
				components: path.resolve(__dirname, './src/components'),
				selectors: path.resolve(__dirname, './src/redux/selectors'),
			},
		},
	});
};
