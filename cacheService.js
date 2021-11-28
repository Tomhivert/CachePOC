var lodash = require('lodash')

cacheData = new Map();
globalMaxItems = 0;
globalCurrentItems = 0;
oldestItemKey = "";
oldestItemTime = new Date();

function newCache(maxItems){
    globalMaxItems = maxItems;
    globalCurrentItems = new Map();
    globalCurrentItems = 0;
}

function get(cacheKey) {
    cacheValue = cacheData.get(cacheKey);
    if (cacheValue) {
        cacheValue.updateDate = Date.now(); //update updated date
        cacheData.set(cacheValue.key, cacheValue);
    }
    return cacheValue;
}

function findOldestKey() {
    currentOldest = Date.now();
    currentOldestKey = "";
    cacheData.forEach(function(v, k) {
        if (v.updateDate <= currentOldest){
            currentOldest = v.updateDate;
            currentOldestKey = k;
        }
    })
    return currentOldestKey
}

function removeOldestItem() {
    var oldest = findOldestKey();
    cacheData.delete(oldest);
    globalCurrentItems--;
}

function set(cacheKey, cacheValue) {
    cacheItem = {
        updateDate : Date.now(),
        key : cacheKey,
        value : cacheValue
    };
    if(globalCurrentItems >= globalMaxItems){
        removeOldestItem();
    }

    currentValue = get(cacheKey);
    if (currentValue){
        globalCurrentItems++;
    }

    cacheData.set(cacheKey, cacheItem);
}

function toObject() {
    var obj = {}
    cacheData.forEach(function(v, k){
      obj[k] = v
    })
    return obj;
} //TODO replace with Lodash.
module.exports = {
    newCache : newCache,
    get : get,
    set : set,
    toObject : toObject
}