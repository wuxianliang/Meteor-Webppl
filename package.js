Package.describe({
  name: 'wuxianliang:webppl-compiler',
  summary: "Webppl, a probabilistic programming language for web.",
  version: "0.0.1",
  git: "https://github.com/wuxianliang/Meteor-Webppl.git"
});

Package._transitional_registerBuildPlugin({
  name: "compileWebppl",
  use: [],
  sources: [
    'plugin/compileWeppl.js'
  ],
  npmDependencies: {
    "webppl": "0.3.1"
  }
});

Package.on_use(function(api, where) {
  //api.export("prelude");
  //api.add_files("prelude-browser-min.js", ["server", "client"]);
  //api.add_files("requirePrelude.js", ["server", "client"]);
});
