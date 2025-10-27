#!/bin/sh
# This script contains all the commands needed to push your code to GitHub.

echo ">>> STARTING DEPLOYMENT SCRIPT <<<"

# Step 1: Initialize Git and save all your files
# We'll use a generic commit message.
echo "Initializing Git and saving all files..."
git init
git add .
git commit -m "Pushing project files to GitHub"

# Step 2: Ensure the remote is correctly set
# This removes any old remote and adds the correct one, forcing authentication as 'eglifetoken'.
echo "Verifying and setting remote 'origin'..."
if git remote | grep -q "origin"; then
  git remote remove origin
fi
git remote add origin https://eglifetoken@github.com/eglifetoken/eglife-website-update-1.git

echo "Remote 'origin' is set to:"
git remote -v

# Step 3: Ensure the branch is named 'main'
echo "Setting branch to 'main'..."
git branch -M main

# Step 4: Push the code to GitHub
echo "Pushing code to GitHub... This may take a moment."
# Using --force-with-lease is safer than a standard --force push.
git push --force-with-lease origin main

echo ""
echo ">>> SCRIPT FINISHED <<<"
echo "Your code has been pushed to your GitHub repository."
echo "You can now go to Netlify to deploy your site."
