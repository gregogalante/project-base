var gulp = require('gulp')

// Dependencies gulp plugin css
var css_sass = require('gulp-sass')
var css_autoprefixer = require('gulp-autoprefixer')
var css_globbing = require('gulp-css-globbing')

// Dependencies gulp plugin js
var js_concat = require('gulp-concat')
// var babel = require('gulp-babel')

// Dependencies gulp plugin
// var insert = require('gulp-insert')

// Other dependencies
var sassdoc = require('sassdoc')
var run_sequence = require('run-sequence')

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Watch sass files **
  gulp.watch('./css/vendor/**/*', ['css'])
  gulp.watch('./css/base/**/*', ['css'])
  gulp.watch('./css/modules/**/*', ['css'])
  gulp.watch('./css/pages/**/*', ['css'])
  gulp.watch('./css/custom.scss', ['css'])
  // Watch js files **
  gulp.watch('./js/**/*', ['js_concat'])
})

// CSS tasks
gulp.task('css', function () {
  run_sequence('css_globbing', 'css_sass', 'css_autoprefixer')
})

gulp.task('css_globbing', function () {
  return gulp.src('./css/vendor/vendor.scss')
    .pipe(css_globbing())
    .pipe(gulp.dest('./css'))
})

gulp.task('css_autoprefixer', function () {
  return gulp.src('./css/main.css')
    .pipe(css_autoprefixer())
    .pipe(gulp.dest('./css'))
})

gulp.task('css_sass', function () {
  return gulp.src('./css/main.scss')
    .pipe(css_sass({outputStyle: 'compressed'}).on('error', css_sass.logError))
    .pipe(gulp.dest('./css'))
})

// JS tasks
gulp.task('js_concat', function () {
  return gulp.src(['./js/vendor/*.js', './js/plugins.js', './js/custom.js'])
    .pipe(js_concat('main.js'))
    .pipe(gulp.dest('./js'))
})

// DOC tasks
gulp.task('sassdoc', function () {
  var options = {
    dest: 'docs',
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true
    }
  }

  return gulp.src('./css/main.scss')
    .pipe(sassdoc(options))
})
