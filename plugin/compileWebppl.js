(function () {

/* Package-scope variables */
var options;

(function () {

///////////////////////////////////////////////////////////////////////
//                                                                   //
// plugin/compile-livescript.js                                      //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
var fs = Npm.require('fs');                                          // 1
var path = Npm.require('path');                                      // 2
var webppl = Npm.require('webppl');                          // 3
                                                                     // 4
var handler = function (compileStep) {                               // 5
  var source = compileStep.read().toString('utf8');                  // 6
  var outputFile = compileStep.inputPath + ".js";                    // 7
                                                                     // 8
  options = {                                                        // 9
  //  bare: true                                                       // 10
  };                                                                 // 11
                                                                     // 12
  try {                                                              // 13
    function printWebPPLValue(x) {
      if (isErp(x)) {
        x.print();
      } else {
        console.log(x);
      }
    }                                                               // 13
    var compiledCode = webppl.compile(source, options);
    var output = 'var webppl = Meteor.npmRequire("' + "webppl" + '");\n';
    output += (
      printWebPPLValue.toString() + '\n' +
      'var topK = function(s, x){ \n' +
      " console.log('\\n* Program return value:\\n'); \n" +
      ' printWebPPLValue(x); \n};\n\n');
    output += 'var main = ' + compiledCode + '\n\n';
    output += "main({}, topK, '');";                // 14
  } catch (e) {                                                      // 15
    throw new Error(                                                 // 16
      compileStep.inputPath + ':' +                                  // 17
      (e.location ? (e.location.first_line + ': ') : ' ') +          // 18
      e.message                                                      // 19
    );                                                               // 20
  }                                                                  // 21
                                                                     // 22
  compileStep.addJavaScript({                                        // 23
    path: outputFile,                                                // 24
    sourcePath: compileStep.inputPath,                               // 25
    data: output                                                     // 26
  });                                                                // 27
};                                                                   // 28
                                                                     // 29
Plugin.registerSourceHandler('wppl', handler);                         // 30
///////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.compileLiveScript = {};

})();

//# sourceMappingURL=compileLiveScript:plugin.js.map
