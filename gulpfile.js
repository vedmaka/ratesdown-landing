const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const less = require('gulp-less');
const gulpSequence = require('gulp-sequence');
const fileInclude = require('gulp-file-include');
const injectSvg = require('gulp-inject-svg');

const paths = {
    src: {
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        html: 'src/*.html',
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
        .pipe(babel())
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('css', () => {
    return gulp.src(paths.src.css)
        .pipe(less())
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
       .pipe(gulp.dest(paths.dist.images));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.*', ['js', 'css', 'html', 'images']);
});

gulp.task('default', gulpSequence('clean',['js', 'css', 'html', 'images']));
