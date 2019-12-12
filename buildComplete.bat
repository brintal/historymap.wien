CALL mvn build-helper:parse-version versions:set -DnewVersion=${parsedVersion.majorVersion}.${parsedVersion.minorVersion}.${parsedVersion.nextIncrementalVersion}-SNAPSHOT versions:commit
CALL mvn clean install -Dmaven.test.skip=true
cd app
CALL mvn dockerfile:push
cd..
PAUSE
