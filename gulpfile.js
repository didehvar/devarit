var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('default', ['build', 'watch']);

gulp.task('css', function() {
  gulp.src('less/devarit.less')
    .pipe(plugins.less())
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('dist/css'));

  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/font-awesome/css/font-awesome.min.css'])
      .pipe(gulp.dest('dist/css'))
      .pipe(plugins.livereload());
});

gulp.task('js', function() {
  gulp.src('js/scroll-navbar.js')
      .pipe(plugins.uglify())
      .pipe(plugins.rename({ extname: '.min.js' }))
      .pipe(gulp.dest('dist/js'));

  gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jquery-smooth-scroll/src/jquery.smooth-scroll.js',
            'node_modules/bootstrap-validator/dist/validator.js'])
      .pipe(plugins.uglify())
      .pipe(plugins.rename({ extname: '.min.js' }))
      .pipe(gulp.dest('dist/js/vendor'))
      .pipe(plugins.livereload());
});

gulp.task('misc', function() {
  gulp.src('node_modules/font-awesome/fonts/*.*')
      .pipe(gulp.dest('dist/fonts'));

  gulp.src('public/**/*.*')
      .pipe(gulp.dest('dist'))
      .pipe(plugins.livereload());
});

gulp.task('build', function() {
  gulp.start('css');
  gulp.start('js');
  gulp.start('misc');
});

gulp.task('watch', function() {
  plugins.livereload.listen();

  gulp.watch('less/*.less', ['css']);
  gulp.watch('js/**/*.js', ['js']);
  gulp.watch('public/**/*.*', ['misc']);
});
