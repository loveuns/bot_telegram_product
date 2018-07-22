const admin           = require("firebase-admin");
const serviceAccount  = require("./4-fc-chatbot-93c0a-firebase-adminsdk-q8sqq-4e969dce28.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://fc-chatbot-93c0a.firebaseio.com"
});

const db          = admin.firestore()
const productsRef = db.collection('products')

module.exports = class CloudStorage {

  // 상품목록 가져오기
  static async getList() {
    const result = []

    try {
      const products =  await productsRef.get()
      products.forEach(doc => 
        result.push(Object.assign({id: doc.id}, doc.data()))
      )
      return result  
    } catch(err) {
      throw new Error('error when CloudStorage.getList')
    }
  }

  // 상품 상세정보 가져오기
  static async getDetail(id) {
    try {
      const doc = await productsRef.doc(id).get()
      return Object.assign({id: doc.id}, doc.data())
    } catch(err) {
      throw new Error('error when CloudStorage.getDetail')
    }
  }

}