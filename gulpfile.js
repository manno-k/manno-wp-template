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
var sourcemaps = require('gulp-sourcemaps');
var template = require('gulp-template');
var styleguide = require('sc5-styleguide');

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
    'jsPath': 'src/js/**/*.js',
    // Sass
    'sassPass': 'src/sass/**/*.scss',
    'sassIgnore': '!src/sass/',
    // Css
    'cssDest': './',
    //Souce map
    'souceMapDest': './',
    // Style guide
    'styleGuideDest': 'doc/styleguide/',
    'styleGuideOverview': 'doc/styleguide/styleguide.md',
    'styleGuideName': '',
    'styleGuidePort': '4000',
    // browser sync
    // .localでは遅くなるため注意
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
    var eachscript = gulp.src(path.jsPath)
        .pipe($.plumber())
        .pipe($.uglify())
        .pipe($.rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(path.jsDest));
});

gulp.task("concat", function () {
    return gulp.src([
        '',
        ''
    ])
        .pipe($.plumber())
        .pipe($.concat("minified.js"))
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
    return gulp.src(path.sassPass)
        .pipe($.plumber({
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
        .pipe(sourcemaps.write(path.souceMapDest))
        .pipe(gulp.dest(path.root))

});

// メディアクエリを最適化
gulp.task('combineMq', function () {
    return gulp.src('./style.scss')
        .pipe($.combineMq({
            beautify: false
        }))
        .pipe(gulp.dest(path.root));
});


// cssの圧縮
gulp.task('cssmin', function () {
    gulp.src('./style.scss')
        .pipe($.cssmin())
        .pipe($.rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest(path.root));
});

/*
 Style Guide Tasks
 */

gulp.task('styleguide:generate', function () {
    return gulp.src(path.sassPass)
        .pipe(styleguide.generate({
            port: path.styleGuidePort,
            title: path.styleGuideName,
            server: true,
            rootPath: path.styleGuideDest,
            overviewPath: path.styleGuideOverview,
        }))
        .pipe(gulp.dest(path.styleGuideDest));
});

gulp.task('styleguide:applystyles', function () {
    return gulp.src(path.sassPass)
        .pipe($.sass({
            errLogToConsole: true
        }))
        .pipe(styleguide.applyStyles())
        .pipe(gulp.dest(path.styleGuideDest));
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
    gulp.src(path.imagePath + '**/*.svg')
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

gulp.task('browser-sync', function () {
    browserSync({
        proxy: path.host,
        https: path.https
    });
});
gulp.task('bs-reload', function () {
    return browserSync.reload();
});


//---------------------------------------------------------------------------
// Tasks
//---------------------------------------------------------------------------
// default

gulp.task('default', ['browser-sync'], function () {
    gulp.watch(path.root + "**/*.html", ['bs-reload']);
    gulp.watch(path.root + "**/*.php", ['bs-reload']);
    gulp.watch(path.sassPass, function () {
        return runSequence(
            'scss',
            'combineMq',
            'cssmin',
            'bs-reload'
        );
    });
    gulp.watch(path.jsPath, function () {
        return runSequence(
            'uglify',
            'concat',
            'bs-reload'
        );
    });
});

// 画像圧縮
gulp.task('image', function () {
    return runSequence(
        'image-opt',
        'svgmin',
        'svgSprite'
    );
});

// sass lint task
gulp.task('test-sass', function () {
    return gulp.src([path.sassPass, path.sassIgnore + 'style.scss', path.sassIgnore + 'foundation/bootstrap/**/*.scss', path.sassIgnore + 'foundation/fontawesome/**/*.scss'])
        .pipe($.sassLint())
        .pipe($.sassLint.format())
        .pipe($.sassLint.failOnError())
});

// Styleguide 生成
gulp.task('style', ['styleguide:generate', 'styleguide:applystyles'], function () {
    gulp.watch(path.sassPass, ['styleguide:generate', 'styleguide:applystyles', 'bs-reload']);
});