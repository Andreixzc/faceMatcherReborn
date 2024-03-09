const proxy = [
    {
      context: '/api',
      target: 'ttp://ec2-18-231-174-121.sa-east-1.compute.amazonaws.com:9090',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;