#!/usr/bin/env bash
set -e

if [ "$TRAVIS_PULL_REQUEST" != "false" ] || [ "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

git clone $REPO deploy
cd deploy
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH

rm -vrf ./*

cp -v ../deploy_key.enc .
cp -vr ../_site/hp/* .

# If there are no changes to the compiled out (e.g. this is a README update) then just bail.
if [ -z $(git diff --exit-code) ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

git add -A

git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git commit -m "Deploy to GitHub Pages: ${SHA}"

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval $(ssh-agent -s)
ssh-add deploy_key

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH
