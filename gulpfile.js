const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const nunjucksRender = require('gulp-nunjucks-render');
const data = require('gulp-data');
const useref = require('gulp-useref');
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');

// Convert nunjucks into html
gulp.task('nunjucks', function () {
    return gulp.src('src/pages/**/*.+(nunjucks|njk)')
        .pipe(data(function () {
            return require('./src/data.json')
        }))
        .pipe(nunjucksRender({
            path: ['src/templates']
        }))
        .pipe(gulp.dest('build'))
});

// Convert scss into css
gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(
            postcss([
                autoprefixer(),
                cssnano()
            ])
        )
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

// Watch over html, css files change
gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/**/*.+(nunjucks|njk)', gulp.series('nunjucks'));
});

// Bundle css/js files and minify
gulp.task('useref', function () {
    return gulp.src('build/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest('dist'))
});

// Compress images
gulp.task('images', function () {
    return gulp.src('build/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

// Copy fonts for distribution
gulp.task('fonts', function () {
    return gulp.src('build/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
})

// Copy libraries for distribution
gulp.task('vendors', function () {
    return gulp.src('build/vendors/**/*')
        .pipe(gulp.dest('dist/vendors'));
});

// Clean old dist 
gulp.task('clean:dist', async function () {
    return await del.sync('dist');
});

// Distribution build 
gulp.task('dist', gulp.series('nunjucks', 'scss', 'useref', 'images', 'fonts', 'vendors'));