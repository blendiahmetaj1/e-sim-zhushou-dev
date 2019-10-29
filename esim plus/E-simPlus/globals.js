options = { // 自定义设置
    // 脚本相关
    script: {
        version: 0.1, // 存储的版本，用于比对版本更新
        firstUse: true, // 首次使用
        lang: 0, // 0:简体中文 1:繁體中文 2:English
        slowNetworkMode: false, // 慢网速模式，部分页面数据不会主动更新
        apiCountries: "", // apiCountries字符串
        apiCountriesEpoch: -1, // apiCountries获取时间
        apiRegions: "", // apiRegions字符串
        apiRegionsEpoch: -1, // apiRegions获取时间
        apiMap: "", // apiMap字符串
        apiMapEpoch: -1, // apiMap获取时间
        countryIds: [] // 国家ID列表，用于做国家选择
    },
    // 等待网页加载
    waitForWebPageComplete: {
        maxWaitCount: 50,
        waitInterval: 500
    }
};
countryInfo = {}; // 国家信息，可以ID/Name/FlagName/CurrencyName索引
regionInfo = {}; // 地区信息，可以用ID索引
citizenInfo = {}; // 玩家信息，可以用ID索引
muInfo = {}; // 军团信息，可以用ID索引
apiRanks = {}; // 军衔等级信息，可以用name索引 rankModifier = apiRanks[rankString].damageModifier;
// 合并用Object.assign，如果不是对象必须先转化为对象

// 全局变量获取/设置 设置方法： option("script").version = 0.1
function option(key, value) {
    var obj = window.options || {};
    if (key === undefined && value === undefined) { return obj; }
    else if (value === undefined) { return obj[key]; }
    else { obj[key] = value; window.options = obj; }
}

// 将保存的存档覆盖掉全局变量
function setOptions(data) {
    // 判断版本
    var nowVersion = option("script").version;
    var dataVersion = data.script.version;
    if (dataVersion == nowVersion) {
        // 版本相同，直接覆盖
        Object.assign(options,data);
    }
    else if (dataVersion < nowVersion) {
        console.log("存档版本有更新，正在尝试读取旧存档。如果出现问题请清除脚本的所有设置。");
        // 尝试录入存档，这里不能直接覆盖，避免因新版存档有更改导致存档损坏
        // 遍历options
        Reflect.ownKeys(options).forEach(function(key){
            // 判断类型
            if (data[key] !== undefined ) {
                if(Object.prototype.toString.call(options[key]) === "[object Object]"){
                    // 二层
                    Reflect.ownKeys(options[key]).forEach(function(key2){
                        if (data[key][key2] !== undefined ) options[key][key2] = data[key][key2];
                    });
                }
                else
                    options[key] = data[key];
            }
        });
        // 存档版本号设为当前版本
        option("script").version = nowVersion;
    }
    else {
        console.log("存档版本高于脚本版本，当前脚本可能已经过期。如果出现问题请清除脚本的所有设置");
        if (confirm("存档版本高于脚本版本，当前脚本可能已经过期。点击“确认”继续读取存档，但可能会造成部分存档丢失。如果使用中出现问题请清除脚本的所有设置。")) {
            // 尝试录入存档，这里不能直接覆盖，避免因新版存档有更改导致存档损坏
            // 遍历options
            Reflect.ownKeys(options).forEach(function(key){
                if (data[key] !== undefined ) {
                    // 判断类型
                    if(Object.prototype.toString.call(options[key]) === "[object Object]"){
                        // 二层
                        Reflect.ownKeys(options[key]).forEach(function(key2){
                            if (data[key][key2] !== undefined ) options[key][key2] = data[key][key2];
                        });
                    }
                    else
                        options[key] = data[key];
                }
            });
            // 存档版本号设为当前版本
            option("script").version = nowVersion;
        }
    }
}


// 脚本添加元素class，所有后添加元素全部需要该class以便截图时统一隐藏
var scriptElementsClass = "EP-SEC";