import { pipeline } from 'stream/promises';
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
import gulpRename from 'gulp-rename';
import terser from 'gulp-terser';
import gulpCssmin from 'gulp-cssmin';
import imagemin from 'gulp-imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';

const sass = gulpSass(dartSass);

import config from './gulpconfig.js';


const server = browserSync.create();

// CSS Tasks
function lintStyles () {
	return gulp.src(config.source.css)
	.pipe(plumber({
		errorHandler: function (err) {
			console.log('Stylelint error:', err.message);
			this.emit('end');
		}
	}))
	.pipe(postcss([
		stylelint(),
		reporter({clearReportedMessages: true})
	], {syntax: syntaxScss}));
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
			warn: (message, {deprecation, span}) => {
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
				cssnext({browsers: ['last 2 versions', '> 5%']}), // 最新CSS機能のサポート
				reporter({clearReportedMessages: true}) // エラーレポートの設定
			],
			{syntax: syntaxScss} // SCSS用のシンタックス指定
		)
	)
	.pipe(gulpCssmin())
	.pipe(gulpRename({
		extname: '.min.css'
	}))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(config.build.css))
	.pipe(server.stream({match: '**/*.css'}));
};


export const styles = gulp.series(
	// lintStyles,
	makeStyles,
	(done) => {
		done(); // 完了を通知
	}
);


// --- ① concatScripts, uglifyScripts は必ずストリームを return ---
export function concatScripts() {
	return gulp
	.src(config.script.concat)
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(babel({ presets: ['@babel/env'] }))
	.pipe(gulpConcat(config.script.filename))
	.pipe(terser())
	.pipe(gulpRename({ extname: '.min.js' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.build.js));
}

export const uglifyScripts = () => {
	const stream = gulp.src(config.script.concat, { allowEmpty: true })
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(terser())
	.pipe(gulpRename({ extname: '.min.js' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(config.build.js));

	// 各ファイルが処理されたタイミングをログ表示
	stream.on('data', (file) => {
		console.log('処理中のファイル:', file.path);
	});

	stream.on('end', () => {
		console.log('すべてのファイルが正常に処理完了しました。');
	});

	stream.on('error', (err) => {
		console.error('エラーが発生しました:', err);
	});

	return stream;
};

// --- ② series＋parallel でラップし、最後に必ず done() を呼ぶ ---
export const script = gulp.series(
	// 並列実行部分
	gulp.parallel(concatScripts, uglifyScripts),
	// 完了コールバック
	function finishScript(done) {
		done();
	}
);

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

export const compressImages = () => {
	return pipeline(
		gulp.src('src/img/**/*.{png,jpg,jpeg,svg,gif}'),
		imagemin([
			imageminMozjpeg({ quality: 75, progressive: true }),
			imageminOptipng({ optimizationLevel: 5 }),
			imageminSvgo({
				plugins: [
					{ removeViewBox: false },
					{ cleanupIDs: false }
				]
			})
		]),
		gulp.dest('assets/img')
	);
};

export const image = compressImages;

export const watchImages = () => {
	gulp.watch('src/img/**/*.{png,jpg,jpeg,svg,gif}', gulp.series(compressImages));
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
