// Prevent Mocha from compiling styles
function noop() {
  return null;
}

require.extensions['.css'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.less'] = noop;
require.extensions['.styl'] = noop;
