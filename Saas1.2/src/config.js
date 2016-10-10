//export const target = process.env.NODE_ENV !== 'production' ? 'http://192.168.0.247:804/' : 'http://didi.360che.com/saas/'; 
const sessidS = {
    get:function(){
        let oldData = JSON.parse(localStorage.getItem('vipLodData'));
        //console.log(oldData,oldData.sessionid);
        return oldData.sessionid;
    }
};

//const sessionid = '42018_422bdaf3ca2073292e335c8f507812bd5df94093';

//boos
const sessionid = '36859_ec2b304e3ad9052eb463fd168bf978b34f7e3047';
const devBug = true;

export const SessionId = devBug ? sessionid : sessidS;

export const target = devBug ? 'http://192.168.0.247:804/' : 'http://didi.360che.com/saas/';



/*本地存储数据名称表(Tool.localItem)
//Uphone               客户注册电话

//vipLodData           vip登陆获取的数据

//BrandKey             初入客户选择的品牌
//
//fingerprint          初始指纹包
//
//  SearchData   储存所有联系人信息

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

