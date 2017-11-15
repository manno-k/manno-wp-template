/*
 Destinations
 */

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
var sourcemaps = require('gulp-sourcemaps');
var sassLint = require('gulp-sass-lint');

/*
 File Destinations
 */

var path = {
    'root': './',
    // images
    'imageDest': 'assets/img/',
    'imagePath': 'src/img/',
    // JS
    'jsDest': 'assets/js/',
    'jsPath': 'src/js/',
    'jsConcat': ['' , ''],
    // Sass
    'sassPass': 'src/sass/',
    // Css
    'cssDest': './',
    // browser sync
    'host': '',
    'https': true,
}

var sassLintConf = {
    configFile: '.sass-lint.yml'
};

/*
 Js Tasks
 */

gulp.task('uglify', function () {
    var eachscript = gulp.src(path.jsPath + '**/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(path.jsDest));
});

gulp.task("concat", function () {
    return gulp.src(path.jsConcat)
        .pipe(plumber())
        .pipe(concat("minified.js"))
        .pipe(gulp.dest(path.jsDest));
});

/*
 Sass Tasks
 */

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
    return gulp.src(path.sassPass + '**/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err.messageFormatted);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        // テーマフォルダのルートにsourcemapを生成する
        .pipe(sourcemaps.write(path.root))
        .pipe(gulp.dest(path.root))
});


// メディアクエリを最適化
gulp.task('combineMq', function () {
    return gulp.src('./style.scss')
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(gulp.dest(path.root));
});


// cssの圧縮
gulp.task('cssmin', function () {
    gulp.src('./style.scss')
        .pipe(cssmin())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(path.root));
});

/*
 Image Tasks
 */

gulp.task('image', function () {
    return runSequence(
        'image-opt',
        'svgmin'
    );
});
gulp.task('image-opt', function () {
    return gulp.src(path.imagePath + '**/*')
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
        .pipe(gulp.dest(path.imageDest));
});

gulp.task('svgmin', function () {
    gulp.src(path.imagePath + '**/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest(path.imageDest));
});

/*
 Browser Sync Tasks
 */

gulp.task('browser-sync', function () {
    browserSync({
        proxy: path.host,
        https: path.https
    });
});
gulp.task('bs-reload', function () {
    return browserSync.reload();
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(path.root + "**/*.html", ['bs-reload']);
    gulp.watch(path.root + "**/*.php", ['bs-reload']);
    gulp.watch(path.sassPass + "**/*.scss", function () {
        return runSequence(
            'scss',
            'combineMq',
            'cssmin',
            'bs-reload'
        );
    });
    gulp.watch(path.jsPath + "**/*.js", function () {
        return runSequence(
            'uglify',
            'concat',
            'bs-reload'
        );
    });
});


//---------------------------------------------------------------------------
// Test Tasks
//---------------------------------------------------------------------------

gulp.task('test-sass', function () {
    return gulp.src([path.sassPass + '**/*.scss', '!' + path.sassPass + 'style.scss', "!" + path.sassPass + 'foundation/bootstrap/**/*.scss', "!" + path.sassPass + 'foundation/fontawesome/**/*.scss'])
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});
