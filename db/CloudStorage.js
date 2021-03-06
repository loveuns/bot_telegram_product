require('dotenv').config()
const admin           = require("firebase-admin");
const serviceAccount  = require(process.env.FIREBASE_KEY_FILE);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

const db          = admin.firestore()
const productsRef = db.collection('products')
const userRef     = db.collection('users')

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

 // 회원정보 저장하기
 static async addUser(id, email, password, role) {
  try {
    return await userRef.doc(id.toString()).set({ email, password, role })
  } catch(err) {
    throw new Error('error when CloudStorage.addUser')
  }
}

  // 회원정보 가져오기
  static async getUser(id) {
    try {
      const doc = await userRef.doc(id.toString()).get()
      return Object.assign({id: doc.id}, doc.data())
    } catch(err) {
      throw new Error('error when CloudStorage.addUser')
    }
  }

}