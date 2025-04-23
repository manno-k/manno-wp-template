/*
gulpファイルで使用する変数やオプションを指定します。
 */
export default {
	server: {
		proxy: 'wptemplate.lo',
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
		css: './assets/css/',
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
      'node_modules/iscroll/build/iscroll.js',
      'node_modules/jquery-drawer/dist/js/drawer.js',
      'src/js/drawer-init.js',
			// スライダー
			'node_modules/slick-carousel/slick/slick.js',
			'src/js/slick-init.js',
			// smooth scroll
			'src/js/smoothscroll.js',
			// object-fit polyfill
			'src/js/ofi.js',
			'src/js/ofi-init.js',
			// scroll監視プラグイン
      // https://terwanerik.github.io/ScrollTrigger/
			'src/js/ScrollTrigger.js',
			'src/js/ScrollTrigger-init.js',
      // scroll-hint
      // 'src/js/scroll-hint.js',
      // bootstrap
      'node_modules/@popperjs/core/dist/umd/popper.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',

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
