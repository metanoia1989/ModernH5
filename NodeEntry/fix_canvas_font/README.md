# 运行方式
在当前目录下运行一下目录，就能在当前目录看到文件输出了
```sh
# 先构建镜像
$ docker build -t canvas .
# 运行容器
$ docker run --privileged -d -v $(pwd):/bot --name fix_font canvas
# 查看日志
$ docker logs -f fix_font
```