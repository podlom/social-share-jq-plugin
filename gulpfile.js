'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    prefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify'),
    rimraf = require('rimraf'),
    cssmin = require('gulp-cssmin'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

var path = {
    dist: {
        html:   'dist/',
        js:     'dist/js/',
        css:    'dist/css/',
        img:	'dist/img/'
    },
    src: {
        html:   'src/*.html',
        js:     'src/js/*.js',
        style:  'src/scss/*.scss',
        img:	'src/img/*.*'
    },
    watch: {
        html:   'src/**/*.html',
        js:     'src/js/**/*.js',
        style:  'src/scss/*.scss',
        img:	'src/img/*.*'
    },
    clean: './dist'
};

var config = {
    server: "./dist",
    // tunnel: "lirax",
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Angel"
};


gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({stream: true}));
});

gulp.task('img:build', function () {
    gulp.src(path.src.img) 
        .pipe(gulp.dest(path.dist.img))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(sourcemaps.init()) 
        .pipe(minify())
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({stream: true}));
});


gulp.task('build', [
    'js:build',
    'html:build',
    'style:build',
    'img:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('img:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
});

gulp.task('webserver', function () {
    browserSync.init(config);
});


gulp.task('default', ['build', 'webserver', 'watch']);