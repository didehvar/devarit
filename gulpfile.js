var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('less', function() {
  return gulp.src('less/devarit.less')
    .pipe(plugins.less())
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest('css'))
    .pipe(plugins.livereload());
});

gulp.task('build', function() {
  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/font-awesome/css/font-awesome.min.css'])
      .pipe(gulp.dest('css'));

  gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery-smooth-scroll/src/jquery.smooth-scroll.js',
            'node_modules/bootstrap-validator/dist/validator.min.js'])
      .pipe(gulp.dest('js/vendor'));

  gulp.src('node_modules/font-awesome/fonts/*.*')
      .pipe(gulp.dest('fonts'));

  gulp.src('index.html')
      .pipe(plugins.livereload());
});

gulp.task('watch', function() {
  gulp.start('build');

  plugins.livereload.listen();
  gulp.watch('less/*.less', ['less']);
  gulp.watch('index.html', ['build']);
});
