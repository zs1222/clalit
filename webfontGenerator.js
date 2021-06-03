const webFontsGenerator = require('webfonts-generator');
const path = require('path');
const fs = require('fs');

webFontsGenerator({
  files: recFindByExt(__dirname + '\\assets\\svg-icons', 'svg'),
  dest: path.resolve(__dirname, 'assets\\fonts'),
  css: true,
  cssTemplateFontPath: 'assets\\fonts\\',
  fontName: 'svg-icons',
  cssTemplateFontName: 'svg-icons',
  templateOptions: {
    classPrefix: 'svg-icons-',
    baseSelector: '.svg-icons'
  },
  maxConcurrency: 1,
  cssTemplate: webFontsGenerator.templates.css,
  normalize: true,
  verbose: true,
  fontStyle: 'normal !important',
  cssDest: path.resolve(__dirname, 'assets/fonts/svg-icons.css'),
  cssFontsUrl: 'assets/fonts/',
}, function (error) {
  if (error) {
    console.log('\x1b[31m', '>>>>>>>>> Web Fonts Fail! <<<<<<<<<<');
    console.log('error', error);
  } else {
    console.log('\x1b[32m','>>>>>>>>> Web Fonts Success ! <<<<<<<<<<');
  }
});

function recFindByExt(base, ext, files, result) {
  files = files || fs.readdirSync(base);
  result = result || [];

  files.forEach(file => {
      const newBase = path.join(base, file);
      if (fs.statSync(newBase).isDirectory()) {
        result = recFindByExt(newBase, ext, fs.readdirSync(newBase), result)
      } else {
        if (file.substr(-1 * (ext.length + 1)) === '.' + ext) {
          result.push(newBase)
        }
      }
    });
  return result
}
