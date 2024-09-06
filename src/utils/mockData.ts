export const MockUserInfoLabel = [
  {
    key: "name",
    label: "이름",
  },
  {
    key: "birth",
    label: "생년월일",
  },
  {
    key: "hpNo",
    label: "휴대폰번호",
  },
];
export const MockUserInfo: { [key: string] : { value: string, highlight: boolean}} = {
  name: {
      value: "김아무개",
      highlight: false,
  },
  birth: {
      value: "1999-09-09",
      highlight: false,
  },
  hpNo: {
      value: "01011111111",
      highlight: false,
  }
}

export const MockReserveUserInfoLabel = [
    {
      key: "name",
      label: "신청자",
    },
    {
      key: "birth",
      label: "생년월일",
    },
    {
      key: "email",
      label: "이메일",
    },
    {
      key: "hpNo",
      label: "휴대폰번호",
    },
    {
      key: "address",
      label: "우편물 수령주소",
    },
];

export const MockReserveUserInfo: { [key: string] : { value: string, highlight: boolean}} = {
    name: {
        value: "김아무개",
        highlight: false,
    },
    birth: {
        value: "1999-09-09",
        highlight: false,
    },
    email: {
        value: "kimUnkown@test.com",
        highlight: true
    },
    hpNo: {
        value: "01011111111",
        highlight: false,
    },
    address: {
        value: "서울시 강남구",
        highlight: false,
    }
  };

export const MockLocationList = [
  {
    id: 1,
    label: "전국",
  },
  {
    id: 2,
    label: "서울",
  },
  {
    id: 3,
    label: "인천/경기",
  },
  {
    id: 4,
    label: "경원",
  },
  {
    id: 5,
    label: "대전/충청",
  },
  {
    id: 6,
    label: "부산/대구/울산/경상",
  },
  {
    id: 7,
    label: "광주/전라",
  },
  {
    id: 8,
    label: "제주",
  },
];

export const MockTermsList = [
  {
    id: 1,
    label: "[필수] 개인정보 수집 동의",
    checked: false,
    required: true,
  },
  {
    id: 2,
    label: "[필수] 민감정보 수집 동의",
    checked: false,
    required: true,
  },
  {
    id: 3,
    label: "[필수] 개인정보 제3자 제공 동의",
    checked: false,
    required: true,
  },
  {
    id: 4,
    label: "[선택] 개인정보 제3자 제공 동의",
    checked: false,
    required: false,
  },
];

export const MockPillsList = [
  {
    id: 1,
    label: "고혈압",
    checked: false,
    disabled: false,
  },
  {
    id: 2,
    label: "당뇨병",
    checked: false,
    disabled: false,
  },
];

export const MockCheckupList = [
  {
    id: 1,
    label: "대장내시경",
    checked: false,
    disabled: false,
  },
  {
    id: 2,
    label: "위내시경",
    checked: false,
    disabled: false,
  },
  {
    id: 3,
    label: "상복부초음파",
    checked: false,
    disabled: false,
  },
  {
    id: 4,
    label: "갑상선초음파",
    checked: false,
    disabled: false,
  },
  {
    id: 5,
    label: "전립선초음파(남)",
    checked: false,
    disabled: false,
  },
  {
    id: 6,
    label: "골반초음파(여)",
    checked: false,
    disabled: false,
  },
  {
    id: 7,
    label: "심장초음파",
    checked: false,
    disabled: false,
  },
  {
    id: 8,
    label: "유방초음파(여)",
    checked: false,
    disabled: false,
  },
  {
    id: 9,
    label: "뇌CT",
    checked: false,
    disabled: false,
  },
  {
    id: 10,
    label: "폐CT",
    checked: false,
    disabled: false,
  },
  {
    id: 11,
    label: "목CT",
    checked: false,
    disabled: false,
  },
  {
    id: 12,
    label: "허리CT",
    checked: false,
    disabled: false,
  },
  {
    id: 13,
    label: "허리CT",
    checked: false,
    disabled: false,
  },
  {
    id: 14,
    label: "허리CT",
    checked: false,
    disabled: false,
  },
  {
    id: 15,
    label: "허리CT",
    checked: false,
    disabled: false,
  },
  {
    id: 16,
    label: "허리CT",
    checked: false,
    disabled: false,
  },
];

export const MockDsseList = [
  {
    id: 1,
    label: "뇌졸중(중풍)",
    checked: false,
    disabled: false
  },
  {
    id: 2,
    label: "심근경색, 협심증",
    checked: false,
    disabled: false
  },
  {
    id: 3,
    label: "고혈압",
    checked: false,
    disabled: false
  },
  {
    id: 4,
    label: "당뇨병",
    checked: false,
    disabled: false
  },
  {
    id: 5,
    label: "이상지질혈증",
    checked: false,
    disabled: false
  },
  {
    id: 6,
    label: "간질환",
    checked: false,
    disabled: false
  },
  {
    id: 7,
    label: "기타(암 포함)",
    checked: false,
    disabled: false
  },
];

export const MockCheckupQuestionnaire = [
  {
    id: 1,
    sequence: 1,
    answerType: "single",
    question: "당신의 성별은 무엇입니까?",
    answers: [
      {
        id: 1,
        label: "남성",
      },
      {
        id: 2,
        label: "여성",
      },
    ],
  },
  {
    id: 2,
    sequence: 2,
    answerType: "multiple",
    question: "아래 질환 중 과거 또는 현재에 앓고 계신 질환이 있나요? (복수 선택 가능)",
    answers: [
      {
        id: 1,
        label: "당뇨병",
      },
      {
        id: 2,
        label: "이상지질혈증",
      },
      {
        id: 3,
        label: "간질환",
      },
      {
        id: 4,
        label: "심근경색, 협심증",
      },
      {
        id: 5,
        label: "기타 (암 포함)",
      },
      {
        id: 6,
        label: "고혈압",
      },
    ],
  },
]