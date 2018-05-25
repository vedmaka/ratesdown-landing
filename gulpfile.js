const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const less = require('gulp-less');
const gulpSequence = require('gulp-sequence');
const fileinclude = require('gulp-file-include');

const paths = {
    src: {
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        html: 'src/*.html'
    },
    dist: {
        js: 'dist/js/',
        css: 'dist/css/',
        html: 'dist/'
    }
};

gulp.task('clean', () => {
    return del('dist');
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
        .pipe(fileinclude())
        .pipe(gulp.dest(paths.dist.html));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.*', ['js', 'css', 'html']);
});

gulp.task('default', gulpSequence('clean',['js', 'css', 'html']));
