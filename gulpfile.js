var gulp = require('gulp')

// Dependencies gulp plugin
var sass = require('gulp-sass')
var concat = require('gulp-concat')
// var babel = require('gulp-babel')
var autoprefixer = require('gulp-autoprefixer')

// Other dependencies
var sassdoc = require('sassdoc')

// Deafult task
gulp.task('default', function () {
  console.log('Welcome to project base')
  // Watch sass files **
  gulp.watch('./css/**/*.scss', ['css'])
  // Watch js files **
  gulp.watch('./js/**/*.js', ['js'])
})

// CSS tasks
gulp.task('css', function () {
  return gulp.src('./css/main.scss')
    .pipe(sass({outputStyle: 'uncompressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
})

// JS tasks
gulp.task('js', function () {
  return gulp.src(['./js/vendor/*.js', './js/plugins.js', './js/custom.js'])
    .pipe(concat('main.js'))
    // .pipe(babel())
    .pipe(gulp.dest('./js'))
})

// DOC tasks
gulp.task('doc', function () {
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
