# Lucky Restaurant

---

## 目录

1. 项目简介
2. 项目使用效果图
3. 安装说明
4. 关于作者

## 1. 项目简介

此项目是为了给餐饮行业从业人员开发的一个外卖订单系统。此项目一共有 5 个模块，分别为：

1. 供用户浏览本店各种分类及菜品，同时提供加入购物车下单的服务
2. 供店家登录后台管理页面，增加删除本店菜品分类机器下的菜品
3. 供店家登录后台管理页面，查看新增的客户订单详细信息
4. 商家自动登录，超时自动退出功能
5. 商家可通过对应的密钥来创建多个管理账户


帮助了餐饮行业从业者，能更广泛便捷，且低费率的情况下获得更多顾客和订单。

## 2. 效果图
顾客浏览菜品，添加购物车，修改购物车内菜品数量，确认下订单
![makeOrder](https://img-blog.csdnimg.cn/20210720195924516.gif)

商家注册，登录管理后台，新增分类菜品，删除菜品
![login](https://img-blog.csdnimg.cn/20210720203658470.gif)

商家在后台管理界面，查看顾客订单信息，同时更改订单完成状态，来更好的管理顾客订单
![checkOrders](https://img-blog.csdnimg.cn/20210720203718757.gif)

## 3. 安装说明

### 环境依赖

node v14.0.0+

### 部署安装

1. 创建属于你自己的 Firebase Project： check => https://console.firebase.google.com/
   ![image](https://img-blog.csdnimg.cn/20210428211607145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)
2. 创建完 Project 之后，创建属于你自己的 Realtime Database， 并获取到你 database 的 api 链接， 复制到记事本，以备稍后使用
   ![image](https://img-blog.csdnimg.cn/20210428211553275.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)
3. 启用邮箱验证登录功能
   ![image](https://img-blog.csdnimg.cn/20210428211703131.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)

4. 点击项目概览小齿轮下的项目设置，以获取登录验证 api 密钥，复制到记事本，以备稍后使用
   ![image](https://img-blog.csdnimg.cn/20210428212050495.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)

plus： 查看 [Firebase Auth REST Api](https://firebase.google.com/docs/reference/rest/auth?authuser=0#section-create-email-password). 对应的用户注册和登记 api 链接
![image](https://img-blog.csdnimg.cn/20210428213455260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjY1NTcxNw==,size_16,color_FFFFFF,t_70)

5. 替换 utility_funcs 文件夹中 auth_related API 文件中开头的 API_KEY 为步骤 4 中复制好的 api key
6. 替换 utility_funcs 文件夹中 meal_related API 文件中开头的 baseUrl 为步骤 2 中复制好的 url
7. 替换 utility_funcs 文件夹中 order_related API 文件中开头的 baseUrl 为步骤 2 中复制好的 url
8. npm install //安装 node 运行环境
9. npm start // 在开发模式下启动项目
10. npm build // 构建生产环境文件 (可选)

## 4. 关于作者

Robert Sun

Email: robertsunzhe@hotmail.com

Tel: 18911604329
