# React-Boilerplate

<div align="left">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
</div>

<div align="left">
  <img src="https://img.shields.io/badge/shadcnui-000000?style=for-the-badge&logo=shadcnui&logoColor=white">
  <img src="https://img.shields.io/badge/zustand-76563d?style=for-the-badge&logo=zustand&logoColor=white">
  <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
    <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white">
</div>

<div align="left">
  <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</div>

## 📖 목차
1. [프로젝트 목적](#프로젝트-목적)
2. [배포 URL](#배포-url)
3. [Preview](#preview)
4. [개선 사항](#개선-사항)
5. [라이브러리 사용기록](#라이브러리-사용기록)
   - [Zustand](#zustand)
   - [shadcn/ui](#shadcn-ui)
   - [React-hook-form](#react-hook-form)
   - [Zod](#zod)
6. [폴더구조](#폴더구조)

---

## 프로젝트 목적
- 자주 쓰이는 컴포넌트 정리
- zustand, tailwind css, shadcn/ui 라이브러리 사용


## 배포 URL
https://react-boilerplate-neon.vercel.app/



## Preview
| Card | Drawer | Calendar |
|:---:|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/2c8875e2-0ce3-4239-bacd-315b1b2f4308" width="300"> | <img src="https://github.com/user-attachments/assets/2a6af126-7cad-43de-bba2-b394485b1e6b" width="300"> | <img src="https://github.com/user-attachments/assets/a6d8dbf4-1051-4f1f-9e31-ca33de36b7c4" width="300"> |


## 개선 사항
### **1. Modal**

[Modal](https://swamp-bass-b68.notion.site/Modal-668d076d393641ffbbd0bdec881b196d?pvs=4)
   
**문제상황**
  - modal 사용 컴포넌트에 매번 open / close state 선언해서 사용
  - modal 사용하는 컴포넌트에 매번 modal 컴포넌트를 선언해서 사용
    
**개선방향**
  - 어떤 상황에서 어떤 modal 이 어떻게 열리고 닫히는지 예측 가능하게 만들기
  - modal 공통 컴포넌트를 App 최상단에 두고 현재 상태에 따라 어떤 modal 을 렌더링 할지 결정
  - modal component 도 전역으로 관리

[Upgrade Modal](https://swamp-bass-b68.notion.site/Upgrade-Modal-1f3204588dd680579260f43a1952dc03?pvs=4)

**문제상황**
  - modal 공통 컴포넌트에서 dialog, bottomPopup 이외에도 modal 유형이 늘어날 경우
    조건문이 길어지고 가독성이 떨어짐
    
**개선방향**
  - 객체 매핑 사용
  - 컴포넌트와 type을 매핑할 수 있는 Container를 생성



### **2. 컴포넌트**

[더 나은 컴포넌트 구성](https://swamp-bass-b68.notion.site/1f3204588dd680b7b6b8daa82c5f4c61?pvs=4)

**문제상황**
  - menubar 에서 컴포넌트 선택시 해당 컴포넌트 노출
  - 메인 페이지인 `/pages/index` 에 조건문 형식으로 컴포넌트를 호출

**개선방향**
  - 메뉴의 콘텐츠들을 컴포넌트로 분리하고 컴포넌트와 menu 를 매핑할 수 있는 container 를 생성
  - 객체 매핑을 통해서 컴포넌트를 동적으로 가져오기

### **3. 반응형**

[react-responsive](https://swamp-bass-b68.notion.site/react-responsive-20d204588dd680e2aa34dd028ecad4a0?source=copy_link)

 - 반응형 구현을 위한 react-responsive 라이브러리 사용


| 기존 | 반응형 |
|:---:|:---:|
| <img src="https://github.com/user-attachments/assets/edc92f28-d246-45c5-8ed2-60770d5c0ad2" width="300"> | <img src="https://github.com/user-attachments/assets/4bc02c56-8b20-44a3-ad15-a6ebf1f49b3d" width="300"> |


---


## 라이브러리 사용기록
### **Zustand**
https://zustand.docs.pmnd.rs/getting-started/introduction


1. 상태관리 라이브러리
2. 상태 정의하고 사용하는 방법이 간단하다
3. 사용법
    1. 설치
        
        ```bash
        $ npm i zustand
        ```
        
    
    2. store 생성 (naming rule : use…Store)
       
       : create 함수를 이용해 상태와 상태 변경하는 액션을 정의한다.
      
        ```jsx
        import { create } from "zustand";
        
        interface TestStore {
            isOpenDrawer: boolean;
            setIsOpenDrawer: (isOpen: boolean) => void;
        }
        
        export const useTestStore = create<TestStore>((set) => ({
            // drawer 노출 여부
            isOpenDrawer: false,
        
            setIsOpenDrawer: (isOpen: boolean) => set({ isOpenDrawer: isOpen }),
        }));
        ```
    
    4. 컴포넌트에서 사용
    
        ```jsx
          const { setIsOpenDrawer } = useTestStore((state) => state);
          const isOpenDrawer = useTestStore((state) => state.isOpenDrawer);
        ```

        
### **shadcn ui**
https://ui.shadcn.com/docs

1. 컴포넌트 UI
2. 컴포넌트 코드를 복사해서 프로젝트에 붙여넣기 가능
3. 사용법
    1. shadcn 설정 파일인 **component.json** 생성
        
        ```bash
        # 초기화
        $ npx shadcn-ui@latest init
        ```
    2. shadcn/ui 는 원하는 컴포넌트만 다운로드해서 사용 가능
        
        ```bash
        $ npx shadcn-ui@latest add button card input
        ```
    <details>
    <summary>twMerge, clsx, cva 사용</summary>
    <div markdown="1">
    
    - **twMerge**
        - 스타일 충돌 없이 Tailwind CSS 클래스 병합할 수 있게 하는 유틸 함수
        - 충돌하는 클래스 명만 덮어쓴다
    - **clsx**
        - 조건식 className 적용 간단해짐
        
        ```jsx
        <button className={
        	clsx(styles.input, {
        		[styles.colorGreen]: isLoading,
        	}
        } />
        ```
        
    - **cva (class-variance-authority)**
        - 변수
        
        ```jsx
        const buttonVariants = cva(`p-2 rounded`, {
        	variants: {
        		color: {
        			primary: `bg-blue-500 text-white`,
        		}
        	}
        });
        
        const CustomButton = ({size, color, children}) => {
        	const className = buttonVariants({size, color});
        	return <button className={className}>{children}</button>;
        }
        
        cosnt App = () => {
        	return <CustomButton color='primary'>BUTTON</CustomButton>
        }
        ```
        
    
        ⇒ twMerge, clsx, cva 적용 유틸함수 (shadcn/ui 초기화시 자동 생성)
    
        ```jsx
        import { type ClassValue, clsx } from "clsx"
        import { twMerge } from "tailwind-merge"
        
        export function cn(...inputs: ClassValue[]) {
          return twMerge(clsx(inputs))
        }
        ```
    
        → inputs 를 통해 class 를 받아와서 twMerge, clsx 적용
    
    
    </div>
    </details>
    
4. antd 와 차이점
   1. antd는 npm install antd 로 antd의 모든 컴포넌트 다운로드해서 사용
   2. shadcn/ui 는 원하는 컴포넌트만 다운로드해서 사용 가능
      
    <div align="left">
      <img width="496" alt="Image" src="https://github.com/user-attachments/assets/ed062032-c666-446a-b538-da7513c91636" />  
    </div>



### **React-hook-form**
https://react-hook-form.com/docs/useform

- React 기반의 Form 관리 라이브러리  
- 폼 상태와 유효성 검사를 처리하기 위한 간편한 방법 제공 하는 라이브러리
- 사용법
  
  `useForm` 
  
  - form instance 를 생성하고 form 데이터와 메서드를 제공함
  
  `register`
  
  - 입력 필드를 form 에 등록
  - 입력 필드에 대한 유효성 검사 규칙, 기본값 설정 가능
  
  `handleSubmit`
  
  - form 제출 시 실행할 함수 정의
  - 유효성 검사를 수행, 제출할 데이터 처리하는 로직 작성 가능
  
  `errors`
  
  - 유효성 검사 실패 시 해당 필드의 에러 메시지 포함
  
  `trigger`
  
  - 특정 필드나 전체 form에 대한 유효성 검사 실행 가능
      
      ```jsx
      const onClickSubmit =  async () => {
      	// trigger 사용시 submit 할때가 아닌 특정 이벤트에서 유효성 검사를 실행하도록 설정 가능
      	const isValid = await trigger(); // return boolean
      }
      ```

### **Zod**
https://zod.dev/

- TS 기반 스키마(데이터 유형) 선언 및 유효성 검사 라이브러리


### **shadcn/ui + React-hook-form + zod**
1. form instance
    
    ```jsx
    /** 회원정보 form */
    const userInfoForm = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      mode: "onChange",
      defaultValues: {
        email: "",
        address: "",
      },
    });
    
    /** react-hook-form method */ 
    const {
      register, // 각 입력 필드 등록, 유효성 검사 규칙 설정
      handleSubmit, // 폼 제출시 실행할 함수 정의
      formState: { errors },
      trigger,
    } = userInfoForm;
    ```
    
2. zod formSchema
    
    ```jsx
    /** zod form schema (rules) */
    export const FormSchema = z.object({
      email: z.string().min(1, { message: "필수!" }).email({
        message: "이메일 형식으로 입력해주세요.",
      }),
      address: z.string().min(1, { message: "필수!" }),
    });
    ```
    
3. form component
    
    ```jsx
    // 부모 컴포넌트
    <Form {...userInfoForm}>
      <form className="space-y-6">
        <FormComponent form={userInfoForm} />
      </form>
    </Form>
    
    // formcomponent
    <FormField
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem className={"space-y-3 flex flex-col"}>
            <FormLabel
              className={"font-semibold text-left pl-2 pb-1 text-inherit"}
            >
              이메일
            </FormLabel>
            <FormControl>
              <Input
                size="xl"
                placeholder="이메일을 입력하세요"
                className={cn([invalidStyle(fieldState)])}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        render={({ field, fieldState }) => (
          <FormItem className="space-y-3 flex flex-col">
            <FormLabel className="font-semibold text-left pl-2 pb-1 text-inherit">
              주소
            </FormLabel>
            <FormControl>
              <Input
                size="xl"
                placeholder="주소를 입력하세요"
                className={cn([invalidStyle(fieldState)])}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ```



## 폴더구조
```bash
react-boilerplate
├─ public
├─ src
│  ├─ App.css
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ index.css
│  ├─ index.tsx
│  ├─ globals.css
│  ├─ components
│  │  ├─ calendar
│  │  ├─ CardComponent.tsx
│  │  ├─ CheckboxComponent.tsx
│  │  ├─ modal
│  │  ├─ RadioComponent.tsx
│  │  ├─ StepsComponent.tsx
│  │  ├─ test
│  │  │  ├─ ButtonComponent.tsx
│  │  │  ├─ DrawerComponent.tsx
│  │  │  ├─ FilterCheckboxComponent.tsx
│  │  │  ├─ FormComponent.tsx
│  │  │  └─ TooltipComponent.tsx
│  │  └─ ui
│  ├─ hook              # 커스텀 훅
│  │  └─ useModal.ts
│  ├─ layout
│  │  └─ Header.tsx
│  ├─ lib               # 라이브러리 설정
│  ├─ pages             # 페이지
│  │  └─ test
│  │     ├─ checkup
│  │     │  └─ index.tsx
│  │     ├─ index.tsx
│  │     └─ reserve    
│  │        ├─ components
│  │        └─ index.tsx
│  ├─ router            # 라우팅 설정
│  ├─ store             # zustand store
│  ├─ types             # 타입 정의
│  └─ utils             # 기타 유틸
├─ components.json
├─ package-lock.json
├─ package.json
├─ tailwind.config.js
└─ tsconfig.json
```
  
