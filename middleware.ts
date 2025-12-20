export default function middleware(request: Request) {
	const userAgent = request.headers.get('user-agent') || '';
	const url = new URL(request.url);

	if (userAgent.toLowerCase().includes('curl')) {
		const white = '\x1b[38;2;255;255;255m';
		const darkWhite = '\x1b[38;2;220;220;220m';
		const lightGray = '\x1b[38;2;160;160;160m';
		const darkGray = '\x1b[38;2;64;64;64m';
		const green = '\x1b[38;2;80;250;123m';
		const orange = '\x1b[38;2;255;184;108m';
		const bold = '\x1b[1m';
		const reset = '\x1b[0m';

		const title = (text: string): string => `${bold}${white}${text}${reset}`;
		const highlight = (text: string): string => `${white}${text}${lightGray}`;

		const projects = [
			{
				name: 'Xylia',
				desc: 'Hobby programming language written in C',
				url: 'https://github.com/vh8t/xylia',
				tags: ['C', 'Interpreter']
			},
			{
				name: 'TMax',
				desc: 'A declarative and composable tmux wrapper',
				url: 'https://github.com/vh8t/tmax',
				tags: ['Bash', 'CLI']
			},
			{
				name: 'Spotlight++',
				desc: 'Keyboard-driven application launcher',
				url: 'https://github.com/vh8t/spotlightpp',
				tags: ['C++', 'Linux']
			},
			{
				name: 'Klotski',
				desc: 'Web based game of klotski',
				url: 'https://vh8t.xyz/klotski',
				tags: ['Web']
			},
			{
				name: 'Notes',
				desc: 'Simple web based note taking app',
				url: 'https://vh8t.xyz/notes',
				tags: ['Web']
			}
		];

		const getLegend = () => `
  ${darkWhite}USAGE: ${lightGray}curl -L vh8t.xyz${white}/[route]${reset}

  ${darkWhite}ROUTES:${reset}
    ${white}/ ${darkGray}.......... ${lightGray}Home (Profile & About)${reset}
    ${white}/projects ${darkGray}.. ${lightGray}Portfolio of systems & web work${reset}
    ${white}/contact ${darkGray}... ${lightGray}Social links${reset}
`;

		if (url.pathname === '/') {
			const homePage = `
    ${darkGray}╭────────────────────────────────────────────────────────────────────╮${reset}
    ${darkGray}│${lightGray}                                                                    ${darkGray}│${reset}
    ${darkGray}│${lightGray}      ${highlight(',────,')}        ${title('Samuel Golis')}                                    ${darkGray}│${reset}
    ${darkGray}│${lightGray}     ${highlight('╱      ╲')}       Focusing on ${highlight('C and C++')}, low-level programming,   ${darkGray}│${reset}
    ${darkGray}│${lightGray}     ${highlight('▏  Λʌ  ▕')}       and performance-oriented systems.               ${darkGray}│${reset}
    ${darkGray}│${lightGray}     ${highlight('╲      ╱')}                                                       ${darkGray}│${reset}
    ${darkGray}│${lightGray}      ${highlight("'────'")}        ${title('[ vh8t.xyz/projects ]')}                           ${darkGray}│${reset}
    ${darkGray}│${lightGray}                                                                    ${darkGray}│${reset}
    ${darkGray}│${lightGray}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ${darkGray}│${reset}
    ${darkGray}│${lightGray}                                                                    ${darkGray}│${reset}
    ${darkGray}│${lightGray}   ${title('About')}                                                            ${darkGray}│${reset}
    ${darkGray}│${lightGray}   I am a ${highlight('student')} specializing in ${highlight('systems programming')}. I enjoy      ${darkGray}│${reset}
    ${darkGray}│${lightGray}   writing clean, ${highlight('efficient code')} primarily in ${highlight('C/C++')}, with a focus   ${darkGray}│${reset}
    ${darkGray}│${lightGray}   on low-level architecture and performance. I also utilize ${highlight('Go')}     ${darkGray}│${reset}
    ${darkGray}│${lightGray}   for tooling.                                                     ${darkGray}│${reset}
    ${darkGray}│${lightGray}                                                                    ${darkGray}│${reset}
    ${darkGray}╰────────────────────────────────────────────────────────────────────╯${reset}
`;

			return new Response(homePage + getLegend(), {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		} else if (url.pathname === '/projects') {
			let projectBody = '';
			projects.forEach((p, i) => {
				const id = `[0${i + 1}]`;
				const tags = p.tags.map((t) => `[${white}${t}${darkGray}]`).join(' ');
				const rawTagsLen =
					p.tags.reduce((acc: number, curr: string): number => acc + curr.length + 3, 0) - 1;

				projectBody += `    ${darkGray}│  ${white}${id} ${title(p.name)} ${darkGray}${'.'.repeat(14 - p.name.length)} ${lightGray}${p.desc.padEnd(42, ' ')}   ${darkGray}│${reset}\n`;
				projectBody += `    ${darkGray}│       ${darkGray}╷               ${darkWhite}URL: ${lightGray}${p.url.padEnd(37, ' ')}   ${darkGray}│${reset}\n`;
				projectBody += `    ${darkGray}│       ${darkGray}└───> ${tags}${' '.repeat(52 - rawTagsLen)}   ${darkGray}│${reset}\n`;
				projectBody += `    ${darkGray}│                                                                    │${reset}\n`;
			});

			const projectPage = `
    ${darkGray}╭────────────────────────────────────────────────────────────────────╮${reset}
    ${darkGray}│                                                                    │${reset}
    ${darkGray}│   ${title('Projects')}                                                         ${darkGray}│${reset}
    ${darkGray}│${lightGray}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ${darkGray}│${reset}
    ${darkGray}│                                                                    │${reset}
${projectBody}    ${darkGray}╰────────────────────────────────────────────────────────────────────╯${reset}
`;

			return new Response(projectPage + getLegend(), {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		} else if (url.pathname === '/contact') {
			const contactPage = `
    ${darkGray}╭────────────────────────────────────────────────────────────────────╮${reset}
    ${darkGray}│                                                                    │${reset}
    ${darkGray}│   ${title('Contact & Socials')}                                                ${darkGray}│${reset}
    ${darkGray}│${lightGray}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ${darkGray}│${reset}
    ${darkGray}│                                                                    │${reset}
    ${darkGray}│   ${white}GitHub ${darkGray}........ ${lightGray}github.com/vh8t                                  ${darkGray}│${reset}
    ${darkGray}│   ${white}LinkedIn ${darkGray}...... ${lightGray}linkedin.com/in/samuelgolis                      ${darkGray}│${reset}
    ${darkGray}│   ${white}Instagram ${darkGray}..... ${lightGray}instagram.com/golis.sam                          ${darkGray}│${reset}
    ${darkGray}│                                                                    │${reset}
    ${darkGray}╰────────────────────────────────────────────────────────────────────╯${reset}
`;

			return new Response(contactPage + getLegend(), {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		} else if (url.pathname === '/man') {
			const manPage = `
${bold}${white}SAMUEL(1)                     User Commands                     SAMUEL(1)${reset}

${bold}${white}NAME${reset}
     samuel - systems programmer and C++ enthusiast

${bold}${white}SYNOPSIS${reset}
     ${bold}${white}samuel${reset} [--level=${highlight('low')}${reset} [--language=${highlight('cpp|c|go')}]

${bold}${white}DESCRIPTION${reset}
     A student specializing in high-performance systems and clean 
     architecture. Known for avoiding garbage collection where possible.

${bold}${white}AUTHORS${reset}
     Written by Samuel Golis.
`;

			return new Response(manPage, {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		} else if (url.pathname === '/neofetch') {
			const neofetchPage = `
${white}              ${title('samuel@vh8t')}
${white}    ,────,    ${darkGray}--------------${reset}
${white}   ╱      ╲   ${white}OS: ${lightGray}Arch Linux${reset}
${white}   ▏  Λʌ  ▕   ${white}Kernel: ${lightGray}C++23 / C11${reset}
${white}   ╲      ╱   ${white}Shell: ${lightGray}zsh${reset}
${white}    '────'    ${white}Editor: ${lightGray}Neovim${reset}
${white}              ${white}Uptime: ${lightGray}18 years${reset}
`;

			return new Response(neofetchPage, {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		} else if (url.pathname === '/panic') {
			const panicPage = `
${bold}${white}[    0.000000] Linux version 6.x.x-vh8t (gcc version 13.2.1)${reset}
${bold}${white}[    0.000001] Command line: root=/dev/sda1 init=/sbin/samuel_init${reset}
${bold}${white}[    0.000420] <0> ---[ end Kernel panic - not syncing: VFS: Unable to mount root fs ]---${reset}

${lightGray}Just kidding. Everything is fine.${reset}
${lightGray}Try ${highlight('curl -L vh8t.xyz')} to get back safely.${reset}
`;

			return new Response(panicPage, {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		} else if (url.pathname === '/logs') {
			const logsPage = `
${darkGray}[${green}OK  ${darkGray}] ${white}Initialized coffee_driver.sys${reset}
${darkGray}[${orange}WARN${darkGray}] ${white}Memory leak detected in social_skills.cpp${reset}
${darkGray}[${green}OK  ${darkGray}] ${white}Loaded project_xylia.so${reset}

${lightGray}Log stream paused. Press ${highlight('Ctrl+C')} to exit (or just stop curling).${reset}
`;

			return new Response(logsPage, {
				status: 200,
				headers: {
					'content-type': 'text/plain; charset=utf-8',
					'cache-control': 'no-cache'
				}
			});
		}
	}

	return new Response(null, {
		headers: { 'x-middleware-next': '1' }
	});
}

export const config = {
	matcher: ['/((?!_app|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp)).*)']
};
