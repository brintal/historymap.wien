FROM openjdk:11
EXPOSE 8080
WORKDIR /var/historymap/
ENTRYPOINT ["java", "-jar", "/var/historymap/historymap.jar", "-XX:+UseContainerSupport"]
ARG JAR_FILE
ADD target/${JAR_FILE} /var/historymap/historymap.jar