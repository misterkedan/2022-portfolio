const CyberdarkSettings = {

	name: 'Cyberdark',

	background: {
		color1: '#0c0c12',
		color2: '#252a2d',
	},

	depth: 50,

	particle: {
		color: '#293033',
		opacity: 0.62,
		size: 0.1,
		length: 5,

		count: 10000,

		bounds: {
			x: 40,
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

export { CyberdarkSettings };
