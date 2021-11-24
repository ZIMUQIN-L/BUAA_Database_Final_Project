module.exports = {
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://localhost:8000/', //接口域名（你请求的第三方接口）
                    changeOrigin: true,             //是否跨域 （虚拟的站点需要更管origin）
                    ws: true,                       //是否代理 websockets
                    secure: true,                   //是否https接口
                    pathRewrite: {                  //路径重置
                        '^/api': ''
                    }
                }
            }
        }
    };