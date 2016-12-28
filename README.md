# gulp-webpack-stats-duplicates

A gulp plugin for the [webpack-stats-duplicates](https://github.com/zillow/webpack-stats-duplicates) utility.

### Installation

```
$ npm install --save gulp-webpack-stats-duplicates
```

### Usage

```
import webpackStatsDuplicates from 'gulp-webpack-stats-duplicates';

gulp.task('webpack-stats-duplicates', () => {
  gulp.src('**/stats.json').pipe(webpackStatsDuplicates({ /* options */ }));
});
```

#### Options

Takes all the same options as the [findDuplicates](https://github.com/zillow/webpack-stats-duplicates#arguments) API function, as well as the following:

1. `config` (`String`): The file path to the `.wsdrc` file. If not specified, it will attempt to load the file from the root of your project.
