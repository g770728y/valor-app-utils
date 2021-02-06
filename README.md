# valor-app-utils

在做项目过程中, 逐步总结的`utils`方法\

注意: 仅当`rambda` 或 `rambdax` 中找不到相应用法时, 才在这里添加

## build

默认 yarn build 是构建 esm 包,供 browser 使用, 如果想在 node 中使用则必须使用 node13.7 以上
或者 yarn build_cjs 则可打出同时供 browser + node 使用的 cjs 包, 但问题是不支持 vite
