// 使用特殊道具，不重试
function Request_useSpecialItem(itemType, callback) {
    if (typeof(callback) !== "function") {
        console.log(callback, "不是一个function");
        return;
    }
    $.ajax({
        type: "POST",
        url: "storage.html",
        data: "item="+itemType+"&storageType=SPECIAL_ITEM&action=USE",
        success: function(data) {
            console.log("使用"+itemType+"：成功响应");
            return callback(true);
        },
        error: function(xhr, textStatus) {
            console.log("使用"+itemType+"时发生错误"+textStatus);
            return callback(false);
        }
    });
}

// 购买特殊道具，不重试
function Request_buySpecialItem(itemType, callback) {
    if (typeof(callback) !== "function") {
        console.log(callback, "不是一个function");
        return;
    }
    $.ajax({
        type: "POST",
        url: "storage.html",
        data: "itemType="+itemType+"&storageType=SPECIAL_ITEM&action=BUY&quantity=1",
        success: function(data) {
            console.log("购买"+itemType+"：成功响应");
            return callback(true);
        },
        error: function(xhr, textStatus){
            console.log("购买"+itemType+"时发生错误"+textStatus);
            return callback(false);
        }
    });
}

// 从团仓取出物资，失败重试
function Request_getItemsFromMilitaryUnitStorage(itemType, quantity, reason, citizenNumberInMU, citizenID, callback) {
    var dataObj = {
        product: itemType,
        quantity: quantity,
        reason: reason,
    };
    dataObj[citizenNumberInMU] = citizenID;
    $.ajax({
        url: "militaryUnitStorage.html",
        type: "POST",
        data: dataObj,
        success: function(data) {
            console.log("已从军团仓库取了" + quantity + "个" + itemType);
            return callback(true);
        },
        error: function(xhr, textStatus) {
            console.log("从军团仓库取" + quantity + "个" + itemType + "时发生错误 (", textStatus, ")，重新尝试");
            $.ajax(this);
        }
    });
}