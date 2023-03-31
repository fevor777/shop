module.exports = function (config) {
  config.set({
    coverageReporter: {
      dir: require("path").join(__dirname, "dist/coverage/app-coverage"),
      subdir: ".",
      reporters: [
        { type: "html" },
        { type: "text-summary" },
        { type: "cobertura" },
      ],
    },
  });
};
