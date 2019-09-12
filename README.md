# dd

> A Vue.js project

## pull and push
<!-- 2018-7-20 -->
``` bash
1. 当前目录 git bush
2. git init --在本地创建一个本地仓库 ，文件夹中多出一个.git文件夹
3. git config --global user.email "your email" --输入注册阿里云的username和邮箱
4. git config --global user.name "your name" --global 全局注册 告知身份
5. ssh-keygen -t rsa --输入指令，生成ssh key，默认在c:/user/yourcount ./ssh文件夹下面的id_rsa.pub文件里面 拷贝到阿里云CODE
6. git add . --把文件夹下面的文件全部加入仓库
7. git commit -m "提交的描述"
8. git remote add origin git@code.aliyun.com:username/test.git --连接远程仓库 将本地的代码文件添加到阿里云git自己创建的project下面
9. git push -u origin maste --上传代码 -u指全部文件（第一次）

*
+ git pull origin master  --git pull 远端 分支名称 -u 下载项目的最新更改 该命令用于拉取某分支的最新副本 pull代码，push之前先pull
+ git pull --rebase origin master --要是上一条命令无效，执行此（表示仍有文件未merge）

*
+ git clone git@code.aliyun.com:username/test.git --拉取代码
```

*
## 修改代码后提交
+ git init
+ git add .
+ git commit -m "description"
+ git push origin master

### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
