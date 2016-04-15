var gulp = require('gulp')

// Dependencies
var sass = require('gulp-sass')
var concat = require('gulp-concat')

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Watch sass files ** gulp-sass
  gulp.watch('./css/**/*.scss', ['sass'])
  // Watch js files ** gulp-concat
  gulp.watch('./js/**/*.js', ['concat'])
})

// Sass tasks
gulp.task('sass', function () {
  return gulp.src('./css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
})

// Concat tasks
gulp.task('concat', function () {
  return gulp.src(['./js/vendor/*.js', './js/plugins.js', './js/custom.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./js'))
})
