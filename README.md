# react-dashing-background

Widely configurable background generator based on canvas. 


## Demo & Examples

Live demo: [jakub-gawlas.github.io/react-dashing-background](http://jakub-gawlas.github.io/react-dashing-background/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-dashing-background is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-dashing-background.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-dashing-background --save
```


## Usage

```
import DashingBackground from 'react-dashing-background';

const backgroundProps = {
  // Example properties below
}

<DashingBackground {...backgroundProps}>
  <p>Your browser doesn't support canvas</p>
</DashingBackground>
```

### Properties

* Example

```
{
  gradient: {
    stops: [
      {
        offset: 0,
        color: 'rgb(28,82,123)'
      },
      {
        offset: 1,
        color: 'rgb(18,53,80)'
      }
    ]
  },
  lines: {
    width: 2,
    color: 'rgb(47,115,162)',
    interval: 200,
    angle: Math.PI/2,
    offset: {
      x: 0,
      y: 0
    },
    dash: {
      segments: [10, 12],
      offset: 0
    },
    shadow: {
      color: 'white',
      blur: 0,
      offset: {
        x: 0,
        y: 0
      }
    }
  }
}
```

### Notes

Background adjusts dimensions to the parent node.


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

MIT

Copyright (c) 2016 Jakub Gawlas.

