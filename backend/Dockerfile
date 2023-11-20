FROM maven:3.8.3-openjdk-17 AS build
COPY src /home/kritin/College/SPE/PlaceIt/backend/src
COPY pom.xml /home/kritin/College/SPE/PlaceIt/backend
RUN mvn -f /home/kritin/College/SPE/PlaceIt/backend/pom.xml clean package
EXPOSE 8080
ENTRYPOINT ["java","-jar","/home/kritin/College/SPE/PlaceIt/backend/target/spring_rest_docker.jar"]