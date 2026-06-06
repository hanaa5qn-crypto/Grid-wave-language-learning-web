// =============================================================================
// A1 Загвар Шалгалт — Goethe-Zertifikat A1 (Start Deutsch 1) форматтай
// -----------------------------------------------------------------------------
// Энэхүү шалгалт нь олон улсад хүлээн зөвшөөрөгдсөн Goethe-Institut-ийн
// "Start Deutsch 1" (A1) шалгалтын албан ёсны бүтцийг (Lesen / Hören /
// Schreiben / Sprechen — 4 модуль) баримталсан. Асуултууд нь зохиогчийн эрхээр
// хамгаалагдсан албан ёсны материалыг хуулбарлаагүй, А1 түвшинд тохирсон,
// ижил хэлбэр/сэдвээр шинээр зохиосон төлөөлөл болгон бэлдсэн болно.
//
// Бүтэц (албан ёсны Goethe A1 форматын дагуу):
//   • Lesen    (Унших)  — Teil 1: и-мэйл + Richtig/Falsch · Teil 2: зар тааруулах · Teil 3: зарлал/тэмдэг
//   • Hören    (Сонсох) — Teil 1: богино яриа (MCQ) · Teil 2: зарлал (R/F) · Teil 3: яриа (MCQ)
//   • Schreiben(Бичих)  — Teil 1: маягт бөглөх · Teil 2: богино захидал (~30 үг)
//   • Sprechen (Ярих)   — Teil 1: танилцуулга · Teil 2: мэдээлэл асуух · Teil 3: хүсэлт гаргах
// =============================================================================

// Бодит хариулттай (объектив) асуулт — Richtig/Falsch эсвэл a/b/c сонголт.
export interface ObjectiveQuestion {
  prompt: string;          // Герман өгүүлбэр / асуулт
  mongolian?: string;      // Монгол орчуулга / тусламж
  options: string[];       // Сонголтууд (R/F бол ['Richtig','Falsch'])
  correctIndex: number;    // Зөв сонголтын индекс
  explanation: string;     // Монгол тайлбар
}

// --- Lesen (Унших) -----------------------------------------------------------
export interface ReadingPart {
  teil: number;
  title: string;           // Монгол гарчиг
  instruction: string;     // Монгол заавар
  context?: string;        // Герман эх бичвэр (и-мэйл / зар / тэмдэг)
  contextMongolian?: string;
  questions: ObjectiveQuestion[];
}

// --- Hören (Сонсох) ----------------------------------------------------------
export interface ListeningPart {
  teil: number;
  title: string;
  instruction: string;
  audioText: string;       // TTS-ээр "сонсох" герман бичвэр (бичлэгийн орлуулга)
  audioLabel: string;      // Монгол шошго (ж: "Утасны мессеж", "Буудлын зарлал")
  questions: ObjectiveQuestion[];
}

// --- Schreiben (Бичих) -------------------------------------------------------
export interface WritingFormField {
  label: string;           // Герман талбарын нэр (ж: "Familienname:")
  mongolian: string;       // Монгол тайлбар
  expected: string[];      // Хүлээн зөвшөөрөх хариултууд (жижиг/том үсэг тоохгүй)
  placeholder?: string;
}

export interface WritingForm {
  teil: number;
  title: string;
  instruction: string;
  scenario: string;        // Хүний тухай герман бичвэр
  scenarioMongolian: string;
  formTitle: string;       // Маягтын герман гарчиг
  fields: WritingFormField[];
}

export interface WritingLetter {
  teil: number;
  title: string;
  instruction: string;
  scenarioMongolian: string;   // Даалгаврын тайлбар (монгол)
  bulletPoints: string[];      // 3 бичих санаа (монгол)
  modelAnswer: string;         // Герман загвар хариулт
  modelAnswerMongolian: string;
  checklist: string[];         // Өөрийгөө үнэлэх жагсаалт (монгол)
}

// --- Sprechen (Ярих) ---------------------------------------------------------
export interface SpeakingTask {
  teil: number;
  title: string;
  instruction: string;
  card: string;                // Карт дээрх түлхүүр (ж: "Name?", "Thema: Urlaub")
  cardMongolian: string;
  modelAnswer: string;         // Герман загвар хариулт (TTS-ээр сонсох / харьцуулах)
  modelAnswerMongolian: string;
  checklist: string[];         // Өөрийгөө үнэлэх шалгуур (монгол)
}

// =============================================================================
// 1) LESEN — Унших
// =============================================================================
export const A1_READING: ReadingPart[] = [
  {
    teil: 1,
    title: '1-р хэсэг — И-мэйл унших',
    instruction: 'И-мэйлийг уншаад өгүүлбэр бүр Richtig (зөв) эсвэл Falsch (буруу) эсэхийг тэмдэглэнэ үү.',
    context:
      'Liebe Sara,\n\nich komme am Samstag nach Hamburg. Mein Zug kommt um 15 Uhr am Hauptbahnhof an. Kannst du mich abholen? Am Abend möchte ich gern Pizza essen.\n\nBis bald!\nDeine Lena',
    contextMongolian:
      'Хайрт Сара,\n\nБи Бямба гарагт Хамбург руу очно. Галт тэрэг минь 15 цагт төв буудалд ирнэ. Чи намайг тосож чадах уу? Орой би пицца идмээр байна.\n\nудахгүй уулзацгаая!\nЧиний Лена',
    questions: [
      {
        prompt: 'Lena kommt am Sonntag nach Hamburg.',
        mongolian: 'Лена Ням гарагт Хамбург руу ирнэ.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 1,
        explanation: 'Falsch. Тэр "am Samstag" (Бямба гарагт) ирнэ гэж бичсэн, Ням гарагт биш.',
      },
      {
        prompt: 'Der Zug kommt um 15 Uhr an.',
        mongolian: 'Галт тэрэг 15 цагт ирнэ.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 0,
        explanation: 'Richtig. "Mein Zug kommt um 15 Uhr ... an" гэж тодорхой бичсэн.',
      },
      {
        prompt: 'Lena möchte am Abend Pizza essen.',
        mongolian: 'Лена орой пицца идмээр байна.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 0,
        explanation: 'Richtig. "Am Abend möchte ich gern Pizza essen" гэсэн.',
      },
    ],
  },
  {
    teil: 2,
    title: '2-р хэсэг — Тохирох зарыг сонгох',
    instruction: 'Нөхцөл байдал бүрт тохирох зарыг (a эсвэл b) сонгоно уу.',
    questions: [
      {
        prompt:
          'Sie möchten am Wochenende schwimmen gehen. Wo finden Sie Informationen?',
        mongolian: 'Та амралтын өдөр усанд сэлмээр байна. Мэдээллийг хаанаас олох вэ?',
        options: [
          'a) Schwimmbad „Aqua" — täglich von 8 bis 20 Uhr geöffnet. Auch am Wochenende!',
          'b) Sprachschule Berlin — Deutschkurse für Anfänger.',
        ],
        correctIndex: 0,
        explanation: 'Зөв нь a. "Schwimmbad" (усан сан) амралтын өдөр ч нээлттэй.',
      },
      {
        prompt: 'Sie suchen einen Deutschkurs für Anfänger.',
        mongolian: 'Та эхлэгчдэд зориулсан герман хэлний курс хайж байна.',
        options: [
          'a) Restaurant „Mongolia" — leckeres Essen jeden Tag.',
          'b) Sprachschule Berlin — Deutschkurse für Anfänger, Start: Montag.',
        ],
        correctIndex: 1,
        explanation: 'Зөв нь b. "Sprachschule ... Deutschkurse für Anfänger" нь хэлний курс.',
      },
      {
        prompt: 'Sie haben Zahnschmerzen und brauchen einen Termin.',
        mongolian: 'Таны шүд өвдөж байгаа тул цаг авах хэрэгтэй.',
        options: [
          'a) Zahnarztpraxis Dr. Weber — Termine von Montag bis Freitag.',
          'b) Bäckerei Müller — frisches Brot jeden Morgen.',
        ],
        correctIndex: 0,
        explanation: 'Зөв нь a. "Zahnarztpraxis" (шүдний эмнэлэг) цаг өгдөг.',
      },
    ],
  },
  {
    teil: 3,
    title: '3-р хэсэг — Зарлал ба тэмдэг',
    instruction: 'Олон нийтийн зарлал / тэмдгийг уншаад өгүүлбэр Richtig эсвэл Falsch эсэхийг тэмдэглэнэ үү.',
    questions: [
      {
        prompt:
          'An der Apotheke: „Heute geschlossen. Notdienst: Apotheke am Markt."\n\nFrage: Heute bekommen Sie hier Medikamente.',
        mongolian:
          'Эмийн сан дээр: «Өнөөдөр хаалттай. Жижүүр: Захын эмийн сан.»\n\nАсуулт: Өнөөдөр та эндээс эм авч чадна.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 1,
        explanation: 'Falsch. Энэ эмийн сан "geschlossen" (хаалттай) тул эм авах боломжгүй.',
      },
      {
        prompt:
          'In der Bibliothek: „Öffnungszeiten: Montag bis Freitag 9–18 Uhr. Samstag geschlossen."\n\nFrage: Am Samstag ist die Bibliothek geschlossen.',
        mongolian:
          'Номын санд: «Цагийн хуваарь: Даваа–Баасан 9–18 цаг. Бямба хаалттай.»\n\nАсуулт: Бямба гарагт номын сан хаалттай.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 0,
        explanation: 'Richtig. "Samstag geschlossen" — Бямба гарагт хаалттай гэсэн.',
      },
      {
        prompt:
          'Am Bahnhof: „Achtung! Der Zug nach München fährt heute von Gleis 5."\n\nFrage: Der Zug nach München fährt von Gleis 9.',
        mongolian:
          'Буудал дээр: «Анхаар! Мюнхен рүү явах галт тэрэг өнөөдөр 5-р замаас хөдөлнө.»\n\nАсуулт: Мюнхен рүү явах галт тэрэг 9-р замаас хөдөлнө.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 1,
        explanation: 'Falsch. Зарлалд "von Gleis 5" (5-р зам) гэсэн, 9-р зам биш.',
      },
    ],
  },
];

// =============================================================================
// 2) HÖREN — Сонсох (TTS-ээр бичлэгийг сонсоно)
// =============================================================================
export const A1_LISTENING: ListeningPart[] = [
  {
    teil: 1,
    title: '1-р хэсэг — Богино яриа',
    instruction: '«Сонсох» товчийг дараад бичлэгийг сонсоод зөв хариултыг (a/b/c) сонгоно уу. (2 удаа сонсож болно)',
    audioLabel: 'Яриа 1',
    audioText: 'Entschuldigung, wie spät ist es? — Es ist halb neun.',
    questions: [
      {
        prompt: 'Wie spät ist es?',
        mongolian: 'Цаг хэд болж байна?',
        options: ['a) 8:30 Uhr', 'b) 9:30 Uhr', 'c) 7:00 Uhr'],
        correctIndex: 0,
        explanation: '"halb neun" гэдэг нь 8:30 (есийн хагас дутуу = 8 цаг 30 мин).',
      },
    ],
  },
  {
    teil: 1,
    title: '1-р хэсэг — Утасны мессеж',
    instruction: 'Бичлэгийг сонсоод зөв хариултыг сонгоно уу.',
    audioLabel: 'Яриа 2',
    audioText: 'Hallo, hier ist Tom. Wir treffen uns morgen um achtzehn Uhr vor dem Kino.',
    questions: [
      {
        prompt: 'Wann treffen sie sich?',
        mongolian: 'Тэд хэдэн цагт уулзах вэ?',
        options: ['a) um 8 Uhr', 'b) um 18 Uhr', 'c) um 16 Uhr'],
        correctIndex: 1,
        explanation: '"um achtzehn Uhr" = 18 цагт.',
      },
    ],
  },
  {
    teil: 2,
    title: '2-р хэсэг — Зарлал',
    instruction: 'Зарлалыг сонсоод өгүүлбэр Richtig эсвэл Falsch эсэхийг тэмдэглэнэ үү.',
    audioLabel: 'Буудлын зарлал',
    audioText:
      'Information für die Reisenden nach Frankfurt: Der Zug hat heute zehn Minuten Verspätung.',
    questions: [
      {
        prompt: 'Der Zug nach Frankfurt ist pünktlich.',
        mongolian: 'Франкфурт руу явах галт тэрэг цагтаа явна.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 1,
        explanation: 'Falsch. Галт тэрэг "zehn Minuten Verspätung" (10 мин хоцролттой) гэсэн.',
      },
    ],
  },
  {
    teil: 2,
    title: '2-р хэсэг — Дэлгүүрийн зарлал',
    instruction: 'Зарлалыг сонсоод Richtig эсвэл Falsch эсэхийг тэмдэглэнэ үү.',
    audioLabel: 'Дэлгүүрийн зарлал',
    audioText: 'Liebe Kunden, unser Supermarkt schließt heute um zwanzig Uhr. Vielen Dank für Ihren Einkauf.',
    questions: [
      {
        prompt: 'Der Supermarkt schließt um 20 Uhr.',
        mongolian: 'Дэлгүүр 20 цагт хаагдана.',
        options: ['Richtig', 'Falsch'],
        correctIndex: 0,
        explanation: 'Richtig. "schließt heute um zwanzig Uhr" = 20 цагт хаагдана.',
      },
    ],
  },
  {
    teil: 3,
    title: '3-р хэсэг — Яриа',
    instruction: 'Богино яриаг сонсоод зөв хариултыг (a/b/c) сонгоно уу.',
    audioLabel: 'Замын чиглэл',
    audioText:
      'Entschuldigung, wo ist die Post? — Gehen Sie geradeaus und dann links. Die Post ist neben der Bank.',
    questions: [
      {
        prompt: 'Wo ist die Post?',
        mongolian: 'Шуудан хаана байна вэ?',
        options: ['a) neben der Bank', 'b) neben dem Supermarkt', 'c) neben der Schule'],
        correctIndex: 0,
        explanation: '"Die Post ist neben der Bank" — Банкны хажууд.',
      },
    ],
  },
  {
    teil: 3,
    title: '3-р хэсэг — Кафе дээр',
    instruction: 'Яриаг сонсоод зөв хариултыг сонгоно уу.',
    audioLabel: 'Кафе дээрх яриа',
    audioText: 'Was möchten Sie trinken? — Einen Kaffee, bitte. Und ein Glas Wasser.',
    questions: [
      {
        prompt: 'Was möchte der Gast trinken?',
        mongolian: 'Зочин юу уумаар байна вэ?',
        options: ['a) Tee und Wasser', 'b) Kaffee und Wasser', 'c) nur Kaffee'],
        correctIndex: 1,
        explanation: '"Einen Kaffee ... und ein Glas Wasser" — Кофе ба ус.',
      },
    ],
  },
];

// =============================================================================
// 3) SCHREIBEN — Бичих
// =============================================================================
export const A1_WRITING_FORM: WritingForm = {
  teil: 1,
  title: '1-р хэсэг — Маягт бөглөх',
  instruction: 'Доорх танилцуулгыг уншаад бүртгэлийн маягтыг зөв бөглөнө үү.',
  scenario:
    'Das ist Herr Ahmed Hassan. Er kommt aus Ägypten und ist 29 Jahre alt. Er wohnt jetzt in der Goethestraße 12 in Köln. Er ist Ingenieur.',
  scenarioMongolian:
    'Энэ бол ноён Ахмед Хассан. Тэр Египетээс ирсэн бөгөөд 29 настай. Тэр одоо Кёльн хотын Гётештрассе 12-т амьдардаг. Тэр инженер.',
  formTitle: 'Anmeldung — Sprachschule',
  fields: [
    {
      label: 'Familienname:',
      mongolian: 'Овог',
      expected: ['Hassan'],
      placeholder: 'жишээ: Müller',
    },
    {
      label: 'Vorname:',
      mongolian: 'Нэр',
      expected: ['Ahmed'],
      placeholder: 'жишээ: Anna',
    },
    {
      label: 'Land:',
      mongolian: 'Улс (хаанаас ирсэн)',
      expected: ['Ägypten', 'Agypten'],
      placeholder: 'жишээ: Mongolei',
    },
    {
      label: 'Alter:',
      mongolian: 'Нас',
      expected: ['29', '29 Jahre'],
      placeholder: 'жишээ: 25',
    },
    {
      label: 'Wohnort:',
      mongolian: 'Амьдардаг хот',
      expected: ['Köln', 'Koln'],
      placeholder: 'жишээ: Berlin',
    },
    {
      label: 'Beruf:',
      mongolian: 'Мэргэжил',
      expected: ['Ingenieur'],
      placeholder: 'жишээ: Student',
    },
  ],
};

export const A1_WRITING_LETTER: WritingLetter = {
  teil: 2,
  title: '2-р хэсэг — Богино захидал бичих',
  instruction: 'Доорх нөхцлийн дагуу ойролцоогоор 30 үгтэй богино и-мэйл бичнэ үү. Гурван санааг бүгдийг нь хамруулна уу.',
  scenarioMongolian:
    'Таны найз Markus төрсөн өдрийн үдэшлэгтээ урьсан. Гэвч та очиж чадахгүй нь. Markus-д и-мэйл бичээрэй.',
  bulletPoints: [
    'Урьсанд нь талархлаа илэрхийл (sich bedanken).',
    'Яагаад очиж чадахгүй байгаагаа бич (Grund / шалтгаан).',
    'Өөр нэг өдөр уулзахыг санал болго (Vorschlag).',
  ],
  modelAnswer:
    'Lieber Markus,\n\nvielen Dank für die Einladung zu deiner Party. Leider kann ich am Samstag nicht kommen, denn ich muss arbeiten. Können wir uns nächste Woche treffen?\n\nViele Grüße,\nBat',
  modelAnswerMongolian:
    'Хайрт Маркус,\n\nҮдэшлэгтээ урьсанд маш их баярлалаа. Харамсалтай нь би Бямба гарагт ажиллах ёстой тул очиж чадахгүй нь. Бид дараа долоо хоногт уулзаж болох уу?\n\nГүн хүндэтгэсэн,\nБат',
  checklist: [
    'Мэндчилгээ ба нэрээр хандсан (Lieber Markus, …)',
    'Урьсанд талархсан (vielen Dank …)',
    'Очиж чадахгүй шалтгаанаа бичсэн (Leider … denn …)',
    'Өөр өдөр санал болгосон (Können wir …?)',
    'Төгсгөлийн мэндчилгээ ба нэрээ бичсэн (Viele Grüße, …)',
  ],
};

// =============================================================================
// 4) SPRECHEN — Ярих (микрофоноор хариулаад загвартай харьцуулна)
// =============================================================================
export const A1_SPEAKING: SpeakingTask[] = [
  {
    teil: 1,
    title: '1-р хэсэг — Өөрийгөө танилцуулах',
    instruction: 'Микрофоныг дараад өөрийгөө герман хэлээр танилцуулна уу. Доорх түлхүүр үгсийг бүгдийг нь дурдахыг хичээ.',
    card: 'Name? · Alter? · Land? · Wohnort? · Sprachen? · Beruf? · Hobby?',
    cardMongolian: 'Нэр · Нас · Улс · Амьдардаг хот · Хэл · Мэргэжил · Хобби',
    modelAnswer:
      'Ich heiße Bat. Ich bin 25 Jahre alt. Ich komme aus der Mongolei und wohne in Ulaanbaatar. Ich spreche Mongolisch, Englisch und ein bisschen Deutsch. Ich bin Student. Mein Hobby ist Fußball.',
    modelAnswerMongolian:
      'Намайг Бат гэдэг. Би 25 настай. Би Монголоос ирсэн бөгөөд Улаанбаатарт амьдардаг. Би монгол, англи, бага зэрэг герман хэлээр ярьдаг. Би оюутан. Миний хобби бол хөлбөмбөг.',
    checklist: [
      'Нэрээ хэлсэн (Ich heiße …)',
      'Насаа хэлсэн (Ich bin … Jahre alt)',
      'Улс / хотоо хэлсэн (Ich komme aus … / wohne in …)',
      'Хэлээ хэлсэн (Ich spreche …)',
      'Мэргэжил эсвэл хоббиа хэлсэн (Ich bin … / Mein Hobby ist …)',
    ],
  },
  {
    teil: 2,
    title: '2-р хэсэг — Мэдээлэл асуух / өгөх',
    instruction: 'Картын сэдвээр асуулт үүсгээд хариул. Микрофоныг дараад герман хэлээр ярина уу.',
    card: 'Thema: „Essen" — Wort: „Frühstück"',
    cardMongolian: 'Сэдэв: «Хоол» — Үг: «Өглөөний цай»',
    modelAnswer: 'Was isst du zum Frühstück? — Zum Frühstück esse ich Brot mit Käse und trinke Kaffee.',
    modelAnswerMongolian:
      'Чи өглөө юу иддэг вэ? — Өглөө би бяслагтай талх иддэг, кофе уудаг.',
    checklist: [
      'Сэдвээр асуулт зөв үүсгэсэн (Was … ?)',
      '"Frühstück" гэдэг үгийг ашигласан',
      'Бүтэн өгүүлбэрээр хариулсан',
      'Үйл үгийг зөв байрлуулсан (хоёр дахь байр)',
    ],
  },
  {
    teil: 3,
    title: '3-р хэсэг — Хүсэлт гаргах / хариулах',
    instruction: 'Зураг дээрх зүйлээр эелдэг хүсэлт үүсгэ, дараа нь хариул. Микрофоноор герман хэлээр ярина уу.',
    card: 'Bild: „Fenster" (цонх)',
    cardMongolian: 'Зураг: «Цонх» — эелдэг хүсэлт гарга',
    modelAnswer: 'Kannst du bitte das Fenster öffnen? — Ja, gern. / Natürlich.',
    modelAnswerMongolian: 'Чи цонхыг онгойлгож өгөөч? — Тэгье, баяртайгаар. / Мэдээж.',
    checklist: [
      'Эелдэг хүсэлт гаргасан (Kannst du bitte … ? / Können Sie …?)',
      '"Fenster" гэдэг үгийг ашигласан',
      'Хүсэлтэд хариулсан (Ja, gern / Natürlich)',
    ],
  },
];

// Модулийн ерөнхий мэдээлэл (танилцуулга дэлгэцэд харуулна)
export const A1_MODULE_INFO = [
  { key: 'lesen', de: 'Lesen', mn: 'Унших', items: 9, minutes: 25 },
  { key: 'hoeren', de: 'Hören', mn: 'Сонсох', items: 6, minutes: 20 },
  { key: 'schreiben', de: 'Schreiben', mn: 'Бичих', items: 2, minutes: 20 },
  { key: 'sprechen', de: 'Sprechen', mn: 'Ярих', items: 3, minutes: 15 },
] as const;
