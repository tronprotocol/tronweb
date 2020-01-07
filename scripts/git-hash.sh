#!/bin/sh
{   git diff-index --name-only HEAD
    git ls-files -o --exclude-standard
} \
| while read path; do
    test -f "$path" && printf "100644 blob %s\t$path\n" $(git hash-object -w "$path");
    test -d "$path" && printf "160000 commit %s\t$path\n" $(cd "$path"; git rev-parse HEAD);
done | sed 's,/,\\,g' | git mktree --missing
