export default function middleware(request: Request) {
	const userAgent = request.headers.get('user-agent') || '';

	if (userAgent.toLowerCase().includes('curl')) {
		return new Response('Hello, World!\n', {
			status: 200,
			headers: {
				'content-type': 'text/plain'
			}
		});
	}

	return new Response(null, {
		headers: { 'x-middleware-next': '1' }
	});
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
