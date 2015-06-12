# gulp-cordova-xml

> Adds raw xml tags to your config.xml

## Installation

```bash
npm install --save-dev gulp-cordova-xml
```

## Usage

The following example will add two `access` tags to the config.xml file.

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    xml = require('gulp-cordova-xml');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(xml('<access origin="http://www.google.com" />'))
        .pipe(xml('<access origin="http://www.github.com" />'));
});
```

It's not possible to add two tags in one plugin call. If you want to do this, you should pass an array of
tags as parameter.

```JavaScript
var gulp = require('gulp'),
    create = require('gulp-cordova-create'),
    xml = require('gulp-cordova-xml');

gulp.task('build', function() {
    return gulp.src('dist')
        .pipe(create())
        .pipe(xml([
					'<access origin="http://www.google.com" />',
        			'<access origin="http://www.github.com" />'
				  ]));
});
```

Notice that this second method is faster then the first method. The reason for this is that everytime the plugin is called, 
the config.xml file is parsed all over again. Because you only call the plugin once with the array-method, the config file will 
only be parsed once instace of twice.

Please not that this is not the best way for adding `access` tags. Use [gulp-cordova-access](https://github.com/SamVerschueren/gulp-cordova-access)
for that.

## API

### xml(tags)

#### tags

*Required*  
Type: `string|string[]`

A raw xml tag or an array of raw xml tags.

## Related

See [`gulp-cordova`](https://github.com/SamVerschueren/gulp-cordova) for the full list of available packages.

## Contributors

- Sam Verschueren [<sam.verschueren@gmail.com>]

## License

MIT © Sam Verschueren