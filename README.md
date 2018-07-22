# telegram_bot

### Description : 챗봇에 인증 기능 추가

1. 텔레그램 앱에서 동작 
2. 서버는 Node.js 로 구현. 폴링 방식 
3. 빌드는 AWS EC2 에 배포
4. 상품 정보 데이타는 Firebase firestore 이용

## 봇 설명

1. 기능   : 상품정보를 보여준다. 
2. 봇 URL : http://t.me/pipi_product_bot
3. 작동법
   - /start : 상품목록을 보여준다. 
   - 상품목록에서 상품을 누르면 상품 상세정보를 보여준다. 
   - 뒤로가기 버튼을 누르면 상품목록으로 되돌아간다.
   - 인증된 유저만 상품 상세정보를 볼수 있수 있다. 
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

- 더미 봇 : [git checkout 3bf4e74](https://github.com/loveuns/bot_telegram_product/tree/3bf4e74327e76ecc17ec170da1e638b6b610322b)
