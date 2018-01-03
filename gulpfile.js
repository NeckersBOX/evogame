const gulp = require ('gulp');
const minify = require ('gulp-minify');
const sass = require ('gulp-sass');
const webpack = require ('webpack');
const webpackStream = require ('webpack-stream');

const files = {
  js: 'js/**/*.js',
  sass: [
    'sass/**/*.sass',
    'bower_components/mui/src/sass/**/*.scss'
  ]
};


gulp.task ('webpack', (cb) =>
  gulp.src ('js/main.js')
    .pipe (webpackStream ({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [{
          //exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: 'babel_cache',
            presets: ['env', 'react'],
            plugins: [
              ['transform-react-jsx', {
                pragma: 'h'
              }],
              'transform-object-rest-spread',
              'babel-plugin-transform-decorators-legacy'
            ]
          }
        }]
      },
      plugins: [
        new webpack.DefinePlugin ({
          'process.env': {
            NODE_ENV: process.env.NODE_ENV || '"production"',
            loglevel: process.env.loglevel || '"silent"',
            logtostr: process.env.logtostr || false
          }
        })
      ],
    }))
    .pipe(minify())
    .pipe (gulp.dest ('dist/js'))
);

gulp.task ('sass', () => gulp.src (files.sass)
  .pipe (sass ({outputStyle: 'compressed'}))
  .pipe (gulp.dest ('dist/css'))
);

gulp.task ('clean', () => del ([ 'babel_cache' ]));
gulp.task ('build', [ 'webpack', 'sass' ]);


gulp.task ('watch', () => {
  gulp.watch (files.js, [ 'webpack' ]);
  gulp.watch (files.sass, [ 'sass' ])
});
