var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var plumber = require("gulp-plumber");
var image = require('gulp-image');
var combineMq = require('gulp-combine-mq');
var runSequence = require('run-sequence');
var streamqueue = require('streamqueue');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var flexibility = require('postcss-flexibility');
var sourcemaps =require('gulp-sourcemaps');


// JSファイルを圧縮
gulp.task('uglify', function () {
    var eachscript = gulp.src('src/js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('js'));
});

// JSファイルをひとまとめに
gulp.task("concat", function () {
    var files = [
      // JSファイル名を指定
        'js/myjs.js',
    ]
    return gulp.src(files)
        .pipe(plumber())
        .pipe(concat("minified.js"))
        .pipe(gulp.dest("./js"));
});

// sassコンパイル

gulp.task('scss', function () {
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
    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        // js-flexの付与
        //  .pipe(postcss([flexibility]))
        .pipe(gulp.dest('./'))
});

// メディアクエリを最適化
gulp.task('combineMq', function () {
    return gulp.src('./style.css')
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(gulp.dest('./'));
});

// // js-flexの付与
// gulp.task('css', function() {
//   return gulp.src('./style.css')
//     .pipe(postcss([flexibility]))
//     .pipe(gulp.dest('./'));
// });

// cssの圧縮
gulp.task('cssmin', function () {
    gulp.src('./style.css')
        .pipe(cssmin())
        .pipe(gulp.dest('./'));
});
// 画像を圧縮

gulp.task('image', function () {
    return runSequence(
        'image-opt',
        'svgmin'
    );
});
gulp.task('image-opt', function () {
    return gulp.src('src/img/**/*')
        .pipe(plumber())
        .pipe(image({
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
        .pipe(gulp.dest('img/'));
});

gulp.task('svgmin', function () {
    gulp.src('src/img/**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('./img/'));
});

// sourcemapを作成
gulp.task('sourcemap', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('/'));
});


// ブラウザをリロード
gulp.task('browser-sync', function () {
    browserSync({
        proxy: "wocker.dev"
    });

});
gulp.task('bs-reload', function () {
    return browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch("./**/*.html", ['bs-reload']);
    gulp.watch("./**/*.php", ['bs-reload']);
    gulp.watch("src/sass/**/*.scss", function () {
        return runSequence(
            'scss',
            'combineMq',
            'cssmin',
            'sourcemap',
            'bs-reload'
        );
    });
    gulp.watch("src/js/**/*.js", function () {
        return runSequence(
            'uglify',
            'concat',
            'bs-reload'
        );
    });
});
