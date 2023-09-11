#!/bin/bash
timestamp=$(date +%Y%m%d%H%M%S)
version=$timestamp
imagename=vite-vue
container=vite-vue

echo "执行docker ps"
docker ps

if [[ "$(docker inspect $container 2> /dev/null | grep $container)" != "" ]];
then
  echo $container "容器存在，停止并删除"
  echo "docker stop" $container
  docker stop $container
  echo "docker rm" $container
  docker rm $container
else
  echo $container "容器不存在"
fi

echo "执行docker images"
docker images ps
if [[ "$(docker images -q $imagesname 2> /dev/null)" != "" ]];
then
  echo $imagesname '镜像存在，删除它'
  docker rmi $(docker images -q $imagesname 2> /dev/null)
else
  echo $imagesname '不存在'
fi

docker build --tag $imagename:$version --file ./docker/Dockerfile .
echo "执行docker images"

docker images
# 这里守护形式启动镜像
docker run --name $container -p 80:80 -d $imagename:$version
