// libs
require('./lib/spa.min.js');

// views
require('./views/guide.js');
require('./views/search.js');
require('./views/my.js');
require('./views/home.js');
require('./views/login.js');
require('./views/menu.js');
require('./views/register.js');
require('./views/index.js');

// config
SPA.config({
	indexView: 'guide'
});
