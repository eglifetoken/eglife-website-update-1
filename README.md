# EGLIFE WEBSITE - Deployment Guide

This guide will walk you through the final steps to publish your website online. The process involves getting the code from Firebase Studio onto your computer and then pushing it to GitHub using a simple script.

---

## **Part 1: Get Your Project Files**

Before you can deploy, you need all the project files on your local computer.

**Since there is no "Download ZIP" button in Firebase Studio, you will need to manually copy your files.** This can be tedious, but it is a necessary step that you only need to do once.

1.  **Create a Folder:** On your computer's Desktop, create a new folder. Let's name it `eglife-website`.

2.  **Re-create the Files:**
    *   Look at the file list on the left side of the Firebase Studio editor.
    *   For each file and folder listed below, re-create it inside your `eglife-website` folder.
    *   **Carefully copy the entire content** of each file from the Firebase Studio editor and paste it into the corresponding file on your computer.
    *   **It is critical that the folder structure and file contents match exactly.**

### **List of Files and Folders to Copy:**

**Root Files (the files in the main directory):**
- `.env`
- `README.md`
- `components.json`
- `deploy.sh`
- `next.config.ts`
- `package.json`
- `tailwind.config.ts`
- `tsconfig.json`

**Folders:**
- `src` (and all files and folders inside it)

### **IMPORTANT: Do NOT Create This Folder**
- **DO NOT** create a `node_modules` folder. It will be created automatically in the next steps.

---

## **Part 2: Prepare and Deploy to GitHub**

Once all the files are on your computer inside the `eglife-website` folder, you can push them to GitHub.

**Requirements:**
*   You must have [Git](https://git-scm.com/downloads) installed on your computer.
*   You must have [Node.js and npm](https://nodejs.org/en/download/) installed.

### Deployment Steps

Open a terminal (like `Command Prompt`, `PowerShell`, or `Terminal` on a Mac) and follow these steps exactly.

**1. Navigate into Your Project Folder:**

Use the `cd` (change directory) command to move into the folder you created.

```bash
# Example: Replace with the actual path to your folder
cd Desktop/eglife-website
```

**2. Install Dependencies (Crucial Step):**

Run this command to download all the necessary code libraries. This will create the `node_modules` folder for you.

```bash
npm install
```

**3. Make the Script Executable (for Mac/Linux users):**

If you are on a Mac or Linux, you need to give the script permission to run. Skip this step if you are on Windows.

```bash
chmod +x deploy.sh
```

**4. Run the Deployment Script:**

Now, run the script. This will handle all the git commands for you. You will **not** be asked for a password.

*   On Mac or Linux:
    ```bash
    ./deploy.sh
    ```
*   On Windows:
    ```bash
    sh deploy.sh
    ```

The script will initialize Git, save your files, connect to your GitHub repository, and push all the code.

---

## **Part 3: Go Live with Vercel**

After the script finishes and your code is pushed to GitHub, your website is ready to be deployed live on Vercel.

1.  Go to [https://vercel.com](https://vercel.com) and sign up or log in (you can use your GitHub account).
2.  After logging in, click **"Add New..."** and then select **"Project"**.
3.  On the "Import Git Repository" screen, find your **`eglife-website-update-1`** repository and click the **"Import"** button next to it.
4.  Vercel will automatically detect that it's a Next.js project. You don't need to change any settings.
5.  Click **"Deploy"**.

That's it! Vercel will now build your project and deploy it. Once it's finished, you will have a live URL where you can see your website!

### **Adding Environment Variables (Important for EGPAY Services)**

To make sure the EGPAY services (like mobile recharge) work on the live website, you need to add your secret keys to Vercel.

1.  In your Vercel project dashboard, go to **Settings > Environment Variables**.
2.  Add the following variables one by one:
    - `PAYSPRINT_JWT_SECRET`
    - `PAYSPRINT_PARTNER_ID`
    - `PAYSPRINT_UAT_BASE_URL`
    - `PAYSPRINT_AUTHORISED_KEY`
3.  Copy the value for each from your local `.env` file and paste it into Vercel.
4.  After adding all variables, **redeploy** your project from the "Deployments" tab in Vercel to apply the changes.
