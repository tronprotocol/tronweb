#!/usr/bin/env bash

cp -r test-setup/src-web.js test-setup/index.js

node_modules/.bin/karma start --single-run  --browsers ChromeHeadless,Firefox,Edge
