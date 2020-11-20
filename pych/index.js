const { url } = require("inspector");
let request = require("request");
let configData = require('./config').configData
let keyName = []
let timeInterval = null
setInterval(()=>{
    keyName=[]
},1000*60*60*24)
runAll()
timeInterval = setInterval(runAll,1000*5)
function runAll(){
    console.log('开始查询最近'+configData.withinTime+'小时的数据')
    configData.urls.map(item=>{
        getData(item.url,item.userName)
    })
}
function getData(url,userName){
    
    request(url, function (error, response, body) {
  if (!error) {
    // console.log(body);
    let allData = JSON.parse(body)
    // console.log(allData.rebalancing.rebalancing_histories)
    allData.rebalancing&&allData.rebalancing.rebalancing_histories.map(item=>{
        let onlyKey = item.id+'_'+item.updated_at
        let passedTime = Date.now()-item.updated_at
        if(keyName.indexOf(onlyKey)===-1&&passedTime<3600*1000*configData.withinTime){
            keyName.push(onlyKey)
            console.log(`用户:${userName||allData.rebalancing.id}在${dateFormat("YYYY-mm-dd HH:MM",new Date(item.updated_at))}所持有的：${item.stock_name+'，代码为'+item.stock_symbol}从${Number(item.prev_weight_adjusted)}%变为${item.target_weight}%,成交价为${item.price}`)
        }
        // resultData.push()
    })
    
  }
  
});
}
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}