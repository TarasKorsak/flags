const gulp = require('gulp');
const pug = require('gulp-pug');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync').create();

const paths = {
    root: './dist',
    styles: { 
        main: './src/index.scss',
        src: './src/**/*.scss',
        dist: './dist/css'
    },
    pug: {
        src: './src/*.pug',
        dist: './dist/'
    }
}

function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.pug.src, pugToHtml);
}

function server() {
    browserSync.init({
        server: paths.root
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function clean() {
    return del(paths.root);
}


function pugToHtml() {
		return gulp.src(paths.pug.src)
					.pipe(pug({pretty: true}))
	      	.pipe(gulp.dest(paths.pug.dist));
}

function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(postcss(require("./postcss.config")))
        .pipe(sourcemaps.write())
        .pipe(rename("index.min.css"))
        .pipe(gulp.dest(paths.styles.dist))
}

exports.styles = styles;
exports.clean = clean;
exports.pugToHtml = pugToHtml;

gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, pugToHtml),
    gulp.parallel(watch, server)
));