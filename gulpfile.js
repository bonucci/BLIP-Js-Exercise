var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
  gulp.src('css/main.scss')
    .pipe(sass())
    .pipe(csso())
    .pipe(gulp.dest('build'));
});

gulp.task('js', function () {
  return browserify('./js/app.js')
    .transform(babelify, { presets: ['es2015'] })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('build', ['js', 'css']);

gulp.task('watch', function () {
  gulp.watch('js/*.js', ['js']);
  gulp.watch('css/*.scss', ['css']);
});

gulp.task('default', ['build', 'watch']);
