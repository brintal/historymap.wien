#!/bin/sh

mvn build-helper:parse-version versions:set -DnewVersion=\${parsedVersion.majorVersion}.\${parsedVersion.minorVersion}.\${parsedVersion.nextIncrementalVersion}-SNAPSHOT versions:commit
mvn clean install -Dmaven.test.skip=true
cd app
mvn dockerfile:push
cd ..
echo