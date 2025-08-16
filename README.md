# EGLIFE WEBSITE - Firebase Studio Project

This project was created in Firebase Studio.

---

## How to Deploy Your Website Live

Follow these steps to get your project code from your computer to GitHub, and then deploy it online.

### Step 1: Set Up Your Project Locally

You must have the project files on your computer. If you do not, please download a ZIP of your project from Firebase Studio and unzip it. You also need to have [Git](https://git-scm.com/downloads) installed on your computer.

### Step 2: Run Deployment Commands in Your Terminal

Open a terminal (Command Prompt on Windows, or Terminal on macOS) and navigate to your project's folder using the `cd` command.

For example:
```bash
cd path/to/your/project/folder
```

Once you are inside your project's directory in the terminal, run the following commands one by one. Copy each command, paste it into the terminal, and press Enter.

**1. Initialize Git:** This prepares your folder to be a Git repository.
```bash
git init
```

**2. Add All Files:** This stages all your project files to be saved.
```bash
git add .
```

**3. Save Your Files:** This creates a "commit" or a save point for your files.
```bash
git commit -m "Initial project setup from Firebase Studio"
```

**4. Connect to Your GitHub Repository:** This tells Git where to send the files online.
```bash
git remote add origin https://github.com/eglifetoken/EGLIFE-WEBSITE.git
```
*If you see an error that says `remote origin already exists`, run this command instead to update it:*
```bash
git remote set-url origin https://github.com/eglifetoken/EGLIFE-WEBSITE.git
```

**5. Rename the Branch to `main`:** This is the standard name for the primary branch.
```bash
git branch -M main
```

**6. Push Your Code to GitHub:** This uploads all your files to your GitHub repository.
```bash
git push -u origin main
```

### Step 3: Deploy on Netlify

After your code is successfully pushed to GitHub, go to [Netlify](https://www.netlify.com/) to connect your repository and deploy your site.
