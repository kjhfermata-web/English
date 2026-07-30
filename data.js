// === 학습 데이터 ===

// 회화 데이터 - 상황별 대화문
const conversationData = {
    airport: {
        name: "공항/기내",
        emoji: "✈️",
        dialogues: [
            {
                situation: "체크인 카운터에서",
                lines: [
                    { speaker: "Staff", en: "Good morning. May I see your passport and ticket, please?", ko: "안녕하세요. 여권과 티켓을 보여주시겠어요?" },
                    { speaker: "You", en: "Here you go. I'd like a window seat, please.", ko: "여기요. 창가 좌석으로 부탁드려요." },
                    { speaker: "Staff", en: "Sure. Do you have any bags to check?", ko: "네. 부치실 짐이 있으신가요?" },
                    { speaker: "You", en: "Yes, I have one suitcase.", ko: "네, 캐리어 하나 있어요." }
                ],
                quiz: [
                    { question: "창가 좌석으로 부탁드려요.", answer: "I'd like a window seat, please.", choices: ["I'd like a window seat, please.", "Give me a window seat.", "I want window seat.", "Can I window seat?"] },
                    { question: "부치실 짐이 있으신가요?", answer: "Do you have any bags to check?", choices: ["Do you have any bags to check?", "Do you have luggage?", "Any bags for you?", "Where is your bag?"] }
                ]
            },
            {
                situation: "보안 검색대에서",
                lines: [
                    { speaker: "Officer", en: "Please put your laptop and liquids in a separate tray.", ko: "노트북과 액체류는 별도 트레이에 넣어주세요." },
                    { speaker: "You", en: "Okay. Should I take off my belt too?", ko: "네. 벨트도 벗어야 하나요?" },
                    { speaker: "Officer", en: "Yes, please. And remove your shoes as well.", ko: "네. 신발도 벗어주세요." },
                    { speaker: "You", en: "Got it. Thank you.", ko: "알겠습니다. 감사합니다." }
                ],
                quiz: [
                    { question: "벨트도 벗어야 하나요?", answer: "Should I take off my belt too?", choices: ["Should I take off my belt too?", "Do I remove belt?", "Belt off?", "Must I belt remove?"] },
                    { question: "신발도 벗어주세요.", answer: "Remove your shoes as well.", choices: ["Remove your shoes as well.", "Take shoes off.", "Shoes remove please.", "Off your shoes."] }
                ]
            },
            {
                situation: "기내에서",
                lines: [
                    { speaker: "Attendant", en: "Would you like something to drink?", ko: "음료 드릴까요?" },
                    { speaker: "You", en: "Can I have some orange juice, please?", ko: "오렌지 주스 주시겠어요?" },
                    { speaker: "Attendant", en: "Of course. Would you also like a snack?", ko: "물론이죠. 간식도 드릴까요?" },
                    { speaker: "You", en: "No, thank you. I'm fine.", ko: "아니요, 괜찮습니다." }
                ],
                quiz: [
                    { question: "오렌지 주스 주시겠어요?", answer: "Can I have some orange juice, please?", choices: ["Can I have some orange juice, please?", "Give me orange juice.", "Orange juice me.", "I want juice orange."] },
                    { question: "음료 드릴까요?", answer: "Would you like something to drink?", choices: ["Would you like something to drink?", "You want drink?", "Drink something?", "What drink you?"] }
                ]
            }
        ]
    },
    hotel: {
        name: "호텔",
        emoji: "🏨",
        dialogues: [
            {
                situation: "체크인할 때",
                lines: [
                    { speaker: "Staff", en: "Welcome! Do you have a reservation?", ko: "환영합니다! 예약하셨나요?" },
                    { speaker: "You", en: "Yes, I have a reservation under the name Kim.", ko: "네, 김이라는 이름으로 예약했어요." },
                    { speaker: "Staff", en: "Let me check. You're staying for three nights, correct?", ko: "확인해볼게요. 3박 맞으시죠?" },
                    { speaker: "You", en: "That's right. Is breakfast included?", ko: "맞아요. 조식 포함인가요?" }
                ],
                quiz: [
                    { question: "김이라는 이름으로 예약했어요.", answer: "I have a reservation under the name Kim.", choices: ["I have a reservation under the name Kim.", "I reserved name Kim.", "Kim reservation I have.", "My name Kim reservation."] },
                    { question: "조식 포함인가요?", answer: "Is breakfast included?", choices: ["Is breakfast included?", "Breakfast have?", "Include breakfast?", "Do breakfast included?"] }
                ]
            },
            {
                situation: "문제가 있을 때",
                lines: [
                    { speaker: "You", en: "Excuse me, the air conditioning isn't working in my room.", ko: "죄송한데, 방에 에어컨이 안 돼요." },
                    { speaker: "Staff", en: "I'm sorry about that. I'll send someone to fix it right away.", ko: "죄송합니다. 바로 수리 보내드릴게요." },
                    { speaker: "You", en: "Also, could I get some extra towels?", ko: "그리고 수건 좀 더 받을 수 있을까요?" },
                    { speaker: "Staff", en: "Absolutely. I'll have them sent up to your room.", ko: "물론이죠. 방으로 보내드릴게요." }
                ],
                quiz: [
                    { question: "방에 에어컨이 안 돼요.", answer: "The air conditioning isn't working in my room.", choices: ["The air conditioning isn't working in my room.", "Air conditioning broken.", "My room no air.", "Room air condition not work."] },
                    { question: "수건 좀 더 받을 수 있을까요?", answer: "Could I get some extra towels?", choices: ["Could I get some extra towels?", "Give me more towels.", "Extra towels want.", "I need towel more."] }
                ]
            }
        ]
    },
    restaurant: {
        name: "식당",
        emoji: "🍽️",
        dialogues: [
            {
                situation: "주문할 때",
                lines: [
                    { speaker: "Server", en: "Hi, are you ready to order?", ko: "안녕하세요, 주문하시겠어요?" },
                    { speaker: "You", en: "Yes. I'll have the grilled salmon, please.", ko: "네. 그릴드 연어로 할게요." },
                    { speaker: "Server", en: "Would you like any sides with that?", ko: "사이드 메뉴 추가하시겠어요?" },
                    { speaker: "You", en: "Can I get a side salad?", ko: "사이드 샐러드 추가할 수 있을까요?" }
                ],
                quiz: [
                    { question: "그릴드 연어로 할게요.", answer: "I'll have the grilled salmon, please.", choices: ["I'll have the grilled salmon, please.", "Give me salmon.", "I eat salmon grilled.", "Salmon for me grilled."] },
                    { question: "사이드 메뉴 추가하시겠어요?", answer: "Would you like any sides with that?", choices: ["Would you like any sides with that?", "You want sides?", "Sides extra?", "Any sides you want?"] }
                ]
            },
            {
                situation: "계산할 때",
                lines: [
                    { speaker: "You", en: "Excuse me, could I get the check, please?", ko: "저기요, 계산서 좀 주시겠어요?" },
                    { speaker: "Server", en: "Sure. Would you like to pay together or separately?", ko: "네. 같이 계산하시겠어요, 따로 하시겠어요?" },
                    { speaker: "You", en: "Together, please. Can I pay by card?", ko: "같이요. 카드로 결제할 수 있나요?" },
                    { speaker: "Server", en: "Of course. Here's your receipt. Have a great day!", ko: "물론이죠. 영수증 여기 있습니다. 좋은 하루 보내세요!" }
                ],
                quiz: [
                    { question: "계산서 좀 주시겠어요?", answer: "Could I get the check, please?", choices: ["Could I get the check, please?", "Give me bill.", "Check now.", "Pay I want."] },
                    { question: "카드로 결제할 수 있나요?", answer: "Can I pay by card?", choices: ["Can I pay by card?", "Card pay possible?", "I use card?", "Pay card okay?"] }
                ]
            }
        ]
    },
    shopping: {
        name: "쇼핑",
        emoji: "🛍️",
        dialogues: [
            {
                situation: "옷가게에서",
                lines: [
                    { speaker: "Staff", en: "Can I help you find anything?", ko: "찾으시는 거 있으세요?" },
                    { speaker: "You", en: "I'm looking for a jacket. Do you have this in medium?", ko: "자켓을 찾고 있어요. 이거 미디엄 사이즈 있나요?" },
                    { speaker: "Staff", en: "Let me check. Would you like to try it on?", ko: "확인해볼게요. 입어보시겠어요?" },
                    { speaker: "You", en: "Yes, please. Where's the fitting room?", ko: "네. 탈의실이 어디예요?" }
                ],
                quiz: [
                    { question: "이거 미디엄 사이즈 있나요?", answer: "Do you have this in medium?", choices: ["Do you have this in medium?", "Medium size this?", "Is there medium?", "Give medium size."] },
                    { question: "탈의실이 어디예요?", answer: "Where's the fitting room?", choices: ["Where's the fitting room?", "Fitting room where?", "Where I try clothes?", "Room for try where?"] }
                ]
            },
            {
                situation: "가격 흥정/할인",
                lines: [
                    { speaker: "You", en: "How much is this?", ko: "이거 얼마예요?" },
                    { speaker: "Staff", en: "It's $45. But we have a 20% off sale today.", ko: "45달러예요. 그런데 오늘 20% 할인 중이에요." },
                    { speaker: "You", en: "That's a good deal! I'll take it.", ko: "좋은 가격이네요! 이걸로 할게요." },
                    { speaker: "Staff", en: "Great choice! Would you like a bag?", ko: "좋은 선택이에요! 봉투 드릴까요?" }
                ],
                quiz: [
                    { question: "이거 얼마예요?", answer: "How much is this?", choices: ["How much is this?", "What price this?", "This cost how?", "Money how much?"] },
                    { question: "이걸로 할게요.", answer: "I'll take it.", choices: ["I'll take it.", "I buy this.", "This one me.", "Give me this buy."] }
                ]
            }
        ]
    },
    directions: {
        name: "길 묻기",
        emoji: "🗺️",
        dialogues: [
            {
                situation: "목적지 찾기",
                lines: [
                    { speaker: "You", en: "Excuse me, how do I get to the train station?", ko: "실례합니다, 기차역까지 어떻게 가나요?" },
                    { speaker: "Local", en: "Go straight for two blocks, then turn left at the traffic light.", ko: "두 블록 직진하시고, 신호등에서 왼쪽으로 도세요." },
                    { speaker: "You", en: "Is it far from here? Can I walk there?", ko: "여기서 멀어요? 걸어갈 수 있나요?" },
                    { speaker: "Local", en: "It's about a 10-minute walk.", ko: "걸어서 약 10분 정도요." }
                ],
                quiz: [
                    { question: "기차역까지 어떻게 가나요?", answer: "How do I get to the train station?", choices: ["How do I get to the train station?", "Where is train station?", "Train station how?", "Go train station how?"] },
                    { question: "걸어갈 수 있나요?", answer: "Can I walk there?", choices: ["Can I walk there?", "Is walking possible?", "Walk I can?", "Can walk there me?"] }
                ]
            },
            {
                situation: "대중교통 이용",
                lines: [
                    { speaker: "You", en: "Which bus goes to the city center?", ko: "시내 중심으로 가는 버스가 어떤 건가요?" },
                    { speaker: "Local", en: "Take bus number 42. The stop is right across the street.", ko: "42번 버스 타세요. 정류장은 길 건너편에 있어요." },
                    { speaker: "You", en: "How often does it come?", ko: "얼마나 자주 오나요?" },
                    { speaker: "Local", en: "Every 15 minutes or so.", ko: "15분 간격으로요." }
                ],
                quiz: [
                    { question: "시내 중심으로 가는 버스가 어떤 건가요?", answer: "Which bus goes to the city center?", choices: ["Which bus goes to the city center?", "What bus city center?", "Bus to center which?", "City center bus number?"] },
                    { question: "얼마나 자주 오나요?", answer: "How often does it come?", choices: ["How often does it come?", "How many times come?", "When bus come?", "Bus frequent how?"] }
                ]
            }
        ]
    },
    daily: {
        name: "일상 대화",
        emoji: "🏠",
        dialogues: [
            {
                situation: "인사와 안부",
                lines: [
                    { speaker: "Friend", en: "Hey! How have you been?", ko: "안녕! 어떻게 지냈어?" },
                    { speaker: "You", en: "I've been good, thanks! How about you?", ko: "잘 지냈어, 고마워! 너는?" },
                    { speaker: "Friend", en: "Pretty busy with work, but I can't complain.", ko: "일 때문에 좀 바쁜데, 그래도 괜찮아." },
                    { speaker: "You", en: "Let's grab coffee sometime. Are you free this weekend?", ko: "언제 커피 한잔 하자. 이번 주말에 시간 돼?" }
                ],
                quiz: [
                    { question: "어떻게 지냈어?", answer: "How have you been?", choices: ["How have you been?", "How are you doing?", "What you doing?", "You okay been?"] },
                    { question: "이번 주말에 시간 돼?", answer: "Are you free this weekend?", choices: ["Are you free this weekend?", "This weekend you free?", "Weekend time have?", "Free weekend you?"] }
                ]
            },
            {
                situation: "약속 잡기",
                lines: [
                    { speaker: "You", en: "Would you like to have dinner together on Friday?", ko: "금요일에 같이 저녁 먹을래?" },
                    { speaker: "Friend", en: "Sounds great! Where should we meet?", ko: "좋아! 어디서 만날까?" },
                    { speaker: "You", en: "How about that new Italian restaurant near the station?", ko: "역 근처 새로 생긴 이탈리안 식당 어때?" },
                    { speaker: "Friend", en: "Perfect. Let's meet at 7 o'clock.", ko: "좋아. 7시에 만나자." }
                ],
                quiz: [
                    { question: "금요일에 같이 저녁 먹을래?", answer: "Would you like to have dinner together on Friday?", choices: ["Would you like to have dinner together on Friday?", "Friday dinner together?", "Eat dinner Friday us?", "We dinner Friday want?"] },
                    { question: "어디서 만날까?", answer: "Where should we meet?", choices: ["Where should we meet?", "Where we meet?", "Meet where us?", "What place meet?"] }
                ]
            }
        ]
    }
};

// 듣기 데이터 - 주제별 문장
const listeningData = {
    travel: {
        name: "여행 표현",
        emoji: "🌍",
        sentences: [
            { en: "I'd like to book a round-trip ticket to London.", ko: "런던행 왕복 티켓을 예약하고 싶습니다.", hint: "round-trip = 왕복" },
            { en: "Could you recommend a good restaurant nearby?", ko: "근처에 좋은 식당 추천해주시겠어요?", hint: "recommend = 추천하다" },
            { en: "What time does the museum close today?", ko: "오늘 박물관 몇 시에 문 닫나요?", hint: "close = 닫다" },
            { en: "I need to exchange some money. Where's the nearest bank?", ko: "환전을 해야 해요. 가장 가까운 은행이 어디예요?", hint: "exchange = 환전하다" },
            { en: "Is there a pharmacy around here? I need some medicine.", ko: "이 근처에 약국이 있나요? 약이 필요해요.", hint: "pharmacy = 약국" },
            { en: "How long does it take to get to the airport by taxi?", ko: "택시로 공항까지 얼마나 걸려요?", hint: "How long does it take = 얼마나 걸리나요" },
            { en: "I lost my luggage. Can you help me find it?", ko: "짐을 잃어버렸어요. 찾는 걸 도와주시겠어요?", hint: "lost = 잃어버렸다" },
            { en: "We'd like a table for two by the window, please.", ko: "창가 쪽 2인 테이블로 부탁합니다.", hint: "by the window = 창가 옆에" }
        ]
    },
    dailyLife: {
        name: "일상생활",
        emoji: "☀️",
        sentences: [
            { en: "I usually wake up at seven and have breakfast at half past.", ko: "보통 7시에 일어나서 7시 반에 아침을 먹어요.", hint: "half past = 30분" },
            { en: "Could you pick up some groceries on your way home?", ko: "집에 오는 길에 장 좀 봐줄 수 있어?", hint: "pick up = 사다/가져오다" },
            { en: "I'm thinking about joining a gym. Do you know a good one?", ko: "헬스장에 등록하려고 하는데. 좋은 데 알아?", hint: "join a gym = 헬스장에 등록하다" },
            { en: "The weather forecast says it's going to rain this afternoon.", ko: "일기예보에서 오후에 비 온다고 했어.", hint: "weather forecast = 일기예보" },
            { en: "I need to make an appointment with my dentist.", ko: "치과 예약을 잡아야 해.", hint: "make an appointment = 예약을 잡다" },
            { en: "Can you turn down the volume? I'm trying to sleep.", ko: "볼륨 좀 줄여줄래? 나 자려고 하는데.", hint: "turn down = 줄이다" },
            { en: "Let me know if you need any help moving this weekend.", ko: "이번 주말 이사하는 데 도움 필요하면 말해.", hint: "Let me know = 알려줘" },
            { en: "I've been stuck in traffic for over an hour.", ko: "한 시간 넘게 교통 체증에 갇혀 있어.", hint: "stuck in traffic = 교통 체증에 갇히다" }
        ]
    },
    shopping: {
        name: "쇼핑/주문",
        emoji: "🛒",
        sentences: [
            { en: "Do you have this shirt in a smaller size?", ko: "이 셔츠 더 작은 사이즈 있나요?", hint: "smaller size = 더 작은 사이즈" },
            { en: "I'd like to return this. I bought it yesterday.", ko: "이거 반품하고 싶어요. 어제 샀어요.", hint: "return = 반품하다" },
            { en: "Is this on sale? The tag seems wrong.", ko: "이거 세일 중인가요? 가격표가 잘못된 것 같은데요.", hint: "on sale = 세일 중" },
            { en: "Can I get a refund or only store credit?", ko: "환불 가능한가요, 아니면 적립금으로만 되나요?", hint: "refund = 환불" },
            { en: "I'll pay in cash. Do you give a discount for that?", ko: "현금으로 낼게요. 현금 할인 되나요?", hint: "pay in cash = 현금으로 내다" },
            { en: "Could you wrap this as a gift, please?", ko: "선물 포장해주시겠어요?", hint: "wrap = 포장하다" },
            { en: "Where can I find the electronics section?", ko: "전자제품 코너가 어디예요?", hint: "electronics section = 전자제품 코너" },
            { en: "This doesn't fit me. Can I exchange it for a larger one?", ko: "이거 안 맞아요. 큰 걸로 교환할 수 있나요?", hint: "exchange = 교환하다" }
        ]
    },
    health: {
        name: "건강/병원",
        emoji: "🏥",
        sentences: [
            { en: "I've had a headache since this morning.", ko: "오늘 아침부터 두통이 있어요.", hint: "headache = 두통" },
            { en: "I think I'm coming down with a cold.", ko: "감기에 걸리는 것 같아요.", hint: "coming down with = ~에 걸리다" },
            { en: "Do I need a prescription for this medicine?", ko: "이 약은 처방전이 필요한가요?", hint: "prescription = 처방전" },
            { en: "My stomach has been bothering me for a few days.", ko: "며칠째 속이 안 좋아요.", hint: "bother = 괴롭히다/불편하다" },
            { en: "I'd like to schedule a check-up, please.", ko: "건강검진 예약하고 싶습니다.", hint: "check-up = 건강검진" },
            { en: "Are there any side effects I should know about?", ko: "제가 알아야 할 부작용이 있나요?", hint: "side effects = 부작용" },
            { en: "I'm allergic to penicillin.", ko: "저는 페니실린에 알레르기가 있어요.", hint: "allergic to = ~에 알레르기가 있다" },
            { en: "How many times a day should I take this?", ko: "이거 하루에 몇 번 먹어야 하나요?", hint: "How many times = 몇 번" }
        ]
    }
};

// 단어 데이터 - 주제별
const vocabularyData = {
    travel: {
        name: "여행 필수",
        emoji: "✈️",
        words: [
            { en: "departure", ko: "출발", example: "The departure time is 3 PM.", phonetic: "/dɪˈpɑːrtʃər/" },
            { en: "arrival", ko: "도착", example: "Check the arrival board for updates.", phonetic: "/əˈraɪvəl/" },
            { en: "boarding pass", ko: "탑승권", example: "Please show your boarding pass.", phonetic: "/ˈbɔːrdɪŋ pæs/" },
            { en: "luggage", ko: "짐/수화물", example: "Where can I pick up my luggage?", phonetic: "/ˈlʌɡɪdʒ/" },
            { en: "reservation", ko: "예약", example: "I have a reservation for tonight.", phonetic: "/ˌrezərˈveɪʃən/" },
            { en: "itinerary", ko: "여행 일정", example: "Let me check my itinerary.", phonetic: "/aɪˈtɪnəreri/" },
            { en: "destination", ko: "목적지", example: "What's your final destination?", phonetic: "/ˌdestɪˈneɪʃən/" },
            { en: "currency", ko: "통화/환율", example: "What currency do they use there?", phonetic: "/ˈkɜːrənsi/" },
            { en: "souvenir", ko: "기념품", example: "I bought a souvenir for my family.", phonetic: "/ˌsuːvəˈnɪr/" },
            { en: "customs", ko: "세관", example: "You need to go through customs.", phonetic: "/ˈkʌstəmz/" }
        ]
    },
    food: {
        name: "음식/식당",
        emoji: "🍕",
        words: [
            { en: "appetizer", ko: "전채 요리", example: "Would you like an appetizer?", phonetic: "/ˈæpɪtaɪzər/" },
            { en: "beverage", ko: "음료", example: "What beverage would you like?", phonetic: "/ˈbevərɪdʒ/" },
            { en: "receipt", ko: "영수증", example: "Can I have the receipt, please?", phonetic: "/rɪˈsiːt/" },
            { en: "tip", ko: "팁/봉사료", example: "How much should I leave as a tip?", phonetic: "/tɪp/" },
            { en: "portion", ko: "1인분/양", example: "The portions here are huge.", phonetic: "/ˈpɔːrʃən/" },
            { en: "allergy", ko: "알레르기", example: "I have a nut allergy.", phonetic: "/ˈælərdʒi/" },
            { en: "vegetarian", ko: "채식주의자", example: "Do you have vegetarian options?", phonetic: "/ˌvedʒəˈteriən/" },
            { en: "spicy", ko: "매운", example: "Is this dish spicy?", phonetic: "/ˈspaɪsi/" },
            { en: "ingredient", ko: "재료/성분", example: "What are the main ingredients?", phonetic: "/ɪnˈɡriːdiənt/" },
            { en: "well-done", ko: "웰던(완전히 익힌)", example: "I'd like my steak well-done.", phonetic: "/ˌwel ˈdʌn/" }
        ]
    },
    accommodation: {
        name: "숙소/집",
        emoji: "🏠",
        words: [
            { en: "check-in", ko: "체크인", example: "Check-in is at 3 PM.", phonetic: "/ˈtʃek ɪn/" },
            { en: "vacancy", ko: "빈 방", example: "Do you have any vacancies?", phonetic: "/ˈveɪkənsi/" },
            { en: "amenities", ko: "편의시설", example: "The hotel has great amenities.", phonetic: "/əˈmenɪtiz/" },
            { en: "housekeeping", ko: "객실 청소", example: "Please send housekeeping to room 302.", phonetic: "/ˈhaʊskiːpɪŋ/" },
            { en: "lobby", ko: "로비", example: "I'll meet you in the lobby.", phonetic: "/ˈlɑːbi/" },
            { en: "suite", ko: "스위트룸", example: "We upgraded to a suite.", phonetic: "/swiːt/" },
            { en: "deposit", ko: "보증금", example: "There's a $100 security deposit.", phonetic: "/dɪˈpɑːzɪt/" },
            { en: "complimentary", ko: "무료 제공의", example: "Breakfast is complimentary.", phonetic: "/ˌkɑːmplɪˈmentəri/" },
            { en: "laundry", ko: "세탁", example: "Is there a laundry service?", phonetic: "/ˈlɔːndri/" },
            { en: "checkout", ko: "체크아웃", example: "Checkout is by 11 AM.", phonetic: "/ˈtʃekaʊt/" }
        ]
    },
    transport: {
        name: "교통/이동",
        emoji: "🚌",
        words: [
            { en: "transfer", ko: "환승", example: "You need to transfer at the next stop.", phonetic: "/ˈtrænsfɜːr/" },
            { en: "fare", ko: "요금", example: "What's the bus fare?", phonetic: "/fer/" },
            { en: "terminal", ko: "터미널", example: "Which terminal does the flight depart from?", phonetic: "/ˈtɜːrmɪnəl/" },
            { en: "platform", ko: "플랫폼/승강장", example: "The train leaves from platform 3.", phonetic: "/ˈplætfɔːrm/" },
            { en: "schedule", ko: "시간표", example: "Can I see the bus schedule?", phonetic: "/ˈskedʒuːl/" },
            { en: "delay", ko: "지연", example: "There's a 30-minute delay.", phonetic: "/dɪˈleɪ/" },
            { en: "commute", ko: "통근", example: "My commute takes about an hour.", phonetic: "/kəˈmjuːt/" },
            { en: "intersection", ko: "교차로", example: "Turn right at the intersection.", phonetic: "/ˌɪntərˈsekʃən/" },
            { en: "pedestrian", ko: "보행자", example: "Use the pedestrian crossing.", phonetic: "/pəˈdestriən/" },
            { en: "one-way", ko: "편도", example: "Is this a one-way ticket?", phonetic: "/ˌwʌn ˈweɪ/" }
        ]
    },
    emergency: {
        name: "긴급/위급",
        emoji: "🚨",
        words: [
            { en: "emergency", ko: "긴급 상황", example: "Call 911 in case of emergency.", phonetic: "/ɪˈmɜːrdʒənsi/" },
            { en: "ambulance", ko: "구급차", example: "Please call an ambulance!", phonetic: "/ˈæmbjələns/" },
            { en: "symptom", ko: "증상", example: "What are your symptoms?", phonetic: "/ˈsɪmptəm/" },
            { en: "insurance", ko: "보험", example: "Do you have travel insurance?", phonetic: "/ɪnˈʃʊrəns/" },
            { en: "embassy", ko: "대사관", example: "Contact the Korean embassy.", phonetic: "/ˈembəsi/" },
            { en: "lost and found", ko: "분실물 센터", example: "Check the lost and found office.", phonetic: "/lɔːst ənd faʊnd/" },
            { en: "stolen", ko: "도난당한", example: "My wallet was stolen.", phonetic: "/ˈstoʊlən/" },
            { en: "witness", ko: "목격자", example: "Were there any witnesses?", phonetic: "/ˈwɪtnəs/" },
            { en: "report", ko: "신고하다", example: "I need to report a theft.", phonetic: "/rɪˈpɔːrt/" },
            { en: "first aid", ko: "응급처치", example: "Do you have a first aid kit?", phonetic: "/ˌfɜːrst ˈeɪd/" }
        ]
    }
};

// 문법 데이터 - 회화에 필요한 핵심 패턴
const grammarData = {
    patterns: {
        name: "기본 패턴",
        emoji: "🔤",
        lessons: [
            {
                title: "I'd like to ~ (하고 싶어요)",
                pattern: "I'd like to + 동사원형",
                examples: ["I'd like to book a room.", "I'd like to try this on.", "I'd like to make a reservation."],
                exercises: [
                    { question: "방을 예약하고 싶어요.", answer: "I'd like to book a room.", choices: ["I'd like to book a room.", "I want book room.", "I like book a room.", "Book room I want."] },
                    { question: "이것을 입어보고 싶어요.", answer: "I'd like to try this on.", choices: ["I'd like to try this on.", "I want try this.", "Try this I like.", "I like try on this."] }
                ]
            },
            {
                title: "Could you ~? (해주시겠어요?)",
                pattern: "Could you + 동사원형 ~?",
                examples: ["Could you help me?", "Could you speak more slowly?", "Could you repeat that?"],
                exercises: [
                    { question: "좀 도와주시겠어요?", answer: "Could you help me?", choices: ["Could you help me?", "You help me?", "Help me can you?", "Can help me you?"] },
                    { question: "좀 더 천천히 말해주시겠어요?", answer: "Could you speak more slowly?", choices: ["Could you speak more slowly?", "Speak slow please.", "More slow you speak?", "You can slow speak?"] }
                ]
            },
            {
                title: "How do I ~? (어떻게 ~하나요?)",
                pattern: "How do I + 동사원형 ~?",
                examples: ["How do I get there?", "How do I pay for this?", "How do I use this machine?"],
                exercises: [
                    { question: "거기에 어떻게 가나요?", answer: "How do I get there?", choices: ["How do I get there?", "How go there?", "Where I go there?", "Get there how?"] },
                    { question: "이거 어떻게 결제하나요?", answer: "How do I pay for this?", choices: ["How do I pay for this?", "How pay this?", "Pay how for this?", "This pay how do?"] }
                ]
            }
        ]
    },
    questions: {
        name: "질문 만들기",
        emoji: "❓",
        lessons: [
            {
                title: "Is there ~? (~이 있나요?)",
                pattern: "Is there + 명사 ~?",
                examples: ["Is there a restroom nearby?", "Is there WiFi here?", "Is there a discount?"],
                exercises: [
                    { question: "근처에 화장실이 있나요?", answer: "Is there a restroom nearby?", choices: ["Is there a restroom nearby?", "Restroom is where?", "Where restroom near?", "Near restroom there?"] },
                    { question: "여기 와이파이 있나요?", answer: "Is there WiFi here?", choices: ["Is there WiFi here?", "WiFi here is?", "Here WiFi have?", "Do WiFi here?"] }
                ]
            },
            {
                title: "Do you have ~? (~이 있나요?)",
                pattern: "Do you have + 명사 ~?",
                examples: ["Do you have a menu in English?", "Do you have a smaller size?", "Do you have any recommendations?"],
                exercises: [
                    { question: "영어 메뉴 있나요?", answer: "Do you have a menu in English?", choices: ["Do you have a menu in English?", "English menu have?", "Menu English you have?", "Have English menu?"] },
                    { question: "추천하는 거 있나요?", answer: "Do you have any recommendations?", choices: ["Do you have any recommendations?", "Recommend something?", "What you recommend have?", "Any recommend you?"] }
                ]
            },
            {
                title: "What time ~? (몇 시에 ~?)",
                pattern: "What time + do/does/is ~?",
                examples: ["What time does it open?", "What time is checkout?", "What time does the show start?"],
                exercises: [
                    { question: "몇 시에 열어요?", answer: "What time does it open?", choices: ["What time does it open?", "When open?", "It open what time?", "Open time what?"] },
                    { question: "공연 몇 시에 시작해요?", answer: "What time does the show start?", choices: ["What time does the show start?", "Show start when?", "When show start?", "Start time show?"] }
                ]
            }
        ]
    }
};
