## 성능

### setAttribute vs 스타일 객체 직접 접근

> 결론: 스타일 객체에 직접 접근해서 값을 할당하는 게 3배 빨랐다

```js
console.time()
cursor.setAttribute('style', `top: ${10}px; left: ${10}px`);
console.timeEnd()
// VM6858:3 default: 0.12109375 ms

console.time()
cursor.style.top = `${10}px`;
cursor.style.left = `${10}px`;
console.timeEnd()
// VM6885:4 default: 0.044189453125 ms
````
