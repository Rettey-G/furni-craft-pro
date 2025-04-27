const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// GitHub repository configuration
// Replace these values with your actual GitHub repository details
const config = {
    repoName: 'FurniCraft-Pro',
    repoUrl: 'https://github.com/YOUR_USERNAME/FurniCraft-Pro.git', // Replace YOUR_USERNAME with your GitHub username
    defaultBranch: 'main',
    commitMessage: 'Auto-push: Update application files'
};

// Check if .git directory exists
function isGitInitialized() {
    return fs.existsSync(path.join(__dirname, '.git'));
}

// Initialize Git repository if not already done
function initializeGit() {
    try {
        if (!isGitInitialized()) {
            console.log('Initializing Git repository...');
            execSync('git init', { stdio: 'inherit' });
            console.log('Git repository initialized.');
        } else {
            console.log('Git repository already initialized.');
        }
    } catch (error) {
        console.error('Error initializing Git repository:', error.message);
        process.exit(1);
    }
}

// Check if remote exists
function checkRemote() {
    try {
        const remotes = execSync('git remote').toString().trim();
        return remotes.includes('origin');
    } catch (error) {
        return false;
    }
}

// Add remote if not exists
function addRemote() {
    try {
        if (!checkRemote()) {
            console.log('Adding remote repository...');
            execSync(`git remote add origin ${config.repoUrl}`, { stdio: 'inherit' });
            console.log('Remote repository added.');
        } else {
            console.log('Remote repository already exists.');
        }
    } catch (error) {
        console.error('Error adding remote repository:', error.message);
        process.exit(1);
    }
}

// Add all files to Git
function addAllFiles() {
    try {
        console.log('Adding files to Git...');
        execSync('git add .', { stdio: 'inherit' });
        console.log('All files added.');
    } catch (error) {
        console.error('Error adding files:', error.message);
        process.exit(1);
    }
}

// Commit changes
function commitChanges() {
    try {
        // Check if there are changes to commit
        const status = execSync('git status --porcelain').toString();
        if (!status.trim()) {
            console.log('No changes to commit.');
            return false;
        }

        console.log('Committing changes...');
        execSync(`git commit -m "${config.commitMessage}"`, { stdio: 'inherit' });
        console.log('Changes committed.');
        return true;
    } catch (error) {
        console.error('Error committing changes:', error.message);
        process.exit(1);
    }
}

// Push to GitHub
function pushToGitHub() {
    try {
        console.log('Pushing to GitHub...');
        execSync(`git push -u origin ${config.defaultBranch}`, { stdio: 'inherit' });
        console.log('Successfully pushed to GitHub!');
    } catch (error) {
        console.error('Error pushing to GitHub:', error.message);
        
        // Provide guidance for common errors
        if (error.message.includes('Permission denied')) {
            console.log('\nTip: You might need to configure your GitHub credentials. Try the following:');
            console.log('1. Set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh');
            console.log('2. Or use HTTPS with a personal access token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token');
        } else if (error.message.includes('remote already exists')) {
            console.log('\nTip: The remote already exists. If you want to update it, try:');
            console.log('git remote remove origin');
            console.log(`git remote add origin ${config.repoUrl}`);
        } else if (error.message.includes('rejected')) {
            console.log('\nTip: The push was rejected. Try pulling first:');
            console.log(`git pull origin ${config.defaultBranch} --rebase`);
            console.log('Then push again.');
        }
        
        process.exit(1);
    }
}

// Create .gitignore file if not exists
function createGitIgnore() {
    const gitignorePath = path.join(__dirname, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
        console.log('Creating .gitignore file...');
        const gitignoreContent = `
# Dependencies
node_modules/
npm-debug.log
yarn-debug.log
yarn-error.log

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
/build
/dist

# Debug logs
logs
*.log

# OS files
.DS_Store
Thumbs.db

# Editor directories and files
.idea/
.vscode/
*.sublime-project
*.sublime-workspace
`;
        fs.writeFileSync(gitignorePath, gitignoreContent.trim());
        console.log('.gitignore file created.');
    }
}

// Main function to run all steps
function main() {
    console.log('Starting GitHub push process...');
    
    // Create .gitignore
    createGitIgnore();
    
    // Initialize Git
    initializeGit();
    
    // Add remote
    addRemote();
    
    // Add all files
    addAllFiles();
    
    // Commit changes
    const hasChanges = commitChanges();
    
    // Push to GitHub if there are changes
    if (hasChanges) {
        pushToGitHub();
    }
    
    console.log('GitHub push process completed!');
}

// Run the main function
main(); 