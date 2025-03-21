export const questionnaire = [
    {
        id: 1,
        sequence: 1,
        question: "성별이 어떻게 되시나요?",
        answerType: "single",
        includeNA: false,
        answerList: [
            {
                key: 1,
                value: '남자'
            },
            {
                key: 2,
                value: '여자'
            },
        ]
    },
    {
        id: 2,
        sequence: 2,
        question: "나이가 어떻게 되시나요?",
        answerType: "single",
        includeNA: false,
        answerList: [
            {
                key: 1,
                value: '20대'
            },
            {
                key: 2,
                value: '30대'
            },
            {
                key: 3,
                value: '40대'
            },
            {
                key: 4,
                value: '50대'
            },
            {
                key: 5,
                value: '60대'
            },
            {
                key: 6,
                value: '70대 이상'
            },
        ]
    },
    {
        id: 3,
        sequence: 3,
        question: "아래 질환 중 과거 또는 현재에 앓고 계신 질환이 있나요? (복수 선택 가능)",
        answerType: "multiple",
        includeNA: true,    // '해당없음' 포함해야하는지 여부
        answerList: [
            {
                key: 1,
                value: '당뇨병'
            },
            {
                key: 2,
                value: '이상지질혈증'
            },
            {
                key: 3,
                value: '간질환'
            },
            {
                key: 4,
                value: '심근경색, 협심증'
            },
            {
                key: 5,
                value: '기타(암 포함)'
            },
            {
                key: 6,
                value: '고혈압'
            },
        ]
    },
    {
        id: 4,
        sequence: 4,
        question: "과거 또는 현재 복용하고 계신 약이 있나요?",
        answerType: "multiple",
        includeNA: true,    // '해당없음' 포함해야하는지 여부
        answerList: [
            {
                key: 1,
                value: '뇌졸증(중풍)'
            },
            {
                key: 2,
                value: '심근경색, 협심증'
            },
            {
                key: 3,
                value: '고혈압'
            },
            {
                key: 4,
                value: '당뇨병'
            },
            {
                key: 5,
                value: '이상지질혈증'
            },
            {
                key: 6,
                value: '간질환'
            },
            {
                key: 7,
                value: '기타(암 포함)'
            },
        ]
    },
]