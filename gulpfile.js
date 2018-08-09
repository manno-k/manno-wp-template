/*
 Destinations
 */

var gulp = require('gulp'),
	gulpLoadPlugins = require('gulp-load-plugins'),
	$ = gulpLoadPlugins();

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var template = require('gulp-template');

/*
 File Destinations
 */

var path = {
	'root': './',
	// images
	'imageDest': 'assets/img/',
	'imagePath': 'src/img/**/*',
	// SVG
	'svgPath': 'assets/img/svgSprite/*.svg',
	'svgDest': 'assets/svg/',
	'svgSymbolsDoc': 'doc/svg/',
	'svgTemplateFile': 'src/template.html',
	// JS
	'jsDest': 'assets/js/',
	'concatDest': 'src/js/',
	'jsPath': 'src/js/**/*.js',
	// Sass
	'sassPass': 'src/sass/**/*.scss',
	'sassIgnore': '!src/sass/',
	// Css
	'cssDest': './',
	//Souce map
	'souceMapDest': './',
	// browser sync
	// .localでは遅くなるため注意
	'host': 'wordpresstemplate.lo',
	'https': true,
}

/*
 Js Tasks
 */


gulp.task("concat", function () {
	return gulp.src([
		'src/js/test.js'
	])
	.pipe($.plumber())
	.pipe($.concat("minified.js"))
	.pipe($.uglify())
	.pipe(
		$.rename({
			extname: ".min.js"
		})
	)
	.pipe(gulp.dest(path.jsDest));
});

gulp.task('uglify', function () {
	return eachscript = gulp
	.src(path.jsPath)
	.pipe($.plumber())
	.pipe($.uglify())
	.pipe(
		$.rename({
			extname: ".min.js"
		})
	)
	.pipe(gulp.dest(path.jsDest))
});
gulp.task("script", gulp.parallel("concat", "uglify"));

/*
 Sass Tasks
 */

gulp.task('style', function () {

	var processors = [
		cssnext({
			browsers: ['last 2 versions', 'ie 10', 'ie 9', 'iOS >= 7', 'Android >= 4.2'],
			features: {
				customProperties: true,
				calc: true,
				customMedia: true,
				mediaQueriesRange: false
			}
		})
	];
	return gulp.src(path.sassPass,{ sourcemaps: true })
	.pipe($.plumber({
		errorHandler: function (err) {
			console.log(err.messageFormatted);
			this.emit('end');
		}
	}))
	.pipe(sass())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss(processors))
	.pipe($.cssmin())
	.pipe(gulp.dest(path.cssDest))
	.pipe(browserSync.stream());
});

/*
 Image Tasks
 */

gulp.task('image-opt', function () {
	return gulp.src(path.imagePath)
	.pipe($.plumber())
	.pipe($.image({
		pngquant: true,
		optipng: true,
		zopflipng: true,
		advpng: true,
		jpegRecompress: false,
		jpegoptim: false,
		mozjpeg: true,
		gifsicle: true,
		svgo: false,
		concurrent: 10,
	}))
	.pipe(gulp.dest(path.imageDest));
});


gulp.task('svgmin', function () {
	return gulp.src(path.imagePath + '**/*.svg')
	.pipe($.svgmin())
	.pipe(gulp.dest(path.imageDest));
});

/*
SVG Sprite Tasks
 */


gulp.task('svgSprite', function () {
	return gulp.src(path.svgPath)
	.pipe($.svgstore({inlineSvg: true}))
	.pipe($.cheerio(function ($) {
		$('svg').attr({
			style: 'position: absolute; width: 0; height: 0;',
			width: 0,
			height: 0
		});
		$('svg').addClass('hide');
		var symbols = $('svg > symbol').map(function () {
			return {
				id: $(this).attr('id'),
			};
		}).get();
		gulp.src(path.svgTemplateFile)
		.pipe(template({
			inlineSvg: $('svg'),
			symbols: symbols
		}))
		.pipe(gulp.dest(path.svgSymbolsDoc));
	}))
	.pipe(gulp.dest(path.svgDest));
});

/*
 Browser Sync Tasks
 */

gulp.task("browser-sync", function () {
	return browserSync({
		proxy: path.host,
		https: path.https,
		port: 3000
	});
});


//---------------------------------------------------------------------------
// Watch
//---------------------------------------------------------------------------

gulp.task('watch', function () {
	gulp.watch(path.root + "**/*.html").on('change', browserSync.reload);
	gulp.watch(path.root + "**/*.php").on('change', browserSync.reload);
	gulp.watch(path.jsPath, gulp.series('script'));
	gulp.watch(path.jsDest).on('change', browserSync.reload);
	gulp.watch(path.sassPass, gulp.series('style'));
});

//---------------------------------------------------------------------------
// Tasks
//---------------------------------------------------------------------------
// default

gulp.task("default", gulp.series(gulp.parallel("browser-sync", "watch")));

// image

gulp.task("image", gulp.series(gulp.parallel("image-opt", "svgmin", "svgSprite")));
