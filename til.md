# TIL

> 만들면서 알게 된 점을 적습니다.

## 1. `background-image: radial-gradient()` 사용법

```css
.spotlight-mask  {
  /* A gradient at the center of its container,
     with transparent background and size of 150px,
     starting rgba(0, 0, 0, 0.4) */
  background-image: 
    radial-gradient(
      circle at center, 
      transparent 150px, 
      rgba(0, 0, 0, 0.4) 0
    );
}
```

> 참고 - [mdn - radial-gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient())

## 2. 마우스 이벤트의 좌표 속성 차이점

- `clientX`: 현재 보이는 화면 내의 X 좌표
- `offsetX`: 이벤트가 걸려 있는 DOM 요소 기준의 상대적 X 좌표
- `pageX`: 스크롤 화면을 포함한 전체 문서 기준의 X 좌표
- `screenX`: 사용자의 모니터 화면 전체 기준의 X 좌표

> 참고 - [metagon111 - clientX, offsetX, pageX, screenX의 차이](http://megaton111.cafe24.com/2016/11/29/clientx-offsetx-pagex-screenx%EC%9D%98-%EC%B0%A8%EC%9D%B4%EC%A0%90/) 

3. setAttribute vs 스타일 객체 직접 접근 성능 비교

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
```

## 3. 마우스 이벤트에 따라 커서가 움직이는 기능을 구현하는 방법에 따른 성능 비교와 이유

두 가지 방법을 사용해봤다:

- (1) `<div class=".spotlight-cursor">`를 만들고 `position: fixed` 설정한 다음 `top`과 `left` 값을 마우스 좌표로 업데이트 하는 방법
- (2) `<div class=".spotlight-mask">`를 만들고 `position: fixed`로 설정한 다음 `background-image`의 `radial-gradient`의 circle 좌표를 마우스 좌표로 업데이트하는 방법

결론:

- (2)가 훨씬 더 자연스럽고 끊김이 거의 없어서 사용자 경험이 훨씬 좋다

분석:

- 왜 그럴까? (추측) 브라우저 렌더링 측면에서 (2)가 더 효율적이기 때문이다. 렌더링을 최적화 하려면 Reflow(렌더 트리와 각 요소들의 크기와 위치를 다시 계산하는 과정)를 최소화시켜야 한다. Reflow가 일어나는 대표적인 속성 중에 하나가 `top, right, bottom, left`이다. 즉 방법 (1)은 마우스 이벤트가 발생할 때마다 Reflow가 일어난다. Reflow 이후에는 Repaint 연산도 뒤따른다. 반면에, 방법 (2)가 사용한 `background-image`는 Repaint가 일어나는 대표적인 속성이다. 따라서 방법 (2)는 Reflow 과정이 필요 없기 때문에 Repaint에 대한 연산 비용만 들어가므로 더 효율적이다.

> 참고 - [CHANYEONG - 브라우저 렌더링과 최적화](https://chanyeong.com/blog/post/43)
