const paths = {

    scripts: {
        src: 'src/js/*.js',
        dist: 'dist/js/',
    },

    styles: {
        src:  'src/less/*.less',
        dist: 'dist/css/',
    },

}

const { src, dest, parallel, watch } = require('gulp')
const less = require('gulp-less')
const browserSync  = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const minify = require('gulp-minify')

function browsersync() {
    browserSync.init({
        server: { baseDir: './' },
        notify: false,
    })
}

function styles() {
    return src(paths.styles.src)
        .pipe(less())
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
        .pipe(dest(paths.styles.dist))
}

function scripts() {
    return src(paths.scripts.src)
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(minify())
        .pipe(dest(paths.scripts.dist))
}


function startwatch() {
    watch('index.html', {usePolling: true}).on('change', browserSync.reload)
    watch(paths.styles.src, {usePolling: true}, styles)
    watch(paths.scripts.src, {usePolling: true}, scripts)
}

exports.default = parallel(styles, scripts, browsersync, startwatch)