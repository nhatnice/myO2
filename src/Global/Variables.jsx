import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    ...(process.env.REACT_APP_FIREBASE_DATABASE_URL ? { databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL } : {})
};

export const Firebase = firebase.initializeApp(firebaseConfig);
export const FirebaseAnalytics = firebase.analytics();
export const Database = Firebase.database();
export const messaging = firebase.messaging();

export function findWithAttr(array, attr, value) {
    if(array) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
    }
    return -1;
}
    
export const cities = [
    {
        title: 'TP. Hồ Chí Minh',
        id: 0
    }
]

export const districts = [
    {
        title: 'Quận 1',
        id: 0
    },
    {
        title: 'Quận 2',
        id: 1
    },
    {
        title: 'Quận 3',
        id: 2
    },
    {
        title: 'Quận 4',
        id: 3
    },
    {
        title: 'Quận 5',
        id: 4
    },
    {
        title: 'Quận 6',
        id: 5
    },
    {
        title: 'Quận 7',
        id: 6
    },
    {
        title: 'Quận 8',
        id: 7
    },
    {
        title: 'Quận 9',
        id: 8
    },
    {
        title: 'Quận 10',
        id: 9
    },
    {
        title: 'Quận 11',
        id: 10
    },
    {
        title: 'Quận 12',
        id: 11
    },
    {
        title: 'Q. Bình Tân',
        id: 12
    },
    {
        title: 'Q. Bình Thành',
        id: 13
    },
    {
        title: 'Q. Gò Vấp',
        id: 14
    },
    {
        title: 'Q. Phú Nhuận',
        id: 15
    },
    {
        title: 'Q. Tân Bình',
        id: 16
    },
    {
        title: 'Q. Tân Phú',
        id: 17
    },
    {
        title: 'Q. Thủ Đức',
        id: 18
    },
    {
        title: 'Huyện Bình Chánh',
        id: 19
    },
    {
        title: 'Huyện Cần Giờ',
        id: 20
    },
    {
        title: 'Huyện Củ Chi',
        id: 21
    },
    {
        title: 'Huyện Hóc Môn',
        id: 22
    },
    {
        title: 'Huyện Nhà Bè',
        id: 23
    },
    {
        title: 'Quận Khác',
        id: 24
    }
]

//SERVICE WORKERS
//#region 
// I added a function that can be used to register a service worker.
export const showNotification = async (title, option) => {
    const registerServiceWorker = async () => {
        const swRegistration = await navigator.serviceWorker.register('./serviceWorker.js'); //notice the file name
        return swRegistration;
    }
    
    const requestNotificationPermission = async () => {
      const permission = await window.Notification.requestPermission();
      // value of permission can be 'granted', 'default', 'denied'
      // granted: user has accepted the request
      // default: user has dismissed the notification permission popup by clicking on x
      // denied: user has denied the request.
    //   if(permission !== 'granted'){
    //       throw new Error('Permission not granted for Notification');
    //   }
    }
    
    //Request permissions
    const swRegistration = await registerServiceWorker();
    const permission =  await requestNotificationPermission();
    
    const showLocalNotification = (title, body) => {
      const options = {
          body,
          // here you can add more properties like icon, image, vibrate, etc.
      };
    //   swRegistration.showNotification('Vibration Sample', {
    //     body: 'Buzz! Buzz!',
    //     vibrate: [200, 100, 200, 100, 200, 100, 200],
    //     tag: 'vibration-sample'
    //   });
      swRegistration.showNotification(title, options);
    }

    showLocalNotification(title, option);
}
//#endregion

export const snapToArray = (snap) => {
    var keys = [];
    var counts = [];

    snap.forEach(function(item) {
        let itemVal = item.val();
        keys.push(itemVal);
    });
    for (var i=0; i < keys.length; i++) {
        counts.push(keys[i]);
    }

    return counts;
}

export const randomId = length => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
   }
   return result;
}