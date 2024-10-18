module.exports = {
  apps: [
    {
      name: '馅饼',
      script: 'bootstrap.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
