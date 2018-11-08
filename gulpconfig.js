/*
gulpファイルで使用する変数やオプションを指定します。
 */
module.exports = {
	server: {
		proxy: 'wordpresstemplate.lo',
		https: 'true',
		port: 3000
	},
	source: {
		css: 'src/sass/**/*.scss',
		js: 'src/js/**/*',
		img: 'src/img/**/*'
	},
	build: {
		css: './',
		js: 'assets/img/',
		img: 'assets/img/'
	},
	script: {
		// まとめたいファイルをまとめたい順番に指定していく。
		// 指定していないファイルはminified.jsに圧縮されない。
		concat: [
			'src/js/hiraku.js',
			'src/js/hiraku-custom.js',
			'src/js/slick.js',
			'src/js/slick-custom.js'
		]
	},
	styles: {
		prefix: [
			'last 2 versions',
			'ie 10',
			'ie 9',
			'iOS >= 7',
			'Android >= 4.2'
		],
		features: {
			customProperties: true,
			calc: true,
			customMedia: true,
			mediaQueriesRange: false
		}
	},
	watch: {
		// watchするファイルを指定する。
		code: [
			'./**/*.{php,yml,txt}',
			'gulpfile.js',
			'gulpconfig.js',
		]
	}
}
