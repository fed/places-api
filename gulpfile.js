const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const JSON_FILES = ['src/**/*.json'];
const destinationFolder = 'build';

gulp.task('scripts', () => {
  const tsResult = tsProject
    .src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest(destinationFolder));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', () => {
  return gulp
    .src(JSON_FILES)
    .pipe(gulp.dest(destinationFolder));
});

gulp.task('build', ['scripts', 'assets']);
gulp.task('default', ['watch', 'assets']);
