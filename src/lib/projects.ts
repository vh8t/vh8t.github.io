export interface Project {
	name: string;
	description: string;
	url: string;
	tags: string[];
}

export const projects: Project[] = [
	{
		name: 'Xylia',
		description: 'Hobby programming language written in C',
		url: 'https://github.com/vh8t/xylia',
		tags: ['C', 'Interpreter']
	},
	{
		name: 'TMax',
		description: 'A declarative and composable tmux wrapper',
		url: 'https://github.com/vh8t/tmax',
		tags: ['Bash', 'CLI']
	},
	{
		name: 'Spotlight++',
		description: 'Keyboard-driven application launcher for Linux systems',
		url: 'https://github.com/vh8t/spotlightpp',
		tags: ['C++', 'Linux']
	}
];
