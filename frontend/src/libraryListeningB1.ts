// =============================================================================
// Vivid-Lingua — B1 түвшний сонсох дасгалын өргөтгөл (Сонсох)
// -----------------------------------------------------------------------------
// Library-гийн сонсох (Listening) сангийн нэмэлт багц: B1 түвшний 12 шинэ
// дасгал (зарлал, хариулагч машины мессеж, ярилцлага, радио нэвтрүүлэг,
// подкаст гэх мэт олон төрлийн формат). Id-нууд 601-612 тул library.ts болон
// libraryExtra.ts-ийн одоо байгаа id-тай хэзээ ч мөргөлдөхгүй.
// =============================================================================

import type { ListeningItem } from './library';

export const LISTENING_EXPANSION_B1: ListeningItem[] = [
  {
    id: 601, level: 'B1', topic: 'Хэлний хамтрагч',
    title: 'Gespräch: Sprachtandem finden', titleMn: 'Ярилцлага: Хэлний хамтрагч хайх',
    audioText: 'Hallo, ich habe deine Anzeige gesehen. Du suchst einen Tandempartner für Deutsch und Mongolisch, oder? — Genau, ich lerne seit einem Jahr Mongolisch, aber ich brauche mehr Übung im Sprechen. — Dann treffen wir uns einmal pro Woche: eine halbe Stunde Deutsch, eine halbe Stunde Mongolisch. — Gut, treffen wir uns im Café am Marktplatz, weil es dort ruhig ist.',
    transcriptMn: 'Сайн байна уу, би чиний зарыг харсан. Чи герман, монгол хэлний хамтрагч хайж байна уу? — Тийм ээ, би нэг жилийн турш монгол хэл сурч байгаа ч илүү ярианы дадлага хэрэгтэй байна. — Тэгвэл бид долоо хоногт нэг удаа уулзъя: хагас цаг герман хэлээр, хагас цаг монгол хэлээр. — За, зах талбай дахь кафед уулзъя, учир нь тэнд нам гүм.',
    question: 'Хоёр дахь хүн ямар хэл сурч байна вэ?',
    choices: ['Монгол хэл', 'Герман хэл', 'Орос хэл'], correctIndex: 0,
    questions: [
      {
        question: 'Хоёр дахь хүн ямар хэл сурч байна вэ?',
        choices: ['Монгол хэл', 'Герман хэл', 'Орос хэл'], correctIndex: 0,
        hint: '"ich lerne seit einem Jahr …" гэсэн хэсгийг сонс.',
        explanation: '"ich lerne seit einem Jahr Mongolisch" — тэр нэг жилийн турш монгол хэл сурсан гэж хэлсэн.',
      },
      {
        question: 'Тэд хэдийд уулзахаар тохирсон бэ?',
        choices: ['Өдөрт нэг удаа', 'Долоо хоногт нэг удаа', 'Сард нэг удаа'], correctIndex: 1,
        hint: '"treffen wir uns einmal pro …" гэснийг сонс.',
        explanation: '"treffen wir uns einmal pro Woche" — долоо хоногт нэг удаа уулзахаар тохирсон.',
      },
    ],
  },
  {
    id: 602, level: 'B1', topic: 'Музей',
    title: 'Ansage: Museumsführung', titleMn: 'Зарлал: Музейн тайлбарлагчтай аялал',
    audioText: 'Herzlich willkommen im Stadtmuseum! Die nächste Führung beginnt in zehn Minuten am Haupteingang und dauert etwa neunzig Minuten. Wer die Führung auf Englisch hören möchte, kann sich am Empfang einen Kopfhörer ausleihen. Bitte denken Sie daran, dass Fotografieren im zweiten Stock aus Denkmalschutzgründen nicht erlaubt ist.',
    transcriptMn: 'Хотын музейд тавтай морилно уу! Дараагийн тайлбарлагчтай аялал 10 минутын дараа гол хаалганаас эхэлж, ойролцоогоор 90 минут үргэлжилнэ. Англи хэл дээр тайлбар сонсохыг хүсвэл хүлээн авах хэсгээс чихэвч авч болно. Дурсгалт зүйлсийг хамгаалах шаардлагаар хоёрдугаар давхарт зураг авахыг хориглодог болохыг анхаарна уу.',
    question: 'Тайлбарлагчтай аялал хэдэн минутын дараа эхлэх вэ?',
    choices: ['5 минут', '10 минут', '30 минут'], correctIndex: 1,
    questions: [
      {
        question: 'Тайлбарлагчтай аялал хэдэн минутын дараа эхлэх вэ?',
        choices: ['5 минут', '10 минут', '30 минут'], correctIndex: 1,
        hint: '"Die nächste Führung beginnt in …" гэсэн хэсгийг сонс.',
        explanation: '"beginnt in zehn Minuten" — тайлбарлагчтай аялал 10 минутын дараа эхэлнэ.',
      },
      {
        question: 'Хаана зураг авахыг хориглодог вэ?',
        choices: ['Гол хаалганд', 'Хүлээн авах хэсэгт', 'Хоёрдугаар давхарт'], correctIndex: 2,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"im zweiten Stock … nicht erlaubt" — хоёрдугаар давхарт зураг авахыг хориглосон.',
      },
    ],
  },
  {
    id: 603, level: 'B1', topic: 'Цагийн ажил',
    title: 'Gespräch über einen Nebenjob', titleMn: 'Цагийн ажлын тухай ярилцлага',
    audioText: 'Sag mal, arbeitest du noch im Café? — Nein, ich habe letzten Monat gekündigt, weil die Schichten sich ständig mit meinen Vorlesungen überschnitten haben. — Und was machst du jetzt? — Ich helfe abends in der Bibliothek beim Sortieren der Bücher. Das ist ruhiger, und ich verdiene sogar ein bisschen mehr als vorher. — Klingt, als hättest du die richtige Entscheidung getroffen.',
    transcriptMn: 'Хэлээч, чи одоо ч кафед ажилладаг уу? — Үгүй, би өнгөрсөн сард ажлаасаа гарсан, учир нь ээлж маань лекцтэй байнга давхцдаг байсан. — Тэгээд одоо юу хийж байна вэ? — Би оройдоо номын санд ном эрэмбэлэхэд тусалж байна. Энэ нь илүү тайван бөгөөд урьдынхаас арай илүү орлого олдог. — Тэгвэл зөв шийдвэр гаргасан юм шиг сонсогдож байна.',
    question: 'Тэр яагаад кафеийн ажлаасаа гарсан бэ?',
    choices: ['Цалин бага байсан', 'Ажил хэцүү байсан', 'Ээлж лекцтэй давхцдаг байсан'], correctIndex: 2,
    questions: [
      {
        question: 'Тэр яагаад кафеийн ажлаасаа гарсан бэ?',
        choices: ['Цалин бага байсан', 'Ажил хэцүү байсан', 'Ээлж лекцтэй давхцдаг байсан'], correctIndex: 2,
        hint: '"weil die Schichten sich … überschnitten haben" гэсэн хэсгийг сонс.',
        explanation: '"die Schichten sich ständig mit meinen Vorlesungen überschnitten haben" — ээлж нь лекцтэй байнга давхцдаг байсан.',
      },
      {
        question: 'Тэр одоо хаана ажилладаг вэ?',
        choices: ['Номын санд', 'Кафед', 'Дэлгүүрт'], correctIndex: 0,
        hint: '"Ich helfe abends in der …" гэснийг сонс.',
        explanation: '"Ich helfe abends in der Bibliothek" — тэр оройдоо номын санд тусалдаг.',
      },
    ],
  },
  {
    id: 604, level: 'B1', topic: 'Нүүх',
    title: 'Podcast: Umzug in eine neue Stadt', titleMn: 'Подкаст: Шинэ хот руу нүүх',
    audioText: 'Vor drei Monaten bin ich von München nach Leipzig gezogen, weil ich dort eine neue Stelle gefunden habe. Am Anfang war es schwierig, weil ich niemanden kannte und mich in der Stadt nicht auskannte. Inzwischen habe ich über einen Sportverein neue Freunde gefunden, und die Mieten sind hier außerdem viel günstiger als in München.',
    transcriptMn: 'Гурван сарын өмнө би Мюнхенээс Лейпциг рүү нүүсэн, учир нь тэнд шинэ ажлын байр олсон юм. Эхэндээ хэцүү байсан, учир нь хэнийг ч мэддэггүй, хот дотроо ч сайн орж гарч мэддэггүй байсан. Одоо болохоор спорт клубоор дамжуулан шинэ найзууд олсон бөгөөд, гэр түрээс ч Мюнхенийхээс хамаагүй хямд байна.',
    question: 'Тэр яагаад Лейпциг рүү нүүсэн бэ?',
    choices: ['Шинэ ажлын байр олсон учир', 'Гэр бүлийнхээ дэргэд байхаар', 'Их сургуульд орохоор'], correctIndex: 0,
    questions: [
      {
        question: 'Тэр яагаад Лейпциг рүү нүүсэн бэ?',
        choices: ['Шинэ ажлын байр олсон учир', 'Гэр бүлийнхээ дэргэд байхаар', 'Их сургуульд орохоор'], correctIndex: 0,
        hint: '"weil ich dort eine neue Stelle …" гэснийг сонс.',
        explanation: '"weil ich dort eine neue Stelle gefunden habe" — шинэ ажлын байр олсон тул нүүсэн.',
      },
      {
        question: 'Тэр яаж шинэ найз нөхөдтэй болсон бэ?',
        choices: ['Ажлын хамт олноороо дамжуулан', 'Спорт клубоор дамжуулан', 'Хөршүүдээрээ дамжуулан'], correctIndex: 1,
        hint: '"über einen Sportverein …" гэсэн хэсгийг сонс.',
        explanation: '"über einen Sportverein neue Freunde gefunden" — спорт клубоор дамжуулан шинэ найз олсон.',
      },
    ],
  },
  {
    id: 605, level: 'B1', topic: 'Хотын тээвэр',
    title: 'Radiobeitrag: Fahrrad fahren in der Stadt', titleMn: 'Радио нэвтрүүлэг: Хотод дугуйгаар зорчих',
    audioText: 'Immer mehr Menschen fahren in der Stadt mit dem Fahrrad zur Arbeit, statt das Auto zu benutzen. Eine Umfrage zeigt, dass viele dadurch Zeit sparen, obwohl es an manchen Straßen noch zu wenige Radwege gibt. Die Stadtverwaltung plant deshalb, bis nächstes Jahr fünfzig Kilometer neue Radwege zu bauen, damit das Radfahren sicherer wird.',
    transcriptMn: 'Улам олон хүн машины оронд дугуйгаар ажилдаа явж байна. Судалгаагаар үзэхэд олон хүн ингэснээр цаг хэмнэдэг ч зарим гудамжинд дугуйн зам хараахан хангалттай биш байна. Тиймээс хотын захиргаа дугуйгаар явахыг илүү аюулгүй болгохын тулд ирэх жил хүртэл 50 километр шинэ дугуйн зам барихаар төлөвлөж байна.',
    question: 'Судалгаагаар дугуйгаар явдаг хүмүүс юу хэмнэдэг вэ?',
    choices: ['Мөнгө', 'Цаг', 'Эрч хүч'], correctIndex: 1,
    questions: [
      {
        question: 'Судалгаагаар дугуйгаар явдаг хүмүүс юу хэмнэдэг вэ?',
        choices: ['Мөнгө', 'Цаг', 'Эрч хүч'], correctIndex: 1,
        hint: '"viele dadurch … sparen" гэснийг сонс.',
        explanation: '"viele dadurch Zeit sparen" — олон хүн ингэснээр цаг хэмнэдэг.',
      },
      {
        question: 'Хотын захиргаа ирэх жил юу хийхээр төлөвлөж байна вэ?',
        choices: ['Автобусны шинэ чиглэл нэвтрүүлэх', 'Машины зогсоол нэмэх', '50 км шинэ дугуйн зам барих'], correctIndex: 2,
        hint: '"plant deshalb, bis nächstes Jahr …" гэснийг сонс.',
        explanation: '"plant … fünfzig Kilometer neue Radwege zu bauen" — 50 км шинэ дугуйн зам барихаар төлөвлөж байна.',
      },
    ],
  },
  {
    id: 606, level: 'B1', topic: 'Номын сан',
    title: 'Durchsage: Stadtbibliothek', titleMn: 'Зарлал: Хотын номын сан',
    audioText: 'Liebe Besucherinnen und Besucher, die Stadtbibliothek schließt heute wegen einer Veranstaltung bereits um achtzehn Uhr statt um zwanzig Uhr. Bitte geben Sie Ihre Bücher bis dahin an der Ausleihe zurück oder nutzen Sie den Rückgabekasten am Eingang. Ab morgen gelten wieder die normalen Öffnungszeiten von neun bis zwanzig Uhr.',
    transcriptMn: 'Эрхэм зочид оо, хотын номын сан өнөөдөр нэгэн арга хэмжээний улмаас ердийн 20 цагийн оронд 18 цагт хаагдана. Иймд номоо тэр цаг хүртэл захиалгын хэсэгт буцаах эсвэл орох хаалган дахь буцаах хайрцгийг ашиглана уу. Маргаашаас эхлэн ердийн ажиллах цаг буюу 9-20 цаг хүртэл дахин мөрдөгдөнө.',
    question: 'Номын сан өнөөдөр хэдэн цагт хаагдах вэ?',
    choices: ['16 цагт', '20 цагт', '18 цагт'], correctIndex: 2,
    questions: [
      {
        question: 'Номын сан өнөөдөр хэдэн цагт хаагдах вэ?',
        choices: ['16 цагт', '20 цагт', '18 цагт'], correctIndex: 2,
        hint: '"schließt heute … bereits um …" гэснийг сонс.',
        explanation: '"schließt heute … bereits um achtzehn Uhr" — өнөөдөр 18 цагт хаагдана.',
      },
      {
        question: 'Номын сан яагаад эрт хаагдах вэ?',
        choices: ['Нэгэн арга хэмжээний улмаас', 'Засварын ажилтай учир', 'Ажилчид дутагдалтай учир'], correctIndex: 0,
        hint: '"wegen einer Veranstaltung" гэсэн хэсгийг сонс.',
        explanation: '"wegen einer Veranstaltung" — нэгэн арга хэмжээний улмаас эрт хаагдана.',
      },
    ],
  },
  {
    id: 607, level: 'B1', topic: 'Хоолны курс',
    title: 'Anrufbeantworter: Kochkurs-Anmeldung', titleMn: 'Хариулагч машин: Хоолны курсын бүртгэл',
    audioText: "Guten Tag, hier ist die Kochschule am Marktplatz. Vielen Dank für Ihre Anmeldung zum Kurs 'Italienisch kochen', der am Samstag um zehn Uhr beginnt. Bitte bringen Sie eine Schürze mit, denn die Zutaten stellen wir bereits. Falls Sie noch Fragen haben, rufen Sie uns bitte bis Freitagnachmittag zurück.",
    transcriptMn: "Сайн байна уу, энэ бол зах талбай дахь хоолны сургууль байна. 'Итали хоол хийх' курст бүртгүүлсэнд баярлалаа, уг курс Бямба гарагт 10 цагт эхэлнэ. Хормогч авчрахыг хүсье, учир нь орц бүрдлийг бид өөрсдөө бэлдэнэ. Хэрэв асуулт байвал Баасан гарагийн үдээс хойш хүртэл бидэнд эргэж утасдана уу.",
    question: 'Курс хэзээ эхлэх вэ?',
    choices: ['Бямба гарагт', 'Баасан гарагт', 'Ням гарагт'], correctIndex: 0,
    questions: [
      {
        question: 'Курс хэзээ эхлэх вэ?',
        choices: ['Бямба гарагт', 'Баасан гарагт', 'Ням гарагт'], correctIndex: 0,
        hint: '"der am Samstag um zehn Uhr beginnt" гэснийг сонс.',
        explanation: '"der am Samstag um zehn Uhr beginnt" — Бямба гарагт 10 цагт эхэлнэ.',
      },
      {
        question: 'Оролцогчид юу авчрах ёстой вэ?',
        choices: ['Орц бүрдэл', 'Хормогч', 'Хоолны сав'], correctIndex: 1,
        hint: '"Bitte bringen Sie … mit" гэснийг сонс.',
        explanation: '"bringen Sie eine Schürze mit" — хормогч авчрах ёстой, орцыг сургууль өөрөө бэлддэг.',
      },
    ],
  },
  {
    id: 608, level: 'B1', topic: 'Хөршийн баяр',
    title: 'Dialog: Nachbarschaftsfest', titleMn: 'Ярилцлага: Хөршийн баяр',
    audioText: 'Hast du schon gehört, dass wir nächsten Samstag ein Nachbarschaftsfest im Hof organisieren? — Nein, davon wusste ich nichts! Was soll ich denn mitbringen? — Jeder bringt etwas zu essen mit, zum Beispiel einen Salat oder einen Kuchen. Getränke stellt der Hausverein zur Verfügung. — Perfekt, dann backe ich einen Apfelkuchen, weil der immer gut ankommt.',
    transcriptMn: 'Чи ирэх Бямба гарагт хашаанд хөршийн баяр зохион байгуулна гэдгийг сонссон уу? — Үгүй, би энэ тухай мэдээгүй байлаа! Тэгвэл би юу авчрах вэ? — Хүн бүр хоол авчирна, жишээ нь салат эсвэл бялуу. Уух зүйлийг байрны холбоо хангана. — Гайхалтай, тэгвэл би алимны бялуу жигнэнэ, учир нь энэ нь үргэлж таалагддаг.',
    question: 'Ундаа зөв хэн хангах вэ?',
    choices: ['Хүн бүр өөрөө', 'Байрны холбоо', 'Дэлгүүрээс худалдан авах'], correctIndex: 1,
    questions: [
      {
        question: 'Ундаа зөв хэн хангах вэ?',
        choices: ['Хүн бүр өөрөө', 'Байрны холбоо', 'Дэлгүүрээс худалдан авах'], correctIndex: 1,
        hint: '"Getränke stellt der …" гэснийг сонс.',
        explanation: '"Getränke stellt der Hausverein zur Verfügung" — уух зүйлийг байрны холбоо хангана.',
      },
      {
        question: 'Тэр юу бэлдэхээр шийдсэн бэ?',
        choices: ['Салат', 'Талх', 'Алимны бялуу'], correctIndex: 2,
        hint: '"dann backe ich einen …" гэснийг сонс.',
        explanation: '"backe ich einen Apfelkuchen" — тэр алимны бялуу жигнэхээр шийдсэн.',
      },
    ],
  },
  {
    id: 609, level: 'B1', topic: 'Онлайн захиалга',
    title: 'Hotline: Problem mit einer Online-Bestellung', titleMn: 'Лавлах утас: Онлайн захиалгын асуудал',
    audioText: 'Guten Tag, ich habe vor einer Woche Schuhe bestellt, aber das Paket ist bis heute nicht angekommen. — Das tut mir leid. Können Sie mir Ihre Bestellnummer nennen? — Ja, sie lautet 4521. — Ich sehe, das Paket wurde falsch adressiert und liegt noch im Lager. Wir schicken es heute Nachmittag neu los, und Sie bekommen es übermorgen kostenlos per Express.',
    transcriptMn: 'Сайн байна уу, би долоо хоногийн өмнө гутал захиалсан ч илгээмж өнөөдөр хүртэл ирээгүй байна. — Уучлаарай. Захиалгын дугаараа хэлж өгнө үү? — Тийм ээ, 4521 гэж байна. — Би харж байна, илгээмж буруу хаягаар бичигдэж агуулахад үлдсэн байна. Бид үүнийг өнөөдөр орой дахин илгээх бөгөөд та нөгөөдөр үнэ төлбөргүй экспрессээр авах болно.',
    question: 'Илгээмж яагаад хүрэлгүй байсан бэ?',
    choices: ['Дэлгэрэнгүй мэдээлэл дутуу байсан', 'Барааны нөөц дуусмагц байсан', 'Буруу хаягаар бичигдсэн байсан'], correctIndex: 2,
    questions: [
      {
        question: 'Илгээмж яагаад хүрэлгүй байсан бэ?',
        choices: ['Дэлгэрэнгүй мэдээлэл дутуу байсан', 'Барааны нөөц дуусмагц байсан', 'Буруу хаягаар бичигдсэн байсан'], correctIndex: 2,
        hint: '"das Paket wurde falsch …" гэснийг сонс.',
        explanation: '"das Paket wurde falsch adressiert" — илгээмж буруу хаягаар бичигдсэн байсан.',
      },
      {
        question: 'Үйлчлүүлэгч илгээмжээ хэзээ авах вэ?',
        choices: ['Нөгөөдөр', 'Маргааш', 'Долоо хоногийн дараа'], correctIndex: 0,
        hint: '"Sie bekommen es …" гэснийг сонс.',
        explanation: '"Sie bekommen es übermorgen kostenlos per Express" — үйлчлүүлэгч нөгөөдөр үнэ төлбөргүй экспрессээр авна.',
      },
    ],
  },
  {
    id: 610, level: 'B1', topic: 'Спорт клуб',
    title: 'Interview: Sportverein', titleMn: 'Ярилцлага: Спорт клуб',
    audioText: 'Herr Neumann, Ihr Sportverein feiert dieses Jahr sein fünfzigjähriges Bestehen. Was macht den Verein so besonders? — Wir bieten Sport für alle Altersgruppen an, vom Kindertraining bis zur Seniorengruppe. Außerdem ist die Mitgliedschaft günstig, weil wir viele Freiwillige haben, die als Trainer arbeiten. — Und wie kann man Mitglied werden? — Man kommt einfach vorbei und trainiert zwei Wochen kostenlos zur Probe.',
    transcriptMn: 'Ноён Нойманн, таны спорт клуб энэ жил 50 жилийн ойгоо тэмдэглэж байна. Клубыг ийм онцгой болгодог зүйл юу вэ? — Бид хүүхдийн бэлтгэлээс эхлээд ахмадын бүлэг хүртэл бүх насны хүмүүст спорт санал болгодог. Мөн олон сайн дурынхан дасгалжуулагчаар ажилладаг тул гишүүнчлэл хямд байдаг. — Хэрхэн гишүүн болох вэ? — Зүгээр л ирээд хоёр долоо хоног үнэ төлбөргүй туршилтаар дасгалжина.',
    question: 'Гишүүнчлэл яагаад хямд байдаг вэ?',
    choices: ['Олон сайн дурынхан дасгалжуулагчаар ажилладаг учир', 'Улсаас санхүүжилт авдаг учир', 'Байр түрээслэдэггүй учир'], correctIndex: 0,
    questions: [
      {
        question: 'Гишүүнчлэл яагаад хямд байдаг вэ?',
        choices: ['Олон сайн дурынхан дасгалжуулагчаар ажилладаг учир', 'Улсаас санхүүжилт авдаг учир', 'Байр түрээслэдэггүй учир'], correctIndex: 0,
        hint: '"weil wir viele Freiwillige haben …" гэснийг сонс.',
        explanation: '"weil wir viele Freiwillige haben, die als Trainer arbeiten" — олон сайн дурынхан дасгалжуулагчаар ажилладаг тул гишүүнчлэл хямд.',
      },
      {
        question: 'Шинэ хүн хэрхэн клубыг туршиж болох вэ?',
        choices: ['Мөнгө төлж бүртгүүлэх', 'Хоёр долоо хоног үнэгүй туршилтаар дасгалжих', 'Зөвхөн онлайнаар бүртгүүлэх'], correctIndex: 1,
        hint: '"trainiert zwei Wochen kostenlos …" гэснийг сонс.',
        explanation: '"trainiert zwei Wochen kostenlos zur Probe" — хоёр долоо хоног үнэ төлбөргүй туршиж болно.',
      },
    ],
  },
  {
    id: 611, level: 'B1', topic: 'Дадлага',
    title: 'Gespräch: Praktikumsplatz', titleMn: 'Ярилцлага: Дадлагын байр',
    audioText: 'Ich suche noch ein Praktikum für den Sommer, aber ich weiß nicht, wo ich anfangen soll. — Hast du schon bei der Werbeagentur in der Innenstadt gefragt? Meine Schwester hat dort letztes Jahr ein Praktikum gemacht und war sehr zufrieden. — Nein, aber das klingt interessant. Weißt du, ob sie noch Plätze frei haben? — Keine Ahnung, aber du solltest einfach eine E-Mail mit deinem Lebenslauf schicken.',
    transcriptMn: 'Би зун дадлага хийх газар хайж байгаа ч хаанаас эхлэхээ мэдэхгүй байна. — Чи хотын төв дэх сурталчилгааны агентлагаас асуугаагүй юу? Миний эгч өнгөрсөн жил тэнд дадлага хийсэн бөгөөд маш сэтгэл хангалуун байсан. — Үгүй ээ, гэхдээ сонирхолтой сонсогдож байна. Чи тэнд одоо хоосон байр байгаа эсэхийг мэдэх үү? — Мэдэхгүй ээ, гэхдээ чи зүгээр л намтартайгаа имэйл илгээх хэрэгтэй.',
    question: 'Хэн сурталчилгааны агентлагт дадлага хийж байсан бэ?',
    choices: ['Найз', 'Эгч', 'Ах'], correctIndex: 1,
    questions: [
      {
        question: 'Хэн сурталчилгааны агентлагт дадлага хийж байсан бэ?',
        choices: ['Найз', 'Эгч', 'Ах'], correctIndex: 1,
        hint: '"Meine Schwester hat dort …" гэснийг сонс.',
        explanation: '"Meine Schwester hat dort letztes Jahr ein Praktikum gemacht" — түүний эгч тэнд дадлага хийсэн.',
      },
      {
        question: 'Хоёр дахь хүн юу хийхийг зөвлөж байна вэ?',
        choices: ['Утсаар холбогдох', 'Биечлэн очих', 'Намтартайгаа имэйл илгээх'], correctIndex: 2,
        hint: '"du solltest einfach eine E-Mail …" гэснийг сонс.',
        explanation: '"du solltest einfach eine E-Mail mit deinem Lebenslauf schicken" — намтартайгаа имэйл илгээхийг зөвлөж байна.',
      },
    ],
  },
  {
    id: 612, level: 'B1', topic: 'Хотын аялал',
    title: 'Ansage: Stadtführung', titleMn: 'Зарлал: Хотын аялал',
    audioText: 'Willkommen zur kostenlosen Stadtführung! Wir treffen uns immer samstags um elf Uhr vor dem Rathaus und gehen von dort zur alten Kirche und zum Marktplatz. Die Führung dauert ungefähr anderthalb Stunden und findet auf Deutsch statt, obwohl der Stadtführer auch einfache Fragen auf Englisch beantworten kann. Bei Regen wird die Führung leider abgesagt.',
    transcriptMn: 'Үнэ төлбөргүй хотын аялалд тавтай морилно уу! Бид Бямба гараг бүр 11 цагт хотын захиргааны байрны өмнө уулзаж, тэндээс эртний сүм болон зах талбай руу явна. Аялал ойролцоогоор нэг цаг хагас үргэлжлэх бөгөөд герман хэл дээр явагдана, гэхдээ хотын аялалыг удирдагч энгийн асуултад англи хэлээр ч хариулж чадна. Хур бороо орвол аялал харамсалтай нь цуцлагдана.',
    question: 'Аялал хаанаас эхлэх вэ?',
    choices: ['Номын сангийн өмнө', 'Зах талбайд', 'Хотын захиргааны байрны өмнө'], correctIndex: 2,
    questions: [
      {
        question: 'Аялал хаанаас эхлэх вэ?',
        choices: ['Номын сангийн өмнө', 'Зах талбайд', 'Хотын захиргааны байрны өмнө'], correctIndex: 2,
        hint: '"Wir treffen uns … vor dem …" гэснийг сонс.',
        explanation: '"Wir treffen uns … vor dem Rathaus" — хотын захиргааны байрны өмнө уулзана.',
      },
      {
        question: 'Хур бороо орвол юу болох вэ?',
        choices: ['Аялал цуцлагдана', 'Аялал үргэлжилнэ', 'Аялал хойшлогдоно'], correctIndex: 0,
        hint: '"Bei Regen wird die Führung …" гэснийг сонс.',
        explanation: '"Bei Regen wird die Führung leider abgesagt" — хур бороо орвол аялал цуцлагдана.',
      },
    ],
  },
];
