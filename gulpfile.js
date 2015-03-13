'use strict';
var browserify = require('browserify'),
    gulp = require('gulp'),
    transform = require('vinyl-transform'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    gulpif = require('gulp-if'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    sass = require('gulp-sass'),
    changed = require('gulp-changed'),
    minifyCSS = require('gulp-minify-css'),
    runSequence = require('run-sequence'),
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'),
    gutil = require('gulp-util'),
    ftp = require('gulp-ftp'),
    mocha = require('gulp-mocha'),
    log4js = require('log4js'),
    fs = require('fs'),
    yargs = require('yargs'),
    browserSync = require('browser-sync');

//var config = require('./gulpUserConfig.json');
var env = yargs.argv.env || 'dev';

console.log('Enviroment: ' + env);

gulp.task('js:browserify', function () {
    var browserified = transform(function (filename) {
        var b = browserify(filename);
        return b.bundle();
    });
    return gulp.src('./src/js/*.js')
        .pipe(browserified)
        .pipe(gulpif(env === 'dev', sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(env === 'dev', sourcemaps.write('./')))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('js', function () {
    return gulp.src(['./src/js/*.js', './src/js/controllers/*.js', './src/js/services/*.js'], {base: './src/js'})
        .pipe(gulpif(env === 'dev', sourcemaps.init({loadMaps: true})))
        .pipe(gulpif(env === 'dev', sourcemaps.write('./')))
        .pipe(gulpif(env === 'prod', uglify()))
        .pipe(gulp.dest('./build/js'));
});

gulp.task('html', function () {
    return gulp.src(['./src/*.html', './src/views/*.html'], {base: './src'})
        .pipe(gulpif(env === 'prod', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('./build'));
});

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(changed('./build/css'))
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('images:optimize', function () {
    return gulp.src('./src/images/**/*.{jpg,jpeg,png,gif}')
        .pipe(changed('./build/images'))
        .pipe(imagemin())
        .pipe(gulp.dest('./build/images'))
        .pipe(size());
});

gulp.task('ftp', function () {
    return gulp.src('build/**/*')
        .pipe(ftp({
            host: config.ftp.host,
            user: config.ftp.user,
            pass: config.ftp.pass
        }))
        .pipe(gutil.noop());
});

gulp.task('run tests', function () {
    return gulp.src('./src/js/test/**/*Test.js')
        .pipe(mocha())
        .on('error', function (err) {
            console.log(err);
            process.emit('exit');
        });
});

gulp.task('clean', function (cb) {
    del(['./build/*', '!./build/api'], cb);
});

gulp.task('default', ['build:dev']);

gulp.task('build:prod', function () {
    runSequence('run tests', 'clean',
        ['html', 'js', 'sass', 'images:optimize'],
        'ftp'
    );
});


//----Manual

gulp.task('build:dev', function () {
    runSequence('clean',
        ['html', 'js', 'sass', 'images:optimize']
    );
});

//----Watches

gulp.task('watch', function () {
    gulp.watch('./src/js/**/*.js', ['js']);
    gulp.watch('./src/scss/*.scss', ['sass']);
    gulp.watch(['src/*.html', 'src/views/*.html'], ['html']);
});

gulp.task('browser-sync', function () {
    var files = [
        './build/index.html',
        './build/views/*.html',
        './build/js/**/*.js',
        './build/css/*.css'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './build'
        }
    });
});

//gulp.task ('watch&bsync',['watch','browser-sync']);
