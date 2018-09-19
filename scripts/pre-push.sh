#!/usr/bin/env bash

scripts/test-dist-node.sh
if [ $? -ne 0 ]
then
    echo "Node tests must pass before push!"
    exit 1
else
    scripts/test-src-web.sh
    if [ $? -ne 0 ]
    then
        echo "Web tests must pass before push!"
        exit 1
    fi
fi


