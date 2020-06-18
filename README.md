# 楓下共建成中景 - 2020 建成楓景聯合電資暑訓 網站
*以 [t510599/2018-cscamp](https://github.com/t510599/2018-cscamp.git) 為基礎進行修改。*

《楓下共建成中景》--- 由 建中資訊 INFOR 33rd、成功電研 CKCSC 33rd、中山資研 ZSISC 27th、景美電資 CMIOC 27th 於 2020 年暑假所舉辦的暑期電資營隊。  

<!-- [Official Site](https://cscamp.codes/2018) -->

<!-- ## To start
```bash
# clone the repo
git clone https://github.com/t510599/2018-cscamp
# go into repo directory
cd 2018-cscamp
# install dependencies
npm install
# start server
node app.js/nodemon app.js
``` -->
## Configuration
`.env` - .env檔，要記得自己加
* `PORT` - 網頁的埠口
* `SECRET` - jwt的secret及登入暗碼
* `ADMIN` - 管理員帳號
* `PASSWORD` - 管理員密碼
* `DBCONNECT` - MongoDB的連接網址

## Note
* 電子郵件寄信在apply的route，如果不想弄可以直接刪掉，要弄得話去查一下OAUth(Gmail)，如果有自己的郵件伺服器更方便
* MongoDB可以用本地的或是Atlas(這次是用Atlas)，如果要的話(或很閒)可以改成SQL
* 這次前端的模板是用ejs，放在views，assets放js跟css，files放家同，images放圖片，整個前端的樣式要換掉
* applylist,login,memberInfo可以不用刪
* 表單所需要的資料在model裡的applySchema.js


