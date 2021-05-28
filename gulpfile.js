//---------------------------------------------------------------------------
// ファイル読み込み
//---------------------------------------------------------------------------
gulp = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $ = gulpLoadPlugins(),
  // Configファイルを読みます。
  config = require('./gulpconfig'),
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
  cssnext = require('postcss-cssnext'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence'),
  template = require('gulp-template'),
  stylelint = require('stylelint'),
  syntax_scss = require('postcss-scss'),
  reporter = require('postcss-reporter'),
  sourcemaps = require('gulp-sourcemaps'),
  changed = require("gulp-changed"),
  babel = require('gulp-babel');


//---------------------------------------------------------------------------
// CSS
//---------------------------------------------------------------------------
// style lint

gulp.task('lint:styles', function () {

  return gulp.src(config.source.css, {since: gulp.lastRun('lint:styles')})
  .pipe(postcss([
    stylelint(),
    reporter({clearMessages: true})
  ], {syntax: syntax_scss}));
});

// make styles
gulp.task('make:styles', function () {
  processors = [
    cssnext({
      browsers: config.styles.prefix,
      features: config.styles.features,
    }),
  ];
  return gulp
  .src(config.source.css)
  .pipe(
    $.plumber({
      errorHandler: function (err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    })
  )
  .pipe(sass())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss(processors))
  .pipe($.cssmin())
  .pipe(gulp.dest(config.build.css))
  .pipe(browserSync.stream());
});

gulp.task('styles', gulp.series(
  'lint:styles',
  'make:styles'
));


//---------------------------------------------------------------------------
// SCRIPT
//---------------------------------------------------------------------------

// scriptを一つにまとめるタスク。
gulp.task('concat', function () {
  return gulp
  .src(config.script.concat)
  .pipe($.plumber())
  .pipe(babel(
    {
      presets: ['@babel/env']
    }
  ))
  .pipe($.concat(config.script.filename))
  .pipe($.uglify())
  .pipe(
    $.rename({
      extname: '.min.js'
    })
  )
  .pipe(gulp.dest(config.build.js));
});

// 全jsファイルを圧縮するタスク
gulp.task('uglify', function () {
  return (eachscript = gulp
  .src(config.source.js)
  .pipe($.plumber())
  .pipe($.uglify())
  .pipe(
    $.rename({
      extname: '.min.js'
    })
  )
  .pipe(gulp.dest(config.build.js)));
});

gulp.task('script', gulp.parallel('concat', 'uglify'));

//---------------------------------------------------------------------------
// 画像圧縮
//---------------------------------------------------------------------------

gulp.task('image-opt', function () {
  return gulp.src(config.source.img)
  .pipe($.plumber())
  .pipe(changed(config.build.img))
  .pipe(
    $.image({
      pngquant: true,
      optipng: true,
      zopflipng: false,
      advpng: true,
      jpegRecompress: false,
      jpegoptim: false,
      mozjpeg: true,
      gifsicle: true,
      svgo: false,
      concurrent: 10
    })
  )
  .pipe(gulp.dest(config.build.img));
});

gulp.task('svgmin', function () {
  return gulp
  .src(config.source.img + '**/*.svg')
  .pipe($.svgmin())
  .pipe(gulp.dest(config.build.img));
});

gulp.task('image', gulp.series(gulp.parallel('image-opt', 'svgmin')));

//---------------------------------------------------------------------------
// BROWSER SYNC
//---------------------------------------------------------------------------

gulp.task('server', function () {
  return browserSync.init(
    config.server
  );
});

//---------------------------------------------------------------------------
// Watch
//---------------------------------------------------------------------------

gulp.task('watch:styles', function () {
  gulp.watch(
    config.source.css,
    gulp.series('styles')
  );
});

gulp.task('watch:scripts', function () {
  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload (done) {
    browserSync.reload();
    done();
  }

  gulp.watch(
    config.source.js,
    gulp.series('script', reload)
  );
});

gulp.task('watch:code', function () {

  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload (done) {
    browserSync.reload();
    done();
  }

  gulp.watch(config.watch.code, gulp.series(reload));
});


gulp.task('watch:images', function () {

  // https://github.com/BrowserSync/browser-sync/issues/711
  function reload (done) {
    browserSync.reload();
    done();
  }

  gulp.watch(
    config.source.img,
    gulp.series('image', reload)
  );
});


gulp.task('watch', gulp.parallel(
  'watch:styles',
  'watch:scripts',
  'watch:code',
  'watch:images'
));

//---------------------------------------------------------------------------
// Tasks
//---------------------------------------------------------------------------
// default

gulp.task('default', gulp.series(gulp.parallel('server', 'watch')));
