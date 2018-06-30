# 判断json格式是否一致

> 有a，b两种自定义格式的json数据，已知当前两数据均不会出现循环引用的问题，判断a与b的所有键值对内容是否完全一致

```js
const isObject = list => Object.prototype.toString.call(list).slice(8, -1) === 'Object';
const isArray = list => Object.prototype.toString.call(list).slice(8, -1) === 'Array';

const diffData = (test, consult) => {
  let isSame = true;
  const judgeObj = (obj, consultObj) => {
    if (isObject(obj)) {
      console.log(obj, consult);
      if (!isObject(consultObj)) {
        console.log('object false');
        isSame = false;
      }
      Object.keys(obj).map((key) => {
        const value = obj[key];
        const consultValue = consultObj[key];
        console.log(value, consultValue);
        judgeObj(value, consultValue);
      });
    } else if (isArray(obj)) {
      if (!isArray(consult)) {
        console.log('array false');
        isSame = false;
      }
      obj.map((item, index) => {
        console.log(item, consultObj[index], index);
        judgeObj(item, consultObj[index]);
      });
    } else if (obj !== consultObj){
      console.log('value false');
      isSame = false;
    }
  };
  judgeObj(test, consult);
  return isSame;
};
```

* 通过 diffData(a, b) && diffData(b, a) 来判断数据的完全统一性