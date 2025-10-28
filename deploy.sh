#!/bin/sh
# This script contains all the commands needed to push your code to GitHub.

echo ">>> STARTING DEPLOYMENT SCRIPT <<<"

# IMPORTANT: Replace this with your actual GitHub Personal Access Token
# It should start with "ghp_"
PERSONAL_ACCESS_TOKEN="YOUR_PERSONAL_ACCESS_TOKEN"

# Check if the token has been set
if [ "$PERSONAL_ACCESS_TOKEN" = "YOUR_PERSONAL_ACCESS_TOKEN" ]; then
  echo ""
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  echo "!!! ERROR: You must edit this script to add your token first. !!!"
  echo "!!! Open deploy.sh and replace 'YOUR_PERSONAL_ACCESS_TOKEN'. !!!"
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  echo ""
  exit 1
fi

# Step 1: Initialize Git and save all your files
# We'll use a generic commit message.
echo "Initializing Git and saving all files..."
git init
git add .
git commit -m "Pushing project files to GitHub"

# Step 2: Ensure the remote is correctly set
# This removes any old remote and adds the correct one, with the token embedded.
echo "Verifying and setting remote 'origin'..."
if git remote | grep -q "origin"; then
  git remote remove origin
fi
git remote add origin "https://eglifetoken:${PERSONAL_ACCESS_TOKEN}@github.com/eglifetoken/eglife-website-update-1.git"

echo "Remote 'origin' is set."
# We won't print the remote URL anymore to avoid showing the token.
# git remote -v

# Step 3: Ensure the branch is named 'main'
echo "Setting branch to 'main'..."
git branch -M main

# Step 4: Push the code to GitHub
echo "Pushing code to GitHub... This may take a moment."
# Using --force to overwrite the remote history.
git push --force origin main

echo ""
echo ">>> SCRIPT FINISHED <<<"
echo "Your code has been pushed to your GitHub repository."
echo "You can now go to Netlify to deploy your site."
