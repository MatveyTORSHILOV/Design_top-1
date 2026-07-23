export const navLinks = [
  { id: "primal", label: "Исток" },
  { id: "prologue", label: "Пролог" },
  { id: "tensions", label: "Противоречия" },
  { id: "ascent", label: "Восхождение" },
  { id: "gallery", label: "Салон" },
  { id: "epoch", label: "Эпоха" },
  { id: "epilogue", label: "Выход" },
];

export const heroPanels = [
  { image: "/assets/gallery/art-panels.jpg", num: "I" },
  { image: "/assets/gallery/art-salon.jpg", num: "II" },
  { image: "/assets/gallery/art-vertical.jpg", num: "III" },
  { image: "/assets/gallery/art-code.jpg", num: "IV" },
  { image: "/assets/gallery/art-salon.jpg", num: "V" },
  { image: "/assets/gallery/art-panels.jpg", num: "VI" },
];

export const floatingPhrases = [
  "Форма предшествует слову",
  "Рука помнит раньше разума",
  "Каждый штрих — акт сопротивления тьме",
  "Вертикаль — это молитва",
];

export const tensions = [
  {
    num: "01",
    poleA: "Оптимизм",
    poleB: "Травма",
    psych: "Психология · Гедонизм после раны",
    title: "Праздник как броня",
    text: "После потрясений общество жаждало красоты, комфорта, радости — не из легкомыслия, а из необходимости снова почувствовать себя живым. Ар-деко провозгласил гламур выживательным: блеск как ритуал возвращения к жизни.",
  },
  {
    num: "02",
    poleA: "Древнее",
    poleB: "Машина",
    psych: "Психология · Синтез несочетаемого",
    title: "Гробница Тутанхамона и небоскрёб",
    text: "Стиль соединял кубистическую геометрию с египетскими, африканскими, мезоамериканскими мотивами. Прошлое служит опорой для будущего — не ностальгии, а трамплина.",
  },
  {
    num: "03",
    poleA: "Функция",
    poleB: "Орнамент",
    psych: "Психология · Форма как несущий смысл",
    title: "Декор, который держит конструкцию",
    text: "Орнамент не лежит поверх — он формирует композицию. Ступень ведёт взгляд вверх, шеврон фиксирует динамику, солнцеворот собирает энергию в центр.",
  },
  {
    num: "04",
    poleA: "Человек",
    poleB: "Индустрия",
    psych: "Психология · Культ машинного века",
    title: "Хром, скорость, зиккурат",
    text: "Зигзаг — метафора энергии. Ступенчатые формы — величие, достижимое инженерией. Человек не жертва прогресса, а его дирижёр.",
  },
  {
    num: "05",
    poleA: "Единство",
    poleB: "Эклектика",
    psych: "Психология · Диалог культур",
    title: "Мир без центра, но с осью",
    text: "Ар-деко собирал мир в одну витрину — универсальную, но насыщенную. Страх разобщённости компенсируется синтезом.",
  },
];

export const galleryItems = [
  {
    src: "/assets/gallery/art-panels.jpg",
    alt: "Шестипанельная композиция в стиле ар-деко",
    title: "Шесть панелей",
    desc: "Синтез · Восток · Геометрия",
    caption: "Шесть панелей · Синтез восточной перспективы и ар-деко",
    class: "gallery__item--hero",
  },
  {
    src: "/assets/gallery/art-salon.jpg",
    alt: "Интерьер ар-деко",
    title: "Салон",
    desc: "Гедонизм · Нуар · Город",
    caption: "Нуар · Гедонизм после тьмы",
    class: "gallery__item--tall",
  },
  {
    src: "/assets/gallery/art-vertical.jpg",
    alt: "Обложка Art Deco",
    title: "Вертикаль",
    desc: "Небоскрёб · Амбиция",
    caption: "Вертикаль · Амбиция эпохи",
    class: "gallery__item--half",
  },
  {
    src: "/assets/gallery/art-code.jpg",
    alt: "Инфографика Art Deco",
    title: "Кодекс",
    desc: "Геометрия · Материалы · Символы",
    caption: "Карта стиля · Пять столпов ар-деко",
    class: "gallery__item--half",
  },
];

export const materials = [
  { name: "Or", hex: "#C9A227", bg: "#c9a227" },
  { name: "Obsidian", hex: "#08080A", bg: "#08080a" },
  { name: "Émeraude", hex: "#1B3B2F", bg: "#1b3b2f" },
  { name: "Cramoisi", hex: "#6B1C2A", bg: "#6b1c2a" },
  { name: "Cuivre", hex: "#B87333", bg: "#b87333" },
  { name: "Chrome", hex: "#B8B8B8", bg: "linear-gradient(135deg, #e8e8e8, #a0a0a0)" },
];

export const epochPoints = [
  {
    year: "40 000",
    event: "Первый жест",
    context: "Пещера. Уголь. Мамонт. Человек впервые оставляет след — не для красоты, а чтобы сказать: я был здесь.",
  },
  {
    year: "1910",
    event: "Рождение «стиля 1925»",
    context: "Парижские мастерские. Мир ещё не знает названия — но уже тянется к форме.",
  },
  {
    year: "1922",
    event: "Тутанхамон",
    context: "Египетский мотив входит в западную психологию — экзотика как обещание вечности.",
  },
  {
    year: "1925",
    event: "Exposition des Arts Décoratifs",
    context: "Париж. Стиль получает имя. Декоративное становится революционным.",
  },
  {
    year: "1930",
    event: "Streamline Moderne",
    context: "Авиация, скорость. Машина становится телом эпохи.",
  },
  {
    year: "1939",
    event: "Закат золотого века",
    context: "Война снова. Но форма остаётся — в архитектуре, в памяти, на холсте.",
  },
];
