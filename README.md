# 個人部落格 http://leo424y.com
- 結合GitHub GraphQL API，免費開源、開箱即用；
- 響應式佈局，完美適配不同螢幕尺寸；
- 全新技術棧，持續更新升級；
- 面向人群：工程師、設計師、產品經理等。

## 開箱即用

#### 安裝

```shell
git clone git@github.com:leo424y/blog.git
cd blog
yarn
yarn start
```

執行完上面四個步驟，開啟瀏覽器訪問 http://0.0.0.0:8097 即可預覽我的部落格。

#### 修改

1. 進入**config/githubConfig.js** 修改github access token，如何獲取token請檢視我這篇文章：[如何利用GitHub GraphQL API開發個人部落格？](https://github.com/simbawus/blog/issues/11)。
2. 進入**tools/release.sh**修改你的伺服器配置，主要是修改下面這段，別忘了要在你電腦上配置你的伺服器的ssh登入哦！

```shell
root@115.28.222.218:/alidata/www/leo424y/simba/blog
```

兩步修改即可上線你的個人部落格啦！當然，可以進行個性化定製。

#### 上線

```shell
yarn deploy
```

執行上述命令，即可完成專案釋出。是不是So easy ？

之後，只需要將寫好的Markdown格式文章，新建一個Issue，就可以在部落格裡檢視了。

## 一起搞事情

- 如果你是產品經理，對部落格的使用者需求、使用者體驗有獨到的見解，歡迎貢獻你的想法；
- 如果你是設計師，有前沿的設計審美、極致的設計追求，歡迎展現你的美；
- 如果你是工程師，技術過硬、熱衷開源，歡迎跟牛逼的產品和設計一起打造一流的個人部落格。

讓我們跟大牛們一起，做點不一樣的事情。歡迎加我微信：**leo424y610**。

## Thanks

謝謝大家，歡迎Star & Fork  ｡◕‿◕｡
