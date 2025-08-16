# EGLIFE WEBSITE - Deployment Guide

This guide will walk you through the final steps to publish your website online. The process involves getting the code from Firebase Studio onto your computer and then pushing it to GitHub.

---

## **Part 1: Get Your Project Files**

Before you can deploy, you need all the project files on your local computer.

**Since there is no "Download ZIP" button in Firebase Studio, you will need to manually copy your files.** This can be tedious, but it is a necessary step.

1.  **Create a Folder:** On your computer's Desktop, create a new folder. Let's name it `eglife-website`.
2.  **Re-create the Files:**
    *   Look at the file list on the left side of the Firebase Studio editor.
    *   For each file and folder, re-create it inside your `eglife-website` folder.
    *   **Carefully copy the entire content** of each file from the Firebase Studio editor and paste it into the corresponding file on your computer.
    *   **It is critical that the folder structure and file contents match exactly.**

---

## **Part 2: Deploy to GitHub from Your Computer**

Once all the files are on your computer inside the `eglife-website` folder, you can push them to GitHub.

**Requirements:**
*   You must have [Git](https://git-scm.com/downloads) installed on your computer.

### Deployment Steps

Open a terminal (like `Command Prompt`, `PowerShell`, or `Terminal` on a Mac) and follow these steps exactly.

**1. Navigate into Your Project Folder:**

Use the `cd` (change directory) command to move into the folder you created.

```bash
# Example: Replace with the actual path to your folder
cd Desktop/eglife-website
```

**2. Run the Deployment Commands:**

Copy and paste these commands into your terminal one by one, pressing `Enter` after each one.

```bash
# Initializes Git in your folder
git init

# Adds all your files to be saved
git add .

# Saves your files with a message
git commit -m "Final project files ready for deployment"

# Connects your folder to the GitHub repository
git remote add origin https://github.com/eglifetoken/EGLIFE-WEBSITE.git

# IMPORTANT: If the above command gives an error saying "remote origin already exists",
# run this command instead to update it:
# git remote set-url origin https://github.com/eglifetoken/EGLIFE-WEBSITE.git

# Renames your primary branch to 'main'
git branch -M main

# Pushes your code to GitHub. This will upload all the files.
git push -u origin main --force
```

---

## **Part 3: Go Live with Netlify**

After your code is successfully pushed to GitHub, your website is ready to be deployed live. Your project is already configured to work with Netlify.

1.  Go to [https://www.netlify.com/](https://www.netlify.com/) and sign up or log in.
2.  Click **"Add new site"** or **"Import an existing project"**.
3.  Choose to deploy from **GitHub**.
4.  Authorize Netlify to access your GitHub account and select your **`EGLIFE-WEBSITE`** repository.
5.  Netlify will automatically detect your settings from the `netlify.toml` file. The build command (`npm run build`) and publish directory (`.next`) should already be filled in.
6.  Click **"Deploy site"**.

Netlify will now build your project and deploy it. Once it's finished, you will have a live URL where you can see your website!
