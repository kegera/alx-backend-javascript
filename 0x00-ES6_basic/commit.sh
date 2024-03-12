# Get the list of files in the directory
files=$(ls)

# Loop through each file, add it, and commit with a unique message
for file in $files
do
    # Add the file to the staging area
    git add $file
    
    # Commit the file with a unique message
    git commit -m "Update $file"
done

# Push the changes to the remote repository
git push
