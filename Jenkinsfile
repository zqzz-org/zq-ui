pipeline {
  agent any

  options {
    disableConcurrentBuilds()
    timestamps()
  }

  environment {
    CI = 'true'
    HUSKY = '0'
  }

  stages {
    stage('Install') {
      steps {
        sh 'corepack enable'
        sh 'corepack prepare pnpm@11.7.0 --activate'
        sh 'pnpm install --frozen-lockfile'
      }
    }

    stage('Quality') {
      parallel {
        stage('Format') {
          steps {
            sh 'pnpm format:check'
          }
        }

        stage('Lint') {
          steps {
            sh 'pnpm lint:check'
          }
        }

        stage('Typecheck') {
          steps {
            sh 'pnpm typecheck'
          }
        }
      }
    }

    stage('Test') {
      steps {
        sh 'pnpm test:run'
      }
    }

    stage('Build') {
      parallel {
        stage('Playground') {
          steps {
            sh 'pnpm build'
          }
        }

        stage('Docs') {
          steps {
            sh 'pnpm docs:build'
          }
        }
      }
    }

    stage('Package Dry Run') {
      steps {
        sh 'pnpm pack:dry-run'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'dist/**,docs/.vitepress/dist/**', allowEmptyArchive: true
    }
  }
}
