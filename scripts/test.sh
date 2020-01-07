#!/usr/bin/env bash

help () {
  echo "
ERROR: Invalid option.

Accepted options (with priority in this order):
    -n             no accounts
Example:
    scripts/test.sh
    scripts/test.sh -n
"
}

ACCOUNTS=1

while getopts "n" opt; do
  case $opt in
    n)
      ACCOUNTS=0
      ;;
    \?)
      help
      exit 1
      ;;
  esac
done

node scripts/test-node.js

if [[ "$ACCOUNTS" == "1" ]]; then
    node test/helpers/newAccounts 50 npm run newaccount
fi

unbuffer npx mocha 'test/**/*.test.js' --exit 2>&1 | tee test-report

REPORT=$(cat test-report | grep failing)

if [[ "$REPORT" == *"failing"* ]]; then
    HASH="Test failed."
else
    HASH=$(scripts/git-hash.sh)
fi

echo $HASH > test-git-hash
