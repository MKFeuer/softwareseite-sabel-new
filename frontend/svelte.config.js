import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: true,
			strict: true
		}),
		paths: {
			//base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
			//base: '/t3a-kontakte'
		}
	}
};