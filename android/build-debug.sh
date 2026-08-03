#!/bin/sh
# Build Android di debug, con JDK e SDK installati sotto ~/dev-tools (nessuna modifica al
# sistema, vedi note-ios.md per il contesto completo). Uso: ./android/build-debug.sh
set -e
export JAVA_HOME="$HOME/dev-tools/jdk21/Contents/Home"
export ANDROID_HOME="$HOME/dev-tools/android-sdk"
export PATH="$JAVA_HOME/bin:$PATH"
cd "$(dirname "$0")"
./gradlew assembleDebug
echo "APK: $(dirname "$0")/app/build/outputs/apk/debug/app-debug.apk"
