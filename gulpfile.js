var gulp = require ('gulp');
var less = require ('gulp-less');
var rename = require ('gulp-rename');
var browserify = require ('gulp-browserify');
var babel = require ('gulp-babel');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('less', function () {
    gulp.src('./less/**/*.less')
        .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('babel', function () {
    gulp.src('src/**/*.js')
        .pipe(babel({
            "presets": ["es2015"]
        }))
        .on('error', function(error) {
            console.log(error);

            this.emit('end');
        })
        .pipe(gulp.dest('./tmp'))
});

gulp.task('browserify', ['babel'], function () {
    gulp.src('./tmp/app.js')
        .pipe(sourcemaps.init())
        .pipe(browserify())
        .on('error', function(error) {
            console.log(error);

            this.emit('end');
        })
        .pipe(rename('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/js'))
});

gulp.task('build', ['browserify', 'less']);

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['browserify']);
    gulp.watch('less/**/*.less', ['less']);
});

gulp.task('default', ['build']);