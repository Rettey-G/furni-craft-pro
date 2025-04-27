# GitHub Setup for FurniCraft Pro

This guide will help you set up your FurniCraft Pro project with GitHub for version control and continuous integration.

## Initial GitHub Setup

1. Create a GitHub account if you don't have one at [github.com](https://github.com/).

2. Create a new repository:
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `FurniCraft-Pro`
   - Description: `Furniture Design and Calculation Web Application with 3D Visualization`
   - Choose Public or Private depending on your preference
   - Click "Create repository"

3. Set up your Git credentials on your computer:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

4. Update the `github-push.js` file with your GitHub username:
   - Open `github-push.js`
   - Update the `repoUrl` value with your GitHub username:
     ```js
     repoUrl: 'https://github.com/YOUR_USERNAME/FurniCraft-Pro.git',
     ```

## Using the GitHub Push Script

We've added a convenient script to automatically push changes to GitHub:

```bash
npm run push
```

This script will:
1. Initialize Git repository (if not already done)
2. Create a proper `.gitignore` file
3. Add all files to Git
4. Commit changes with a standard message
5. Push to GitHub

## Manual Git Commands (Alternative)

If you prefer to use Git commands directly:

1. Initialize a Git repository (only needed once):
   ```bash
   git init
   ```

2. Add all files to Git:
   ```bash
   git add .
   ```

3. Commit your changes:
   ```bash
   git commit -m "Your commit message here"
   ```

4. Add GitHub remote (only needed once):
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/FurniCraft-Pro.git
   ```

5. Push to GitHub:
   ```bash
   git push -u origin main
   ```

## Continuous Integration

The repository includes a GitHub Actions workflow in `.github/workflows/ci.yml` that will:

1. Run automated tests when you push changes
2. Check for syntax errors
3. Create a deployable artifact

You can see the results of these automated processes in the "Actions" tab of your GitHub repository.

## Common Issues and Solutions

### Authentication Failed

If you see "Authentication failed" when pushing to GitHub:

1. Create a Personal Access Token:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate a new token with "repo" scope
   - Copy the token

2. Use the token when pushing:
   ```bash
   git push https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/FurniCraft-Pro.git main
   ```

### Branch Name Issues

If you have a "master" branch instead of "main":

```bash
git branch -M main
git push -u origin main
```

### Other Problems

For other Git-related issues, see the [GitHub documentation](https://docs.github.com/en/get-started). 