//export const target = process.env.NODE_ENV !== 'production' ? 'http://192.168.0.247:804/' : 'http://didi.360che.com/saas/'; 

var urlS = true;

if(urlS){
    urlS = 'http://192.168.0.247:804/';
}else{
    urlS = 'http://didi.360che.com/saas/';
}


export const target = urlS;
