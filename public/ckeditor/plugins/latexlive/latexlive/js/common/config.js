const Environment = "development";

const Config = {
  development: {
    Version: "开发版" + new Date().getTime(),
    MainJS: {
      latex: "/publish/latex.bundle.min.js"
    },
    Boot_OSS: "..",
    Hostname: "本机服务器ip",
  },

  debug: {
    Version: "生产环境模拟版" + new Date().getTime(),
    MainJS: {
      latex: "/publish/latex.bundle.min.js"
    },
    Boot_OSS: "",
    Hostname: "测试服务器ip+端口号",
  },
  
  release: {
    Version: "1.6.5",
    MainJS: {
      latex: "/publish/latex.bundle.min.js"
    },
    Boot_OSS: "",
    Hostname: "完整网址",
  },
};
