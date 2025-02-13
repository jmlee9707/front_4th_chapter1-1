## 과제 체크포인트

### 기본과제

#### 1) 라우팅 구현:

- [x] History API를 사용하여 SPA 라우터 구현
  - [x] '/' (홈 페이지)
  - [x] '/login' (로그인 페이지)
  - [x] '/profile' (프로필 페이지)
- [x] 각 라우트에 해당하는 컴포넌트 렌더링 함수 작성
- [x] 네비게이션 이벤트 처리 (링크 클릭 시 페이지 전환)
- [x] 주소가 변경되어도 새로고침이 발생하지 않아야 한다.

#### 2) 사용자 관리 기능:

- [x] LocalStorage를 사용한 간단한 사용자 데이터 관리
  - [x] 사용자 정보 저장 (이름, 간단한 소개)
  - [x] 로그인 상태 관리 (로그인/로그아웃 토글)
- [x] 로그인 폼 구현
  - [x] 사용자 이름 입력 및 검증
  - [x] 로그인 버튼 클릭 시 LocalStorage에 사용자 정보 저장
- [x] 로그아웃 기능 구현
  - [x] 로그아웃 버튼 클릭 시 LocalStorage에서 사용자 정보 제거

#### 3) 프로필 페이지 구현:

- [x] 현재 로그인한 사용자의 정보 표시
  - [x] 사용자 이름
  - [x] 간단한 소개
- [x] 프로필 수정 기능
  - [x] 사용자 소개 텍스트 수정 가능
  - [x] 수정된 정보 LocalStorage에 저장

#### 4) 컴포넌트 기반 구조 설계:

- [x] 재사용 가능한 컴포넌트 작성
  - [x] Header 컴포넌트
  - [x] Footer 컴포넌트
- [x] 페이지별 컴포넌트 작성
  - [x] HomePage 컴포넌트
  - [x] ProfilePage 컴포넌트
  - [x] NotFoundPage 컴포넌트

#### 5) 상태 관리 초기 구현:

- [x] 간단한 상태 관리 시스템 설계
  - [x] 전역 상태 객체 생성 (예: 현재 로그인한 사용자 정보)
- [x] 상태 변경 함수 구현
  - [x] 상태 업데이트 시 관련 컴포넌트 리렌더링

#### 6) 이벤트 처리 및 DOM 조작:

- [x] 사용자 입력 처리 (로그인 폼, 프로필 수정 등)
- [x] 동적 컨텐츠 렌더링 (사용자 정보 표시, 페이지 전환 등)

#### 7) 라우팅 예외 처리:

- [x] 잘못된 라우트 접근 시 404 페이지 표시

### 심화과제

#### 1) 해시 라우터 구현

- [x] location.hash를 이용하여 SPA 라우터 구현
  - [x] '/#/' (홈 페이지)
  - [x] '/#/login' (로그인 페이지)
  - [x] '/#/profile' (프로필 페이지)

#### 2) 라우트 가드 구현

- [x] 로그인 상태에 따른 접근 제어
- [x] 비로그인 사용자의 특정 페이지 접근 시 로그인 페이지로 리다이렉션

#### 3) 이벤트 위임

- [x] 이벤트 위임 방식으로 이벤트를 관리하고 있다.

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장

_24.12.19일 작성_

- History API / Hash Router
  업무에서 react-router를 너무 편하게 사용하다 보니 실제로 어떻게 구현되어 있는지, 브라우저에서는 어떤 주소 API를 제공하는지에 대해 궁금해하지 않았던 것 같다. history 객체의 매서드(pushstate, replaceState)를 사용하고, SPA 구조를 위해 어떻게 사용할지 고민해보는 계기가 되었다.

- class `vs` 함수형 컴포넌트
  어떤 방법으로 SPA 구조를, 컴포넌트를 구현해야 하는지 오랜 시간 고민했다. 확장성과 메서드별 역할 분리의 이점을 고려하여 최종적으로 클래스 구조를 선택하여 페이지를 구현하였다.
  이 과정에서, 이벤트에 DOM element 바인딩 할수 없다면 error가 발생하기에 DOM이 형성된 후 원하는 element가 바인딩 될 수 있도록 해야 함을 다시 한번 각인할 수 있었다.

- vanila.js 에서의 상태 관리
  react의 zustand, mobx 를 주로 사용하다, 프레임워크 없이 전역으로 상태를 관리해야 하는 부분에서 막막함을 느꼈다.
  observer 패턴을 구현해야 하는지, 혹은 공통 파일 하나에서 props로 계속해서 상태를 내려줘야 하는지 고민하던 와중, observer 패턴은 구현 난이도가 높을 것이라 생각했고, 부모에서 자식 모듈로 props로 계속해서 넘기다 보면 props drilling 이 발생해 점차 복잡할 것이라 생각했다.

  이후 전역 클래스 하나를 생성한 후, 같은 클래스 인스턴스의 생성을 제한하는 방법을 택했다.
  user 상태를 가져다 쓰는 곳이 많지 않고, _userStore.js_ 하나의 파일에서만 유저 클래스를 생성한 후 인스턴스 자체를 내보낸다면, 전역처럼 어디서든 동일하게 수정 및 접근이 가능할 것이라 생각했다.

  이 과정에서 전역 상태의 원리 이해와 복잡도 관리의 중요성에 대해 고민하게 되었다.

### 코드 품질

- Page class 구현-> class 상속
  router, path가 변경될 때마다 해당 path에 적합한 html를 렌더시켜줘야 했는데, 중복되는 코드가 많을 것 같아 하나의 Page class 를 선언한 후, 이를 상속하여 확장해서 사용하는 방식을 선택했다.

```js
class Page {
  constructor(query) {
    this.parent = document.querySelector(query);
  }
  render() {
    this.parent.insertAdjacentHTML("beforeend", this.getHtml()); // DOM element 생성 후
    this.addEventListeners(); // 이벤트 바인딩
  }
  getHtml() {
    return ``;
  }

  addEventListeners() {}
}
```

```js
import Page from ".";
import userStore from "../core/userStore";
import router from "../routes";

class LoginPage extends Page {
  addEventListeners() {
    const $id = document.getElementById("username");
    const $loginForm = document.getElementById("login-form");

    $loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if ($id.value) {
        const userInfo = { username: "testuser", email: "", bio: "" };
        userStore.setUserState(userInfo);
        router.navigateTo("/");
      } else {
        alert("id를 입력해주세요")``;
      }
    });
  }

  getHtml() {
    return `
    <main class="bg-gray-100 flex items-center justify-center min-h-screen">
			...
    </main>
`;
  }
}
export default LoginPage;
```

현재 프로젝트는 크게 문제가 없지만, 규모가 확장되면 비동기 렌더링 로직, 데이터 로딩 등 여러 이슈가 있을 것이라 생각한다. 라이프사이클 메서드를 잘 만들어두면 관리가 더 쉬울 것 같다.

- 전역 상태 관리

싱글톤과 유사하게 전역 상태를 구현했다. 클래스 외부에서 프로퍼티를 직접 접근하는 것이 위험하다고 생각해 typescript와 java의 private 처럼 구현하고자 했다. 또한 구현 과정에 localstorage에 user 정보를 저장하는 내용이 있었기에 동시에 localstorage도 함께 관리하고자 했다.

```js
class UserState {
  constructor() {
    this.state = {};
  }

  setUserState(userInfo) {
    window.localStorage.setItem("user", JSON.stringify(userInfo));
    this.state = userInfo;
  }

  logout() {
    this.state = {};
    window.localStorage.removeItem("user");
  }

  ...

  init() {
    const info = this.getUserInfo();
    if (window.localStorage.getItem("user")) {
      this.setUserState(info);
    } else {
      this.state = {};
    }
  }
}

const userStore = new UserState();
userStore.init();

export default userStore;


```

### 학습 효과 분석 / 과제 피드백

- DOM 렌더링 순서
  평일 Q&A 세션 or 멘토링(정확히 기억은 나지 않지만..) 최근async defer 속성을 공부하면서 script 태그의 위치에 대해 고민했던 경험이 있는데, 잠시 잊고있던 듯 하다..
  ~~DOM 렌더링 전에 이벤트 바인딩을 시키고 에러를 발생시킨 나를 보니...~~  
  코치님의 한마디에 브라우저 렌더링 순서에 대해 다시 상기 할 수 있었다.

- React 라이브러리 원리 이해
  무작성 편하게 React 라이브러리만 사용해서 기능을 구현하곤 했는데, 라이브러리/프레임워크 없이 프로젝트를 구현하다 보니 사용하던 라이브러리의 구조와 원리에 대해 궁금증이 생겼다. 새로운 라이브러리를 사용할 땐, 브라우저 혹은 자바스크립트에서 제공하는 기능들이 있는지, 어떤 기능을 바탕으로 구현되어 있는지 알아보는 것이 필요하다고 느꼈다...!

## 리뷰 받고 싶은 내용

1. e2e test **SPA 기본기능 -> 프로필 페이지가 동작한다** 부분에서 계속 에러가 나서 발생했습니다. 확인해 보니 app.spec.js 에 "자기소개 입니다." 가 두번 출력되어야 하는 로직인 듯 작성되어 있습니다. test code를 수정하여 실행하니 해결되었지만, 해당 부분은 test code에 맞춰 구현이 되어야 했던 부분인지 궁금합니다.

![](https://velog.velcdn.com/images/jmlee9707/post/e42ae730-8137-4a35-b20a-3f635f1c8ea1/image.png)

2. pages 폴더 내부에 해당하는 page 관련 파일들은 class 형태로 구현하여 이벤트 핸들러나 메서드를 정의하고 이를 render이후 DOM에 바인딩하는 방식을 취했습니다. . 그리고 components 안의 Header, Footer의 경우 즉시 html를 리턴하여 page html 내부에 삽입 되도록 구현했습니다.

   Header, Footer 컴포넌트의 리턴값이 단순하고, 이벤트를 해당 파일에 선언하지 않았기에 구분하여 구현하였는데 이러한 구분 방식이 장기적인 유지보수나 확장성 측면에서 적절한 패턴인지, 혹은 일관성을 위해 다른 접근법을 고려해야 하는지에 대해 피드백을 받고 싶습니다.
