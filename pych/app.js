const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
let request = require("request");
let configData = require('./config').configData
let timeInterval = null
let msgId = ''
let keyName = []
let keyNameTime = setInterval(()=>{
    keyName=[]
},1000*60*60*24)
const token = '1416043424:AAEsGDNnL5vBAJYs6836ldwoAYCLgFNNZTU';
const bot = new TelegramBot(token, {
  polling: true,
  request: { // 设置代理
    agentClass: Agent,
    agentOptions: {
    // socksHost: 'us3.chuqianglai.com', // Defaults to 'localhost'.
		// socksPort: 443, 
		// socksUsername: 'us3.chuqianglai.com',
    socksPassword: 'TA7Ak8XrDe9x7RyyVM'
    }
  }
});

// 匹配/hentai
bot.onText(/\/cxgp/, function onLoveText(msg) {
  bot.sendMessage(msg.chat.id, '正在帮您实时推送最近'+configData.withinTime+'小时内的相关信息');
  msgId = msg.chat.id
  runAll()
  if(timeInterval){
    clearInterval(timeInterval)
    timeInterval = setInterval(runAll,1000*5)
  }
  
});
// 匹配/hentai
bot.onText(/\/stop/, function onLoveText(msg) {
  bot.sendMessage(msg.chat.id, '已停止查询');
  keyName = []
  clearInterval(timeInterval)
  clearInterval(keyNameTime)
});
bot.onText(/\/test/, function onLoveText(msg) {
  bot.sendMessage(msg.chat.id, 'hello,welcome my channel'); 
});


// // 匹配/echo
// bot.onText(/\/echo (.+)/, (msg, match) => {

//   const chatId = msg.chat.id;
//   const resp = match[1];
//   bot.sendMessage(chatId, resp);
// });

// runAll()
// setInterval(runAll,1000*5)
function runAll(){
    console.log('开始查询最近'+configData.withinTime+'小时的数据')
    configData.urls.map(item=>{
        getData(item.url,item.userName)
    })
}
function getData(url,userName){
    
    request(url, function (error, response, body) {
    if (!error) {
    let allData = JSON.parse(body)
    if(!allData.rebalancing) return;
    allData.rebalancing.rebalancing_histories.map(item=>{
        let onlyKey = item.id+'_'+item.updated_at
        let passedTime = Date.now()-item.updated_at
        if(keyName.indexOf(onlyKey)===-1&&passedTime<3600*1000*configData.withinTime){
            keyName.push(onlyKey)
            let msgContent = `用户:${userName||allData.rebalancing.id}在${dateFormat("YYYY-mm-dd HH:MM",new Date(item.updated_at))}所持有的：${item.stock_name+'，代码为'+item.stock_symbol}从${Number(item.prev_weight_adjusted)}%变为${item.target_weight}%,成交价为${item.price}`
            
            if(msgId){
              bot.sendMessage(msgId, msgContent);
            }
            console.log(msgContent)
        }
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


