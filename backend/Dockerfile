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
