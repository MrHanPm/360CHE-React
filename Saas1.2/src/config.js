//export const target = process.env.NODE_ENV !== 'production' ? 'http://192.168.0.247:804/' : 'http://didi.360che.com/saas/'; 
const sessidS = {
    get:function(){
        let oldData = JSON.parse(localStorage.getItem('vipLodData'))
        //console.log(oldData,oldData.sessionid);
        return oldData.sessionid
    }
}
export const getWxConfig = {
    get:function(){
        let jsSDK = JSON.parse(localStorage.getItem('jsSDK'))
        if(jsSDK !== null){
            let json = {debug:false,appId:jsSDK.appId,timestamp:jsSDK.timestamp,nonceStr:jsSDK.nonceStr,signature:jsSDK.signature,jsApiList: ['hideOptionMenu','showOptionMenu','closeWindow','chooseWXPay',]}
            return json
        }else{
            return {debug:false,appId:'',timestamp:'',nonceStr:'',signature:'',jsApiList: ['hideOptionMenu','showOptionMenu','closeWindow','chooseWXPay',]}
        }
    }
}

const sessionid = '41970_237bb41d9bebb4912273487f2114a0e03bdf66cc'

// const sessionid = '70060_9958dc332841b0fe7bfff51ab99b518140df24c2'

//boos
// const sessionid = '36859_ec2b304e3ad9052eb463fd168bf978b34f7e3047';
const devBug = false


// export const SAASDEV = 'https://didi.360che.com/saas/CC_CAR/index.html'


export const SAASDEV =  'https://saasm.360che.com.cn/carshop/index.html'



//分享地址
export const shareURL = 'http://dealersaas.m.360che.com/'

export const SessionId = devBug ? sessionid : sessidS

// export const target = devBug ? 'https://didi.360che.com/saas/' : 'https://didi.360che.com/saas/'

// export const target = devBug ? 'http://192.168.0.247:804/' : 'https://didi.360che.com/saas/'

export const target = devBug ? 'http://192.168.0.247:804/' : 'https://saasm.360che.com.cn/api/'


/*本地存储数据名称表(Tool.localItem)
jsSDK
//Uphone               客户注册电话
//CountMsg     统计日期明细
//vipLodData           vip登陆获取的数据

//BrandKey             初入客户选择的品牌
//
//fingerprint          初始指纹包
//
// SearchData   储存所有联系人信息
qe/ robSearchSF    公共池搜索记忆
// robSearchPP    公共池搜索记忆

crm储存区
clueURl//修改线索返回地址
noTel 未购车列表
noAZ 
noTelFingerprint

okTel 购车列表
okAZ
okTelFingerprint

coTel 收藏列表
coAZ
coTelFingerprint

reTel 最近联系人
reTelFingerprint

 RobClues  抢到的线索

appresourcelist         取得资源列表(系统用说明文字)

carusagelist            购车用途列表

failurecaselist         失败原因列表

cluelevellist           线索级别取得 HFABCFO 取得

cluefollowuptypelist    销售线索跟踪记录方式取得

clueresourcelist        线索来源取得

productlist             产品取得

serieslist              系列取得

subcategorylist         子类取得

allbrandlist            取得所有品牌列表

brandlist               品牌取得

citylist                市份取得

provincelist            省份取得

cluestopmenulist        销售线索顶部菜单取得
//
*/

