# Use the base OpenJDK 17 image
FROM openjdk:17-jdk-slim AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the packaged JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar /app/app.jar
COPY logs logs
# Expose the port the application runs on
EXPOSE 8081

# Command to run the application when the container starts
CMD ["java", "-jar", "app.jar"]
# sudo docker build -t backend .
# sudo docker run -it -p 8081:8081 --name backend_container backend sh
#The above command wont be able to create the backend container because of its dependeny with MySQL

# sudo docker-compose up
# mysql -h 127.0.0.1 -P 3307 -u root -p
