var gutil = require('gulp-util');
var through = require('through2');
var webpackStatsDuplicates = require('webpack-stats-duplicates');
var loadConfig = webpackStatsDuplicates.loadConfig;
var findDuplicates = webpackStatsDuplicates.findDuplicates;
var printDuplicates = webpackStatsDuplicates.printDuplicates;
var PLUGIN_NAME = 'gulp-webpack-stats-duplicates';

module.exports = function (opts) {
    var options = opts || {};

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        var that = this;
        loadConfig(options.config, function (error, config) {
            if (error) {
                that.emit('error', new gutil.PluginError(PLUGIN_NAME, error));
                return;
            }

            // Merge config options with the gulp plugin options
            options = Object.assign({}, config, options);
        });

        var json = JSON.parse(file.contents.toString(enc));
        var duplicates = findDuplicates(json, options);

        if (duplicates.length) {
            printDuplicates(duplicates);
            return this.emit('error', new gutil.PluginError(
                PLUGIN_NAME, 'Duplicate modules found in file: ' + file.path));
        }

        cb(null, file);
    });
};
