var gulp = require('gulp')

// Dependencies gulp plugin css
var css_sass = require('gulp-sass')
var css_autoprefixer = require('gulp-autoprefixer')

// Dependencies gulp plugin js
var js_concat = require('gulp-concat')
// var babel = require('gulp-babel')

// Other dependencies
var sassdoc = require('sassdoc')
var run_sequence = require('run-sequence')

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Watch sass files **
  gulp.watch('./css/**/*', ['css'])
  // Watch js files **
  gulp.watch('./js/**/*', ['js'])
})

// CSS tasks
gulp.task('css', function () {
  run_sequence('css_sass', 'css_autoprefixer')
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
gulp.task('js', function () {
  run_sequence('js_concat')
})

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
