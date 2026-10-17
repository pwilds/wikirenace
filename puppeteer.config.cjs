const { join } = require('path');

/**
 * @type {import('puppeteer').Configuration}
 */
module.exports = {
  // Configura la ruta de caché para que Render lo descargue correctamente
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
