# telegram_bot

### Description : 챗봇에 인증 기능 추가

1. 텔레그램 앱에서 동작 
2. 서버는 Node.js 로 구현. 폴링 방식 
3. 빌드는 AWS EC2 에 배포
4. 상품정보, 회원정보 데이타는 Firebase firestore 이용
5. 인증/권한 처리는 Redis 이용

## 봇 설명

1. 기능   : 상품정보를 보여준다. 
2. 봇 URL : http://t.me/pipi_product_bot
3. 작동법
   - 상품목록을 보여준다. (/list)
   - 상품목록에서 상품을 누르면 상품 상세정보를 보여준다. 
   - 뒤로가기 버튼을 누르면 상품목록으로 되돌아간다.
   - 회원가입 (/signup 이메일 패스워드)
   - 로그인   (/login  이메일 패스워드)
   - 로그아웃 (/logout)
   - 인증된 유저만 상품 상세정보를 볼수 있다.    
   - 인증되지 않은 유저는 회원가입을 통해 인증된 유저가 될수 있다. 


### Tech

- Node.js (node-telegram-bot-api)
- 플랫폼 : Telegram Bot API
- 인프라 : AWS, docker, Firebase, Redis 

### Reference

- node-telegram-bot-api: https://github.com/hosein2398/node-telegram-bot-api-tutorial
- firebase: https://firebase.google.com/
- redis: https://redislabs.com

### Commit

- 더미 봇                             : [git checkout 3bf4e74](https://github.com/loveuns/bot_telegram_product/tree/3bf4e74)
- DB 데이타로 변경                    : [git checkout a1cb895](https://github.com/loveuns/bot_telegram_product/tree/a1cb895) 
- 리팩토링 - 컨트롤러와 서비스의 분리 : [git checkout aaf74a6](https://github.com/loveuns/bot_telegram_product/tree/aaf74a6) 
- 회원가입 - 파이어베이스             : [git checkout f8d8755](https://github.com/loveuns/bot_telegram_product/tree/f8d8755) 
- 로그인, 로그아웃 - 레디스           : [git checkout aea5fdb](https://github.com/loveuns/bot_telegram_product/tree/aea5fdb)
- 페이지에 보기권한 추가              :   