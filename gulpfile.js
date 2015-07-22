var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');
var livereload = require('gulp-livereload');

gulp.task('less', function() {
  return gulp.src('./less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('less/**/*.less', ['less']);
});
