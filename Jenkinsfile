pipeline
{
    environment
    {
        BACKEND_IMAGE_NAME = "chinmay1104/backend"
        FRONTEND_IMAGE_NAME = "chinmay1104/frontend"
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
        stage('Stage 3: Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }
        stage('Stage 4: Build Backend Docker Image') {
            steps {
                script {
                    docker.build(env.BACKEND_IMAGE_NAME, './backend') 
                }
            }
        }
        stage('Stage 5: Build Frontend Docker Image') {
            steps {
                script {
                    docker.build(env.FRONTEND_IMAGE_NAME, './frontend') 
                }
            }
        }
        stage('Stage 6: Build and Push Backend Docker Image') {
            steps {
                script {
                    def backendImage = docker.build(env.BACKEND_IMAGE_NAME, './backend')
                    docker.withRegistry('', 'DockerHubCred') {
                        backendImage.push('latest')
                    }
                }
            }
        }
        stage('Stage 7: Build and Push Frontend Docker Image') {
            steps {
                script {
                    def frontendImage = docker.build(env.FRONTEND_IMAGE_NAME, './frontend')
                    docker.withRegistry('', 'DockerHubCred') {
                        frontendImage.push('latest')
                    }
                }
            }
        }
        stage('Stage 8: Clean Docker Images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
    }
}