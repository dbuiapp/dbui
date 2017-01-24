const fs = require('fs-promise');

(async  () => {
  const pkgFile = await fs.readFile('package.json', 'utf8');
  const pkgSettings = JSON.parse(pkgFile);
  const settings = {
    version: pkgSettings.version
  };
  await fs.writeFile('settings.json', JSON.stringify(settings, null, 4));
})();
