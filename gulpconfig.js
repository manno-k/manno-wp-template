/*
gulpファイルで使用する変数やオプションを指定します。
 */
module.exports = {
	server: {
		proxy: 'wordpresstemplate.lo',
		https: false,
		port: 3000,
    open: 'external'
  },
	source: {
		css: 'src/sass/**/*.scss',
		js: 'src/js/**/*',
		img: 'src/img/**/*'
	},
	build: {
		css: './',
		js: 'assets/js/',
		img: 'assets/img/'
	},
	script: {
		// 圧縮時のファイル名
		filename:'minified.js',
		// まとめたいファイルをまとめたい順番に指定していく。
		// 指定していないファイルはminified.jsに圧縮されない。
		concat: [
			// ハンバーガーメニュー
			'src/js/hiraku.js',
			'src/js/hiraku-init.js',
			// スライダー
			'src/js/slick.js',
			'src/js/slick-init.js',
			// smooth scroll
			'src/js/smoothscroll.js',
			// object-fit polyfill
			'src/js/ofi.js',
			'src/js/ofi-init.js',
			// scroll監視プラグイン
			// 'src/js/ScrollTrigger.js',
			// 'src/js/ScrollTrigger-init.js',
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
