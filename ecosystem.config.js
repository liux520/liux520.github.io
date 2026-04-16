module.exports = {
  apps: [{
    name: 'academic-website',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3000',
    cwd: '/mnt/PersonalWeb',  // '/root/personalweb',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
