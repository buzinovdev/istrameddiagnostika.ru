module.exports = {
  apps: [
    {
      name: 'istramed',
      port: '3001',
      exec_mode: 'cluster',
      instances: 'max',
      script: './server/index.mjs',
      args: "node"
    }, {
      name: "istramed-api",
      port: '8001',
      exec_mode: "cluster",
      instances: "1",
      script: "./api/index.js",
      args: "start",
    },
  ],
};