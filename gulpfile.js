const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const less = require('gulp-less');
const gulpSequence = require('gulp-sequence');
const fileInclude = require('gulp-file-include');
const injectSvg = require('gulp-inject-svg');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');

const paths = {
    src: {
        js: 'src/js/**/*.js',
        js_full: 'src/js/**/*.js',
        css: 'src/css/*.less',
        css_full: 'src/css/**/*.less',
        html: 'src/*.html',
        html_full: 'src/**/*.html',
        images: 'src/images/**.*'
    },
    dist: {
        js: 'docs/js/',
        css: 'docs/css/',
        html: 'docs/',
        images: 'docs/images/'
    }
};

gulp.task('clean', () => {
    return del(['docs/**/*', '!docs/CNAME']);
});

gulp.task('js', () => {
    return gulp.src(paths.src.js)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('css', () => {
    return gulp.src(paths.src.css)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('html', () => {
    return gulp.src(paths.src.html)
        .pipe(fileInclude())
        .pipe(injectSvg({
            base: 'src/'
        }))
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('images', () => {
   return gulp.src(paths.src.images)
       .pipe(changed(paths.dist.images))
       .pipe(imagemin())
       .pipe(gulp.dest(paths.dist.images));
});

gulp.task('watch', () => {
    //gulp.watch('src/**/*.*', ['js', 'css', 'html', 'images']);
    gulp.watch(paths.src.js_full, ['js']);
    gulp.watch(paths.src.css_full, ['css']);
    gulp.watch(paths.src.html_full, ['html']);
    gulp.watch(paths.src.images, ['images']);
});

gulp.task('default', gulpSequence('clean',['js', 'css', 'html', 'images']));
