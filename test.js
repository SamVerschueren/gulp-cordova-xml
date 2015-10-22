import path from 'path';
import fs from 'fs';
import test from 'ava';
import gutil from 'gulp-util';
import pify from 'pify';
import fn from './';

const file = path.join(__dirname, 'config.xml');
const fixture = `<?xml version='1.0' encoding='utf-8'?><widget></widget>`;

function xml(input) {
	return pify(fs.writeFile)(file, fixture)
		.then(function () {
			return new Promise(function (resolve) {
				const stream = fn(input);

				stream.on('data', function () {

				});

				stream.on('end', function (data) {
					resolve(fs.readFileSync(file).toString());
				});

				stream.write(new gutil.File({
					cwd: __dirname,
					base: __dirname,
					path: __dirname,
					contents: new Buffer(fixture)
				}));

				stream.end();
			});
		})
		.then(function (result) {
			fs.unlinkSync(file);

			return result;
		});
}

test.serial('add xml tag', async t => {
	t.is(await xml('<hello world="true" />'), [
		`<?xml version='1.0' encoding='utf-8'?>`,
		`<widget>`,
		`    <hello world="true" />`,
		`</widget>`,
		``
	].join('\n'));
});

test.serial('add multiple xml tags', async t => {
	t.is(await xml(['<hello world="true" />', '<foo bar="false" />']), [
		`<?xml version='1.0' encoding='utf-8'?>`,
		`<widget>`,
		`    <hello world="true" />`,
		`    <foo bar="false" />`,
		`</widget>`,
		``
	].join('\n'));
});
