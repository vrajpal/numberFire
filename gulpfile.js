'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');
    

gulp.task('hello-world', function() { 
    console.log("Hello Worlds!");
});

gulp.task('sass', function () {
  return gulp.src('./app/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./app/styles/*.scss', ['sass']);
});