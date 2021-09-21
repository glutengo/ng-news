function setupProxy() {
  const tls = process.env.TLS;
  const conf = [
    {
      context: [
        '/api',
        '/services',
        '/management',
        '/swagger-resources',
        '/v2/api-docs',
        '/v3/api-docs',
        '/h2-console',
        '/auth',
        '/health',
        '/graphql',
      ],
      target: `http${tls ? 's' : ''}://localhost:8080`,
      secure: false,
      changeOrigin: tls,
    },
    {
      context: ['/graphql'],
      target: 'ws' + (tls ? 's' : '') + '://localhost:8080',
      ws: true,
    },
  ];
  return conf;
}

module.exports = setupProxy();
