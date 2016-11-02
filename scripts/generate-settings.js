const fs = require('fs-promise');

(async  () => {
  const version = await fs.readFile('VERSION', 'utf8');
  const settings = {
    version
  };
  await fs.writeFile('settings.json', JSON.stringify(settings, null, 4));
})();
