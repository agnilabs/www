# agnilabs

This is a simple repo that maintains the agni labs website (made with 🧪 & 🔥 & ♥️)

### Git Configuration for Multiple Remotes

This repository is configured to push to two remote repositories simultaneously:

- [@adiadd/agnilabs-www](https://github.com/adiadd/agnilabs-www) (primary, where Vercel builds happen)
- [@agnilabs/www](https://github.com/agnilabs/www) (organization repo)

To set up your local repository to push to both remotes, run these commands:

```bash
# Set the primary remote URL (for both fetch and first push)
git remote set-url origin git@github.com:adiadd/agnilabs-www.git

# Add the second push URL
git remote set-url --add origin git@github.com:agnilabs/www.git
```

You can verify your configuration with:

```bash
git remote -v
```

This should show:

```
origin  git@github.com:adiadd/agnilabs-www.git (fetch)
origin  git@github.com:adiadd/agnilabs-www.git (push)
origin  git@github.com:agnilabs/www.git (push)
```

Now when you run `git push origin main`, it will push to both repositories automatically.
