var gulp = require('gulp');
var server = require('gulp-webserver');
var sequence = require('gulp-sequence');
var sass = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var url = require('url');
var mock = require('./dist/data/mock.js');
var user = {
    name: "zs",
    pwd: 1234
};
var userCheck = false;

gulp.task('minsass', function() {
    return gulp.src('src/css/*.css')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});
gulp.task('aminsass', function() {
    return gulp.src('src/page/{css1,css2}/{style,read,style1,style2}.css')
        .pipe(sass())
        .pipe(gulp.dest('dist/page'));
});
gulp.task('minjs', function() {
    return gulp.src(['src/js/*.js', 'src/js/{common,lib,page}/*.js'])
        .pipe(babel({
            presets: 'es2015' //指定编译后的版本为es5
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('minhtml', function() {
    return gulp.src(['src/index.html', 'src/{page,tpl}/*.html'])
        .pipe(htmlmin())
        .pipe(gulp.dest('dist'));
});
gulp.task('webserver', function() {
    gulp.src('dist')
        .pipe(server({
            host: 'localhost',
            port: 8008,
            middleware: function(req, res, next) {
                console.log(req.url);
                if (req.url === '/book/login') {
                    var arr = [];
                    req.on('data', function(chunk) {
                        arr.push(chunk);
                    });
                    req.on('end', function() {
                        var data = Buffer.concat(arr).toString();
                        var obj = require('querystring').parse(data); //{ user: 'za', pwd: '123' }
                        res.writeHead(200, { 'Content-Type': 'text/javascript;charset=UTF-8' }); //设置请求头样式
                        if (obj.user === user.name && obj.pwd == user.pwd) {
                            res.end('{"result":"success"}');
                            userCheck = true;
                        } else {
                            res.end('{"result":"error"}');
                        }
                        next();
                    });
                    return false;
                };
                if (req.url === '/loginSearch') {
                    res.end('{"result":"' + userCheck + '"}');
                }
                if (/\/book/g.test(url.parse(req.url, true).pathname)) {
                    res.end(JSON.stringify(mock(req.url)));
                }
                next();
            }
        }));
});
gulp.task('default', function(self) {
    sequence(['minsass', 'aminsass', 'minjs'], 'minhtml', 'webserver', self);
});