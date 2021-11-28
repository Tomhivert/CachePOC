const cacheService = require('./cacheService');

describe("Cache Test suite", () => {
    const someKey = "keykey";
    const someValue = {
        key:someKey,
        value:"valuevalue"
    };
    const someKey2 = "key2";
    const someValue2 = {
        key:someKey2,
        value:"value2"
    };

    const someKey3 = "key3";
    const someValue3 = {
        key:someKey3,
        value:"value3"
    };
    beforeAll(() => {
        cacheService.newCache();
    });

    test("getter and setter sanity", () => {
        cacheService.set(someKey, someValue);
        let actual = cacheService.get(someKey);
        expect(actual.value).toEqual(someValue);
    });

    test("getter and setter advanced", () => {
        cacheService.set(someKey, someValue);
        cacheService.set(someKey2, someValue2);
        
        let actual = cacheService.get(someKey);
        let actual2 = cacheService.get(someKey2);
        expect(actual.value).toEqual(someValue);
        expect(actual2.value).toEqual(someValue2);
    });

    test("toObject test", () => {
        cacheService.set(someKey, someValue);
        cacheService.set(someKey2, someValue2);
        let obj = cacheService.toObject();
        expect(obj[someKey].value).toEqual(someValue);
        expect(obj[someKey2].value).toEqual(someValue2);
    });

    test("too many values test", async () => {
        cacheService.newCache(2);
        cacheService.set(someKey, someValue);
        await new Promise((r) => setTimeout(r, 500));
        cacheService.set(someKey2, someValue2);
        await new Promise((r) => setTimeout(r, 500));
        cacheService.set(someKey3, someValue3);//should have deleted someKey, someValue(1)
        await new Promise((r) => setTimeout(r, 500));
        let obj = cacheService.toObject();
        expect(obj[someKey2].value).toEqual(someValue2);
        expect(obj[someKey3].value).toEqual(someValue3);
    });
});
