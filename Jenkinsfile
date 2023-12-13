pipeline
{
    environment
    {
        BACKEND_IMAGE_NAME = "kritinp/backend"
        FRONTEND_IMAGE_NAME = "kritinp/frontend"
        DB_IMAGE_NAME = "mysql:latest"
        DB_CONTAINER_NAME = "test_db"
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
        stage('Stage 2: Setup Test DB') {
            steps {
                // Start a MySQL container for testing
                sh 'docker run --name ${DB_CONTAINER_NAME} -e MYSQL_ROOT_PASSWORD=password -d ${DB_IMAGE_NAME}'

                // Wait for the database to start
                sh 'sleep 30'
            }
        }
        stage('Stage 3: Test Backend') {
            steps {
                // Run unit tests
                sh 'cd backend && mvn test'
            }
        }
        stage('Stage 4: Delete Test DB') {
            steps {
                // Stop and remove the MySQL container
                sh 'docker rm -f ${DB_CONTAINER_NAME}'
            }
        }
        
        stage('Stage 5: Build and Push Backend Docker Image') {
            steps {
                script {
                    def backendImage = docker.build(env.BACKEND_IMAGE_NAME, './backend')
                    docker.withRegistry('', 'DockerHubCred') {
                        backendImage.push('latest')
                    }
                }
            }
        }
        stage('Stage 6: Build and Push Frontend Docker Image') {
            steps {
                script {
                    def frontendImage = docker.build(env.FRONTEND_IMAGE_NAME, './frontend')
                    docker.withRegistry('', 'DockerHubCred') {
                        frontendImage.push('latest')
                    }
                }
            }
        }
        stage('Stage 7: Clean Docker Images') {
            steps {
                script {
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Stage 8: Ansible Deployment')
        {
            steps
            {   
                ansiblePlaybook becomeUser: null,
                colorized: true,
                credentialsId: 'localhost',
                disableHostKeyChecking: true,
                installation: 'Ansible',
                inventory: 'Deployment/inventory',
                playbook: 'Deployment/deploy.yml',
                sudoUser: null
            }
        }
    }
}