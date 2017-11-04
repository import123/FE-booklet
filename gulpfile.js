var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var merge = require('gulp-merge-link');
var connect = require('gulp-connect');
gulp.task('merge', function () {
  gulp.src(['_book/HTML/**/*.html'])
    .pipe(merge({
      '../../base.css': ['../../**/*.css'],
      '../../base.js': ['../../**/*.js'],
    }))
    .pipe(gulp.dest('dist/html/'));
  gulp.src(['_book/*.html'])
    .pipe(merge({
      'base.css': ['**/*.css'],
      'base.js': ['**/*.js'],
    }))
    .pipe(gulp.dest('dist'));    
});
gulp.task('move',function(){
  gulp.src('_book/search_plus_index.json')
  .pipe(gulp.dest('dist'));
  gulp.src('_book/gitbook/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})
gulp.task('concat',function(){
  gulp.src('_book/**/*.js')
    .pipe(concat('base.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
  gulp.src('_book/**/*.css')
    .pipe(concat('base.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist'));
})
gulp.task('connect', function () {
  connect.server();
});
gulp.task('default',['merge','concat','connect','move']);