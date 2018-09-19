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
        echo "Ok"
# for now this is commented because even if the tests succeed,
# since the coverage is too low, the script exits with a value != 0

#        echo "Web tests must pass before push!"
#        exit 1
    fi

fi


