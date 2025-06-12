#!/bin/sh
set -e

echo "🔧 Building Strapi plugins..."

PLUGINS="opening-hours"

for PLUGIN in $PLUGINS; do
  echo "📦 Building plugin: $PLUGIN"
  cd "src/plugins/$PLUGIN" || exit 1

  if [ -f "package.json" ]; then
    npm i
    npm run build
  else
    echo "⚠️  No package.json found in $PLUGIN, skipping."
  fi

  cd - > /dev/null
done

echo "✅ All plugins built successfully."