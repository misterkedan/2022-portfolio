const path = require( 'path' );

const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const TerserPlugin = require( 'terser-webpack-plugin' );

let config = {
	entry: [ './src/index.js', './src/index.css' ],
	output: {
		filename: 'index.js',
		path: path.resolve( __dirname, 'dist' ),
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /node_modules\/(?!(textformer|vesuna))/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
					},
				},
			}, {
				test: /\.(glsl)$/,
				exclude: /node_modules/,
				loader: 'raw-loader',
			}, {
				test: /\.css$/i,
				use: [
					//'style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader'
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin( {
			filename: 'index.css',
		} ),
	],
	resolve: {
		alias: {
			keda: path.resolve( __dirname, './src/keda' ),
		},
	},
	optimization: {
		minimize: false,
	},
};

module.exports = ( env, argv ) => {

	if ( argv.mode === 'development' ) return {
		...config,
		mode: 'development',
		devtool: 'inline-source-map',
		devServer: {
			static: {
				directory: path.resolve( __dirname, 'dist' ),
			},
			host: '192.168.1.10',
			port: 8080,
		},
	};

	return {
		...config,
		mode: 'production',
		externals: {
			'animejs': 'anime',
			'stats.js': 'Stats',
			'lil-gui': 'GUI',
			three: 'THREE',
		},
		optimization: {
			minimize: true,
			usedExports: true,
			minimizer: [ new TerserPlugin( { extractComments: false } ) ],
		},
	};

};
