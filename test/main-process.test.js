// test.js
const proxyquire = require('proxyquire').noCallThru();
const assert = require('assert');

// Stub the electron package
const appStub = {
  quit: function() {},
  on: function(event, callback) {
    if (event === 'ready') {
      callback();
    }
  }
};
const BrowserWindowStub = function(options) {
  // this.options = options;
  this.loadFile = function(file) {};
  this.webContents = {
    openDevTools: function() {}
  };
};
const electronStub = {
  app: appStub,
  BrowserWindow: BrowserWindowStub
};

// Require the main process file with the stub
const main = proxyquire('../src/index.js', {
  electron: electronStub
});

// Write your tests
describe('main process', function() {
  it('should create a browser window with correct options', function() {
    assert.equal(main.mainWindow.options.width, 800);
    assert.equal(main.mainWindow.options.height, 600);
    assert.equal(main.mainWindow.options.webPreferences.preload, path.join(__dirname, 'preload.js'));
  });
});
