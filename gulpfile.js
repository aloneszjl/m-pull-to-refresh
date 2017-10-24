var gulp = require("gulp");
var pump = require("pump");
// const del = require("del");
var $ = require("gulp-load-plugins")();

var distFile = "lib";

gulp.task("babel", function(cb) {
  pump([gulp.src("src/*.jsx"), $.babel(), gulp.dest(distFile)], cb);
});

gulp.task("default", ["babel"]); //定义默认任务 elseTask为其他任务，该示例没有定义elseTask任务
