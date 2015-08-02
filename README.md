# Meta Hydra

Hydra like self replicating programs, for kicks.

Note this doesn't actually do anything useful and should be used with caution!

Read the source first.

```sh
# Setup the project
node index.js setup

# Start multiplying
node index.js multiply

# Multiply with levels
node index.js multiply --levels=5

# Using levels greater than or equal to 5 requires --seriously
# 5 levels equates to 62 files generated
node index.js multiply --levels=5 --seriously

# Reset
rm -rf children/ && node index.js setup
```
