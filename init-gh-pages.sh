#!/usr/bin/env bash

set -e

git checkout --orphan gh-pages
git rm -rf .
git commit --allow-empty -m "Initial commit"

echo
echo "Now you can push the branch, e.g.:"
echo "  git push origin gh-pages"
echo
