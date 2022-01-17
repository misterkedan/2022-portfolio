const CyberSettings = {

	name: 'Cyber',

	background: {
		color1: '#5200a3',
		color2: '#004094',
	},

	depth: 50,

	floor: {
		opacity: 0.2,
		colorFar: '#1fc7ff',
		colorNear: '#0084ff',

		tile: {
			width: 1.2,
			height: 0.05,
			depth: 1.2,

			columns: 100,
			margin: 0.1,
		},

		elevation: - 2,
	},

	particle: {
		color: '#24b6ff',
		opacity: 0.15,
		size: 0.05,
		count: 5000,

		bounds: {
			x: 50,
			y: 10,
		},

		noiseScale: 0.4,
		variance: 1.4,
	},

	speed: {
		value: 0.005,
	},

	bloom: {
		strength: 0.2,
		radius: 1,
		threshold: 0.2,
	},

	random: true,

};

export { CyberSettings };
