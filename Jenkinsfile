pipeline {
  agent {
    docker {
      image node
    }
  }

  environment {
    // 自动进行构建不需要进行询问
      CI = 'true'
  }

  stages {
    stage ('开始打包') {
      echo '开始打包...'
      stops {
        sh 'node -v && npm -v'
      }
    }

    stage ('下载依赖') {
      steps {
        sh 'npm i -g pnpm'
        sh 'pnpm i'
      }
    }

    stage('Build') {
      steps {
        sh 'pnpm build'
      }

      post {
        failure {
          mail to: '466064010@qq.com',
             subject: "Failed build: ${currentBuild.fullDisplayName}",
             body: "构建失败, 请查看 ${env.BUILD_URL}"
        }

        success {
          echo '打包成功...'
        }
      }
    }

    stage ('Deploy') {
      steps {
        echo 'Deploying...'
        chmod 775 './bash/deploy.sh'
        sh './bash/deploy.sh'
      }

      post {
        failure {
          mail to: '466064010@qq.com',
             subject: "Failed deploy: ${currentBuild.fullDisplayName}",
             body: "部署失败, 请查看 ${env.BUILD_URL}"
        }

        success {
          echo '部署成功...'
        }
      }
    }
  }
}
