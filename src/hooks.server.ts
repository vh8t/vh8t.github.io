import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userAgent = event.request.headers.get('user-agen') || '';

	if (userAgent.toLowerCase().includes('curl')) {
		return new Response('Hello, World!', {
			headers: { 'content-type': 'text/plain' }
		});
	}

	const response = await resolve(event);
	return response;
};
