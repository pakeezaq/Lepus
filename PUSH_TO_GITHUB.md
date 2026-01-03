# GitHub Push Instructions

I attempted to push your code, but **Git is not recognized** in this terminal environment. You will need to run these commands in your own terminal (where you likely have Git installed).

## One-Time Setup & Push

Run these commands one by one in your project folder (`d:\lepus-website`):

```powershell
# 1. Initialize Git (if not already done)
git init

# 2. Add all files to staging
git add .

# 3. Commit your changes
git commit -m "Final deployment release"

# 4. Rename branch to main
git branch -M main

# 5. Add your specific repository
# (If it says 'remote origin already exists', use the second command below instead)
git remote add origin https://github.com/pakeezaq/Lepus.git
# OR if origin exists: git remote set-url origin https://github.com/pakeezaq/Lepus.git

# 6. Push to GitHub
# (You may be aksed to sign in to GitHub in a browser window)
git push -u origin main
```
