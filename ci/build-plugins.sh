#!/bin/bash
set -e

echo "🔧 Building Strapi plugins..."

PLUGINS=("opening-hours")

for PLUGIN in "${PLUGINS[@]}"; do
  echo "📦 Building plugin: $PLUGIN"
  pushd "src/plugins/$PLUGIN" > /dev/null

  if [ -f "package.json" ]; then
    npm i
    npm run build
  else
    echo "⚠️  No package.json found in $PLUGIN, skipping."
  fi

  popd > /dev/null
done

echo "✅ All plugins built successfully."