pipeline
{
    environment
    {
        docker_image = ""
    }
    agent any
    tools{
        jdk 'JAVA_HOME'
    }
    stages
    {
        stage('Stage 1: Git Clone')
        {
            steps
            {
                git branch: 'master',
                url:'https://github.com/chinmayparekh/PlaceIt.git'
            }
        }
        stage('Stage 2: Build Backend') {
            steps {
                // Code compilation, testing, and artifact generation for Spring Boot
                sh 'cd backend && mvn clean install'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }
        stage('Build Backend Docker Image') {
            steps {
                script {
                    backendImage = docker.build backendImage, 'backend'
                }
            }
        }
        stage('Build Frontend Docker Image') {
            steps {
                script {
                    frontendImage = docker.build frontendImage, 'frontend'
                }
            }
        }
        stage('Push Backend Image to Hub') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        backendImage.push()
                    }
                }
            }
        }
        stage('Push Frontend Image to Hub') {
            steps {
                script {
                    docker.withRegistry('', 'DockerHubCred') {
                        frontendImage.push()
                    }
                }
            }
        }
    }
}