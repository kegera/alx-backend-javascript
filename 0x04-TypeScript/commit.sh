#!/bin/bash

# Add all files to the staging area
git add .

# Commit and push each file individually
for file in $(git diff --name-only --cached); do
    if [ "$file" != "commit.sh" ]; then
        git add $file
        git commit -m "Update $file"
        git push origin master
    fi
done

