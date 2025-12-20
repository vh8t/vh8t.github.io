export default function middleware(request: Request) {
	const userAgent = request.headers.get('user-agent') || '';

	if (userAgent.toLowerCase().includes('curl')) {
		const white = '\x1b[38;2;255;255;255m';
		const light_gray = '\x1b[38;2;160;160;160m';
		const dark_gray = '\x1b[38;2;64;64;64m';
		const bold = '\x1b[1m';
		const reset = '\x1b[0m';

		const title = (text: string): string => `${bold}${white}${text}${reset}`;
		const highlight = (text: string): string => `${white}${text}${light_gray}`;

		const asciiArt = `
    ${dark_gray}╭────────────────────────────────────────────────────────────────────╮${reset}
    ${dark_gray}│${light_gray}                                                                    ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}      ${highlight(',────,')}        ${title('Samuel Golis')}                                    ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}     ${highlight('╱      ╲')}       Focusing on ${highlight('C and C++')}, low-level programming,   ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}     ${highlight('▏  Λʌ  ▕')}       and performance-oriented systems.               ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}     ${highlight('╲      ╱')}                                                       ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}      ${highlight("'────'")}        ${title('[ vh8t.xyz/projects ]')}                           ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}                                                                    ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}                                                                    ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}   ${title('About')}                                                            ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}   I am a ${highlight('student')} specializing in ${highlight('systems programming')}. I enjoy      ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}   writing clean, ${highlight('efficient code')} primarily in ${highlight('C/C++')}, with a focus   ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}   on low-level architecture and performance. I also utilize ${highlight('Go')}     ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}   for tooling.                                                     ${dark_gray}│${reset}
    ${dark_gray}│${light_gray}                                                                    ${dark_gray}│${reset}
    ${dark_gray}╰────────────────────────────────────────────────────────────────────╯${reset}
`;

		return new Response(asciiArt, {
			status: 200,
			headers: {
				'content-type': 'text/plain; charset=utf-8',
				'cache-control': 'no-cache'
			}
		});
	}

	return new Response(null, {
		headers: { 'x-middleware-next': '1' }
	});
}

export const config = {
	matcher: ['/((?!_app|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)).*)']
};
