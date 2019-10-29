var storagePrefix = "EP-";

function setValue(item, value) { // 储存数据
    localStorage[storagePrefix + item] = (typeof value === "string") ? value : JSON.stringify(value);
}

function getValue(item, toJSON) { // 读取数据
    item = storagePrefix + item;
    return (item in localStorage) ? ((toJSON) ? JSON.parse(localStorage[item]) : localStorage[item]) : null;
}

function delValue(item) { // 删除数据
  if (typeof item === "string") {
      localStorage.removeItem(storagePrefix + item);
  } else if (typeof item === "number") {
    if (item === 0) { // 对存储设置的特殊操作
        // 删除所有存档
        delValue("options");
        delValue("countryInfo");
        delValue("regionInfo");
        delValue("citizenInfo");
        delValue("muInfo");
        delValue("apiRanks");
    }
  }
}

// 读取存档
function loadStorage() {
    var o = getValue("options", true); if (!!o) setOptions(o);
    var c = getValue("countryInfo", true); if (!!c) countryInfo = c;
    var r = getValue("regionInfo", true); if (!!r) regionInfo = r;
    var p = getValue("citizenInfo", true); if (!!p) citizenInfo = p;
    var m = getValue("muInfo", true); if (!!m) muInfo = m;
    var a = getValue("apiRanks", true); if (!!a) apiRanks = a;
}

//保存存档
function saveStorage() {
    setValue("options",options);
    setValue("countryInfo",countryInfo);
    setValue("regionInfo",regionInfo);
    setValue("citizenInfo",citizenInfo);
    setValue("muInfo",muInfo);
    setValue("apiRanks",apiRanks);
}