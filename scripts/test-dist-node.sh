#!/usr/bin/env bash

cp -r test-setup/dist-node.js test-setup/index.js

node_modules/.bin/mocha test/src/**/*js
