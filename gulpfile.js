'use strict';

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    inject = require("gulp-inject"),
    jshint = require('gulp-jshint'),
    runSequence = require('gulp-run-sequence'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber');

// Browser Sync
gulp.task('browser-sync', function() {
    browserSync({
        files: ['app/styles/main.css','app/*.html','app/scripts/**/*'],
        server: {
            baseDir: "app"
        }
    });
});

// Inject
gulp.task('inject', function(){
    return gulp.src('app/*.html')
        .pipe(inject(gulp.src(['app/scripts/app.js', 'app/scripts/**/*.module.js', 'app/scripts/**/*.js', '!app/scripts/**/*spec.js'], {read: false}), {relative: true}))
        .pipe(gulp.dest('app'));
});

// Scripts
gulp.task('scripts', function(){
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

// Styles
gulp.task('styles', function(){
    return gulp.src('app/styles/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer('last 1 version'))
        .pipe(gulp.dest('app/styles'));
});

// Watch
gulp.task('watch', function(){
    gulp.watch(['app/scripts/**/*.scss','app/styles/**/*.scss'], ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch(['app/scripts/**/*.js','!app/scripts/**/*.spec.js'], ['inject']);
});

// Default
gulp.task('default', function(cb){
    runSequence(['inject', 'styles', 'scripts','watch'],['browser-sync'], cb);
});
