'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');
    

gulp.task('hello-world', function() { 
    console.log("Hello Worlds!");
});

gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest'));
});
 
gulp.task('watch', function () {
  gulp.watch('./app/styles/*.scss', ['sass']);
  gulp.watch('./app/js/*.js', ['lint']);
});

gulp.task('lint', function() {
  return gulp.src('./app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(gulp.dest('./dest'));
});