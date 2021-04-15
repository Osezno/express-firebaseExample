
const admin = require('firebase-admin');
const serviceAccount = require('./ecb2021-42260-firebase-adminsdk-wtw47-33ea04416f.json');
const fire_config = require('./firebase_config');

let admin_fire_config = {
    credential:  admin.credential.cert(serviceAccount),
    ...fire_config
};

admin.initializeApp(admin_fire_config);

const fireStore = admin.firestore();


module.exports = {
    registerUserData:(uid,nombre) => fireStore.collection('carros').doc(uid).collection("userData").add({
        nombre:nombre,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    }),
    getCars: () => fireStore.collection('carros').get(),    
    createCar:(data) => fireStore.collection('carros').add(data)
};
