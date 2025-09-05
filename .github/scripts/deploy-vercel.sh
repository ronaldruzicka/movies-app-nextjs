#!/bin/bash

# Vercel deployment script
# Usage: ./deploy-vercel.sh [--prod]

set -e

# Check if --prod flag is passed
PROD_FLAG=""
if [[ "$1" == "--prod" ]]; then
    PROD_FLAG="--prod"
fi

echo "Starting Vercel deployment with flags: $PROD_FLAG"

# Disable exit on error to capture output
set +e
output=$(pnpm dlx vercel@latest deploy --prebuilt $PROD_FLAG --token "$VERCEL_TOKEN" 2>&1)
exit_code=$?
set -e

echo "Exit code: $exit_code"
echo "Full output:"
echo "$output"

# Extract URLs from output
preview_url=$(echo "$output" | awk '/Preview:/ {print $2}')
deployment_url=$(echo "$output" | awk '/Deployment:/ {print $2}')

# For production, also try to get the production URL from the last line if Preview: not found
if [ -z "$preview_url" ] && [[ "$1" == "--prod" ]]; then
    preview_url=$(echo "$output" | grep -E "https://.*\.vercel\.app" | tail -1)
fi

echo "Extracted preview URL: $preview_url"
echo "Extracted deployment URL: $deployment_url"

# Set GitHub Actions outputs
echo "preview-url=$preview_url" >> $GITHUB_OUTPUT
echo "deployment-url=$deployment_url" >> $GITHUB_OUTPUT

# Only exit with error if deployment actually failed (no URLs found)
if [ -z "$preview_url" ] && [ -z "$deployment_url" ]; then
    echo "Deployment failed - no URLs found"
    exit 1
fi

echo "Deployment completed successfully"
