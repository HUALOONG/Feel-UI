# tooling/scripts

构建 / 发布 / 部署脚本目录（不发布，仅项目内使用）。所有脚本以 Node ESM 编写，直接以 `node <path>` 运行。

| 脚本 | 职责 | 用法 |
| --- | --- | --- |
| `build/release.js` | Semantic Release 钩子：校验 git tag 与各包版本一致性，输出发布摘要 | `node build/release.js [--check]` |
| `deploy/docker.js` | 构建并可选推送 Docker 镜像（`container/Dockerfile`） | `node deploy/docker.js [image] [--push]` |
| `deploy/nginx.js` | Nginx 配置模板渲染与校验（`container/nginx.conf`） | `node deploy/nginx.js [--write]` |
