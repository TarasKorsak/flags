module.exports = {
    syntax: "postcss-scss",
    plugins: [
        require("postcss-easy-import")({
            extensions: ".scss"
        }),
        require("autoprefixer")({
            browsers: ["> 0.5%"],
            cascade: false
        }),
        require("postcss-advanced-variables"),
        require("postcss-nested"),
        require("cssnano")()
    ]
};