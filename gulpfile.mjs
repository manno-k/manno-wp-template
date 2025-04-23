import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import browserSync from 'browser-sync';
import stylelint from 'stylelint';
import syntaxScss from 'postcss-scss';
import reporter from 'postcss-reporter';
import sourcemaps from 'gulp-sourcemaps';
import changed from "gulp-changed";
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import gulpConcat from 'gulp-concat';
import gulpUglify from 'gulp-uglify';
import gulpRename from 'gulp-rename';
import gulpCssmin from 'gulp-cssmin';
import gulpImage from 'gulp-image';
import gulpSvgmin from 'gulp-svgmin';

const sass = gulpSass(dartSass);

import config from './gulpconfig.js';

const server = browserSync.create();
// CSS Tasks
function lintStyles() {
  return gulp.src(config.source.css)
  .pipe(plumber({
    errorHandler: function(err) {
      console.log('Stylelint error:', err.message);
      this.emit('end');
    }
  }))
  .pipe(postcss([
    stylelint(),
    reporter({ clearReportedMessages: true })
  ], { syntax: syntaxScss }));
}


export const makeStyles = async () => {
  return gulp.src('src/sass/style.scss')
  .pipe(plumber({
    errorHandler: function (err) {
      console.log(err.messageFormatted);
      this.emit('end');
    }
  }))
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['node_modules'],
    quietDeps: true, // 依存パッケージからの警告を無視
    logger: {
      warn: (message, { deprecation, span }) => {
        // node_modulesからの警告を無視
        if (span?.url && String(span.url).indexOf('node_modules') !== -1) {
          return;
        }
        console.warn(message);
      }
    }
  }).on('error', sass.logError))
  .pipe(
    postcss(
      [
        cssnext({ browsers: ['last 2 versions', '> 5%'] }), // 最新CSS機能のサポート
        reporter({ clearReportedMessages: true }) // エラーレポートの設定
      ],
      { syntax: syntaxScss } // SCSS用のシンタックス指定
    )
  )
  .pipe(gulpCssmin())
  .pipe(gulpRename({
    extname: '.min.css'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest(config.build.css))
  .pipe(server.stream({ match: '**/*.css' }));
};


export const styles = gulp.series(
  // lintStyles,
  makeStyles,
  (done) => {
    done(); // 完了を通知
  }
);


// Script Tasks
export const concatScripts = () => {
  return gulp.src(config.script.concat)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulpConcat(config.script.filename))
  .pipe(gulpUglify())
  .pipe(gulpRename({
    extname: '.min.js'
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.build.js));
};

export const uglifyScripts = () => {
  return gulp.src(config.source.js)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(gulpUglify())
  .pipe(gulpRename({
    extname: '.min.js'
  }))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.build.js));
};


export const script = gulp.parallel(concatScripts, uglifyScripts);

// Image Optimization Tasks
export const imageOpt = () => {
  return gulp.src(config.source.img)
  .pipe(plumber())
  .pipe(changed(config.build.img))
  .pipe(gulpImage({
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
  }))
  .pipe(gulp.dest(config.build.img));
};

export const svgmin = () => {
  return gulp.src(config.source.img + '**/*.svg')
  .pipe(gulpSvgmin())
  .pipe(gulp.dest(config.build.img));
};

export const image = gulp.series(gulp.parallel(imageOpt, svgmin));

// Browser Sync Task
export const serve = () => {
  return server.init(config.server);
};

// Watch Tasks
export const watchStyles = () => {
  gulp.watch(config.source.css, styles);
};

export const watchScripts = () => {
  gulp.watch(config.source.js, gulp.series(script, (done) => {
    server.reload();
    done();
  }));
};

export const watchCode = () => {
  gulp.watch(config.watch.code, (done) => {
    server.reload();
    done();
  });
};

export const watchImages = () => {
  gulp.watch(config.source.img, gulp.series(image, (done) => {
    server.reload();
    done();
  }));
};

export const watch = gulp.parallel(
  watchStyles,
  watchScripts,
  watchCode,
  watchImages
);

// Default Task
export default gulp.series(
  styles,
  gulp.parallel(serve, watch)
);
