
const admin = require('firebase-admin');
const serviceAccount = require('./ecb2021-42260-firebase-adminsdk-wtw47-33ea04416f.json');
const fire_config = require('./firebase_config');

let admin_fire_config = {
    credential:  admin.credential.cert(serviceAccount),
    ...fire_config
};

admin.initializeApp(admin_fire_config);

const fireStore = admin.firestore();
console.log(fireStore)

module.exports = {
    registerUserData:(uid, userId, program) => fireStore.doc(`carros/${uid}/userData/${userId}`).set({
        ...program,
        createdAt: getTimestamp(),
    }, { merge: true }),
    getCars: () => fireStore.collection('cars'),    
    createCar:(data) => fireStore.collection('carros').add(data)
};
