FROM openjdk:11.0.7-jre-slim
EXPOSE 8080
WORKDIR /var/historymap/
ENTRYPOINT ["java", "-jar", "/var/historymap/historymap.jar"]
ARG JAR_FILE
ADD target/${JAR_FILE} /var/historymap/historymap.jar