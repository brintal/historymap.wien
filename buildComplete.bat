CALL mvn clean install -Dmaven.test.skip=true
cd app
CALL mvn dockerfile:push
cd..
PAUSE
