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

`subjects.json` - the course list and description
```json
{
  "id": "id here",
  "title": "Course Name",
  "text": "Course Description",
  "img": "Course image (put in images/)"
}
```
