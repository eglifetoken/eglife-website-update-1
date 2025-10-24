#!/bin/sh
# This script contains all the commands needed to push your code to GitHub.

echo ">>> STARTING DEPLOYMENT SCRIPT <<<"

# Step 1: Initialize Git and save all your files
# We'll use a generic commit message.
echo "Initializing Git and saving all files..."
git init
git add .
git commit -m "Pushing project files to GitHub"

# Step 2: Connect to your GitHub repository
# If the connection already exists, it will update it. Otherwise, it will add it.
if git remote get-url origin > /dev/null 2>&1; then
  echo "Remote 'origin' already exists. Updating URL..."
  git remote set-url origin https://github.com/eglifetoken/eglife-website-update-1.git
else
  echo "Adding remote 'origin'..."
  git remote add origin https://github.com/eglifetoken/eglife-website-update-1.git
fi

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
