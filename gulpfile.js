var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('less', function() {
  return gulp.src('./less/devarit.less')
    .pipe(plugins.less())
    .pipe(gulp.dest('css'))
    .pipe(plugins.livereload());
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(plugins.livereload());
})

gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch('less/*.less', ['less']);
  gulp.watch('index.html', ['html']);
});
