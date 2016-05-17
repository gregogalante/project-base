// Project-base by G.Galante

// @@ GULPFILE Dependencies
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

var gulp = require('gulp')

// Dependencies gulp plugin css
var css_sass = require('gulp-sass')
var css_autoprefixer = require('gulp-autoprefixer')

// Dependencies gulp plugin js
var js_concat = require('gulp-concat')
var js_babel = require('gulp-babel')

// @@ GULPFILE Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Watch sass files **
  gulp.watch('./src/css/**/*', ['css'])
  // Watch js files **
  gulp.watch('./src/js/**/*', ['js'])
})

// @@ GULPFILE CSS-Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// CSS tasks
gulp.task('css', function () {
  return gulp.src('./src/css/main.scss')
  // Exec sass files
  .pipe(css_sass({outputStyle: 'compressed'}).on('error', css_sass.logError))
  // Add prefix to css
  .pipe(css_autoprefixer())
  .pipe(gulp.dest('./src/css'))
})

// @@ GULPFILE JS-Tasks
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// JS tasks
gulp.task('js', function () {
  return gulp.src(['./src/js/vendor/*.js', './src/js/custom.js'])
  // Concat files
  .pipe(js_concat('main.js'))
  // Exec babel
  .pipe(js_babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./src/js'))
})
