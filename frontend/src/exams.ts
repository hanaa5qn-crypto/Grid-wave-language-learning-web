// =============================================================================
// Vivid-Lingua — Түвшний шалгалтууд (CEFR A1 → C2)
// -----------------------------------------------------------------------------
// Шалгалтын таб нь түвшин тус бүрээр (A1, A2, B1, B2, C1, C2) ялгагдана.
// Түвшин бүр дөрвөн хэсэгтэй: Унших, Сонсох, Бичих, Ярих. Хэсэг бүрт 5+ тест.
// A1–B1 контентыг бэлэн номын сангаас (library.ts) шүүж авна; B2–C2-г энд
// тухайн түвшинд тохирсон илүү гүнзгий герман хэлээр шинээр зохиосон.
// =============================================================================

import {
  READING_LIBRARY, LISTENING_LIBRARY, WRITING_LIBRARY, SPEAKING_LIBRARY,
  ReadingItem, ListeningItem, WritingItem, SpeakingItem, Level,
} from './library';

export type ExamLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface LevelExam {
  level: ExamLevel;
  titleMn: string;        // Богино тайлбар (монгол)
  descriptionMn: string;  // Түвшний тодорхойлолт (монгол)
  color: string;          // Tailwind-friendly accent (badge)
  reading: ReadingItem[];
  listening: ListeningItem[];
  writing: WritingItem[];
  speaking: SpeakingItem[];
}

// Номын сангаас тухайн түвшний эхний n зүйлийг авах туслах.
const byLevel = <T extends { level: Level }>(arr: T[], lv: Level, n = 8): T[] =>
  arr.filter((x) => x.level === lv).slice(0, n);

// =============================================================================
// B2 — шинээр зохиосон контент (5 тест / хэсэг)
// =============================================================================
const B2_READING: ReadingItem[] = [
  { id: 201, level: 'B2', topic: 'Ажил ба амьдрал', title: 'Work-Life-Balance', titleMn: 'Ажил ба амьдралын тэнцвэр',
    text: 'Immer mehr Arbeitnehmer legen Wert auf eine gesunde Balance zwischen Beruf und Privatleben. Während früher vor allem das Gehalt zählte, achten viele heute auf flexible Arbeitszeiten und die Möglichkeit, im Homeoffice zu arbeiten. Studien zeigen, dass zufriedene Mitarbeiter produktiver sind. Trotzdem fällt es manchen schwer, nach Feierabend wirklich abzuschalten.',
    translation: 'Улам олон ажилтан ажил, хувийн амьдралын эрүүл тэнцвэрийг чухалчилдаг болсон. Урьд нь голчлон цалин чухал байсан бол өнөөдөр олон хүн уян хатан цаг, гэрээсээ ажиллах боломжийг анхаардаг. Сэтгэл хангалуун ажилтан илүү бүтээмжтэй гэдгийг судалгаа харуулдаг. Гэсэн ч зарим хүнд ажлын дараа жинхэнэ амрах хэцүү байдаг.',
    question: 'Энэ үед ажилтнууд юуг урьдынхаас илүү чухалчилдаг вэ?', choices: ['Зөвхөн өндөр цалин', 'Уян хатан цаг ба тэнцвэр', 'Албан тушаал ахих'], correctIndex: 1 },
  { id: 202, level: 'B2', topic: 'Хэвлэл мэдээлэл', title: 'Nachrichten im Internet', titleMn: 'Интернэт дэх мэдээ',
    text: 'Heutzutage informieren sich vor allem junge Menschen über soziale Netzwerke statt über klassische Zeitungen. Das hat Vorteile: Nachrichten verbreiten sich schnell und sind kostenlos. Allerdings ist es nicht immer leicht, seriöse Informationen von Falschmeldungen zu unterscheiden. Deshalb ist Medienkompetenz wichtiger denn je.',
    translation: 'Өнөө үед ялангуяа залуус сонин биш, нийгмийн сүлжээгээр мэдээлэл авдаг. Энэ нь давуу талтай: мэдээ хурдан тархаж, үнэгүй. Гэвч найдвартай мэдээллийг худал мэдээнээс ялгах нь үргэлж амар байдаггүй. Тиймээс медиа боловсрол урьд хэзээ хийгээгүйгээр чухал болсон.',
    question: 'Зохиогчийн санааг зовоож буй зүйл юу вэ?', choices: ['Мэдээ хэт удаан тархдаг', 'Найдвартай мэдээллийг худлаас ялгахад хэцүү', 'Сонин хэт үнэтэй'], correctIndex: 1 },
  { id: 203, level: 'B2', topic: 'Байгаль орчин', title: 'Nachhaltiger Konsum', titleMn: 'Тогтвортой хэрэглээ',
    text: 'Viele Verbraucher möchten umweltbewusster einkaufen, doch im Alltag ist das oft schwierig. Nachhaltige Produkte sind häufig teurer, und nicht jeder kann oder will mehr Geld ausgeben. Manche Kritiker argumentieren, dass nicht allein die Konsumenten, sondern vor allem die Unternehmen und die Politik in der Verantwortung stehen.',
    translation: 'Олон хэрэглэгч байгальд ээлтэйгээр худалдан авахыг хүсдэг ч өдөр тутамд энэ нь ихэвчлэн хэцүү. Тогтвортой бүтээгдэхүүн ихэвчлэн үнэтэй, хүн бүр илүү мөнгө гаргаж чадахгүй эсвэл хүсэхгүй. Зарим шүүмжлэгч зөвхөн хэрэглэгч биш, голчлон компани, төр хариуцлага хүлээх ёстой гэж үздэг.',
    question: 'Шүүмжлэгчид хэнийг голчлон хариуцлагатай гэж үздэг вэ?', choices: ['Зөвхөн хэрэглэгчдийг', 'Компани ба төрийг', 'Эрдэмтдийг'], correctIndex: 1 },
  { id: 204, level: 'B2', topic: 'Боловсрол', title: 'Lebenslanges Lernen', titleMn: 'Насан туршийн суралцал',
    text: 'In einer sich schnell verändernden Arbeitswelt reicht eine einmal abgeschlossene Ausbildung oft nicht mehr aus. Viele Berufstätige müssen sich ständig weiterbilden, um mit neuen Technologien Schritt zu halten. Weiterbildung wird daher nicht mehr als Ausnahme, sondern als Normalität betrachtet.',
    translation: 'Хурдан өөрчлөгдөж буй ажлын ертөнцөд нэг удаа төгссөн боловсрол ихэвчлэн хангалтгүй болдог. Олон ажилтан шинэ технологийн хурдыг гүйцэхийн тулд байнга мэргэжил дээшлүүлэх ёстой. Тиймээс давтан сургалтыг онцгой тохиолдол биш, харин хэвийн зүйл гэж үздэг болсон.',
    question: 'Текстийн гол санаа юу вэ?', choices: ['Нэг боловсрол хангалттай', 'Байнга мэргэжил дээшлүүлэх шаардлагатай болсон', 'Технологи чухал биш'], correctIndex: 1 },
  { id: 205, level: 'B2', topic: 'Хот төлөвлөлт', title: 'Leben in der Großstadt', titleMn: 'Том хотын амьдрал',
    text: 'Großstädte ziehen viele Menschen an, weil sie Arbeitsplätze, Kultur und gute Verkehrsanbindungen bieten. Gleichzeitig steigen die Mieten so stark, dass sich Normalverdiener das Zentrum kaum noch leisten können. Einige Städte versuchen, mit neuen Wohnprojekten gegenzusteuern, doch die Nachfrage bleibt hoch.',
    translation: 'Том хотууд ажлын байр, соёл, сайн тээврийн холболт санал болгодог тул олон хүнийг татдаг. Үүний зэрэгцээ түрээс хэт өсч, энгийн орлоготой хүн төв хэсэгт бараг амьдарч чадахгүй болсон. Зарим хот шинэ орон сууцны төслөөр эсэргүүцэхийг оролддог ч эрэлт өндөр хэвээр байна.',
    question: 'Том хотуудын нэг асуудал юу вэ?', choices: ['Ажлын байр дутмаг', 'Хэт өндөр түрээс', 'Соёл байхгүй'], correctIndex: 1 },
];

const B2_LISTENING: ListeningItem[] = [
  { id: 201, level: 'B2', topic: 'Радио ярилцлага', title: 'Interview: Ehrenamt', titleMn: 'Ярилцлага: сайн дурын ажил',
    audioText: 'In unserer Sendung sprechen wir heute über das Ehrenamt. Unsere Gästin engagiert sich seit zehn Jahren in einer Hilfsorganisation. Sie sagt, die Arbeit sei zwar anstrengend, gebe ihr aber das Gefühl, etwas Sinnvolles zu tun.',
    transcriptMn: 'Өнөөдрийн нэвтрүүлгээр бид сайн дурын ажлын тухай ярина. Зочин маань арван жил тусламжийн байгууллагад ажиллаж байна. Ажил ядаргаатай ч утга учиртай зүйл хийж буй мэдрэмж өгдөг гэж тэр хэлэв.',
    question: 'Зочин сайн дурын ажлаа яаж дүрсэлж байна вэ?', choices: ['Хялбар бөгөөд уйтгартай', 'Ядаргаатай ч утга учиртай', 'Цалинтай тул сайн'], correctIndex: 1 },
  { id: 202, level: 'B2', topic: 'Лекц', title: 'Vortrag: Schlaf', titleMn: 'Лекц: нойр',
    audioText: 'Guten Abend. In meinem Vortrag geht es um die Bedeutung des Schlafs. Viele unterschätzen, wie wichtig ausreichender Schlaf für die Gesundheit ist. Wer dauerhaft zu wenig schläft, riskiert nicht nur Konzentrationsprobleme, sondern auch ernsthafte Krankheiten.',
    transcriptMn: 'Оройн мэнд. Миний лекц нойрны ач холбогдлын тухай. Хангалттай нойр эрүүл мэндэд хэр чухал болохыг олон хүн дутуу үнэлдэг. Байнга бага унтдаг хүн анхаарал төвлөрөлтийн асуудал төдийгүй ноцтой өвчинд өртөх эрсдэлтэй.',
    question: 'Удаан хугацаанд бага унтах нь юунд хүргэж болох вэ?', choices: ['Зөвхөн ядрах', 'Ноцтой өвчин ба анхаарлын асуудал', 'Юу ч болохгүй'], correctIndex: 1 },
  { id: 203, level: 'B2', topic: 'Мэдээ', title: 'Verkehrsnachrichten', titleMn: 'Тээврийн мэдээ',
    audioText: 'Und nun die Verkehrslage. Aufgrund von Bauarbeiten kommt es auf der A3 zwischen Frankfurt und Würzburg zu erheblichen Verzögerungen. Autofahrer sollten nach Möglichkeit eine alternative Route wählen und mehr Zeit einplanen.',
    transcriptMn: 'Одоо замын байдал. Барилгын ажлаас болж А3 замд Франкфурт, Вюрцбургийн хооронд ихээхэн саатал гарч байна. Жолооч нар боломжтой бол өөр зам сонгож, илүү цаг төлөвлөх хэрэгтэй.',
    question: 'Жолооч нарт юу зөвлөж байна вэ?', choices: ['Хурдан жолоодохыг', 'Өөр зам сонгож, илүү цаг гаргахыг', 'Гэртээ үлдэхийг'], correctIndex: 1 },
  { id: 204, level: 'B2', topic: 'Ажлын байр', title: 'Im Bewerbungsgespräch', titleMn: 'Ажлын ярилцлагад',
    audioText: 'Sie haben einen beeindruckenden Lebenslauf. Können Sie mir erklären, warum Sie Ihre jetzige Stelle verlassen möchten und was Sie sich von einer neuen Position erhoffen? Uns interessiert besonders Ihre Motivation.',
    transcriptMn: 'Та гайхалтай намтартай юм байна. Та одоогийн ажлаа орхихыг хүсэж буй шалтгаан, шинэ албан тушаалаас юу хүлээж буйгаа тайлбарлаж чадах уу? Бид таны эрмэлзлийг онцгой сонирхож байна.',
    question: 'Ярилцлага авагч юуг онцгой сонирхож байна вэ?', choices: ['Нэр дэвшигчийн эрмэлзлийг', 'Цалингийн хэмжээг', 'Хувцаслалтыг'], correctIndex: 0 },
  { id: 205, level: 'B2', topic: 'Подкаст', title: 'Podcast: Reisen', titleMn: 'Подкаст: аялал',
    audioText: 'Heute reden wir über nachhaltiges Reisen. Immer mehr Menschen wollen die Welt entdecken, ohne der Umwelt zu schaden. Statt zu fliegen, nehmen einige lieber den Zug, auch wenn die Reise dadurch länger dauert.',
    transcriptMn: 'Өнөөдөр бид тогтвортой аяллын тухай ярина. Улам олон хүн байгальд хор хүргэхгүйгээр дэлхийг нээхийг хүсдэг. Зарим нь нисэхийн оронд аялал удаан болсон ч галт тэрэг сонгох дуртай.',
    question: 'Зарим хүн нисэхийн оронд юу сонгодог вэ?', choices: ['Машин', 'Галт тэрэг', 'Усан онгоц'], correctIndex: 1 },
];

const B2_WRITING: WritingItem[] = [
  { id: 201, level: 'B2', topic: 'Албан захидал', title: 'Beschwerde an einen Anbieter', titleMn: 'Үйлчилгээ үзүүлэгчид гомдол',
    prompt: 'Интернэт компанид холболт байнга тасардаг талаар албан ёсны гомдол бич.',
    points: ['Асуудлыг тодорхой тайлбарла', 'Өмнө нь юу хийснээ дурд', 'Тодорхой шийдэл/нөхөн төлбөр шаард'],
    modelAnswer: 'Sehr geehrte Damen und Herren, seit drei Wochen wird meine Internetverbindung mehrmals täglich unterbrochen. Trotz mehrerer Anrufe bei Ihrer Hotline wurde das Problem bisher nicht gelöst. Ich erwarte, dass Sie die Störung umgehend beheben und mir die Gebühren für diesen Zeitraum erstatten. Sollte sich nichts ändern, sehe ich mich gezwungen, den Vertrag zu kündigen. Mit freundlichen Grüßen, ...',
    modelMn: 'Эрхэм хүндэт ноёд хатагтай нар аа, гурван долоо хоногийн турш миний интернэт холболт өдөрт хэд хэдэн удаа тасардаг. Танай тусламжийн утсанд хэд хэдэн удаа залгасан ч асуудал хараахан шийдэгдээгүй. Та тасалдлыг яаралтай засаж, энэ хугацааны төлбөрийг буцааж өгөхийг хүлээж байна. Хэрэв юу ч өөрчлөгдөхгүй бол гэрээгээ цуцлахаас өөр аргагүй болно. Хүндэтгэсэн, ...' },
  { id: 202, level: 'B2', topic: 'Эссэ', title: 'Vor- und Nachteile: Homeoffice', titleMn: 'Гэрээс ажиллах: давуу, сул тал',
    prompt: 'Гэрээсээ ажиллахын давуу болон сул талыг тэнцвэртэйгээр хэлэлцэж, өөрийн байр суурийг илэрхийл.',
    points: ['Хоёр давуу тал', 'Хоёр сул тал', 'Өөрийн дүгнэлт'],
    modelAnswer: 'Das Arbeiten im Homeoffice hat in den letzten Jahren stark zugenommen. Einerseits spart man Zeit und Geld für den Arbeitsweg und kann den Tag flexibler gestalten. Andererseits fehlt vielen der direkte Kontakt zu Kollegen, und die Grenze zwischen Arbeit und Freizeit verschwimmt leicht. Meiner Meinung nach ist eine Mischung aus Büro und Homeoffice die beste Lösung, weil sie die Vorteile beider Welten verbindet.',
    modelMn: 'Гэрээс ажиллах нь сүүлийн жилүүдэд ихээхэн нэмэгдсэн. Нэг талаас ажилдаа очих цаг, мөнгөө хэмнэж, өдрөө илүү уян хатан төлөвлөж болно. Нөгөө талаас олон хүнд хамт олонтойгоо шууд харьцах нь дутагдаж, ажил, амралтын хил амархан бүдгэрдэг. Миний бодлоор оффис, гэрийн ажлын холимог нь хоёр ертөнцийн давуу талыг хослуулдаг тул хамгийн сайн шийдэл.' },
  { id: 203, level: 'B2', topic: 'Захидал', title: 'Leserbrief', titleMn: 'Уншигчийн захидал',
    prompt: 'Сонинд "Залуус хэт их цаг дэлгэцний өмнө өнгөрүүлдэг" гэсэн өгүүллийн талаар уншигчийн захидал бич.',
    points: ['Өгүүлэлд хариу үзүүлэх', 'Өөрийн байр суурь', 'Жишээ эсвэл санал'],
    modelAnswer: 'Sehr geehrte Redaktion, mit Interesse habe ich Ihren Artikel über die Bildschirmzeit junger Menschen gelesen. Ich stimme zu, dass viele Jugendliche zu lange am Handy sitzen. Allerdings sollte man nicht vergessen, dass digitale Medien auch dem Lernen und dem Kontakt mit Freunden dienen. Statt Verbote zu fordern, wäre es sinnvoller, Kindern einen bewussten Umgang mit Medien beizubringen. Mit freundlichen Grüßen, ...',
    modelMn: 'Эрхэм хүндэт редакц, залуусын дэлгэцний цагийн тухай таны өгүүллийг сонирхон уншлаа. Олон залуу утсандаа хэт удаан суудагтай би санал нийлж байна. Гэсэн ч дижитал хэрэгсэл сурах, найзуудтай харьцахад ч тустай гэдгийг мартаж болохгүй. Хориг тавихыг шаардахын оронд хүүхдүүдэд хэрэгслийг ухамсартай ашиглахыг заах нь илүү утга учиртай. Хүндэтгэсэн, ...' },
  { id: 204, level: 'B2', topic: 'Хүсэлт', title: 'Formelle Anfrage', titleMn: 'Албан хүсэлт',
    prompt: 'Их сургуульд курсын танигдах байдлын (recognition) талаар албан и-мэйл бич.',
    points: ['Нөхцөл байдлаа тайлбарла', 'Тодорхой асуулт тавь', 'Хариу хүлээж буйгаа илэрхийл'],
    modelAnswer: 'Sehr geehrte Damen und Herren, ich habe mein Studium im Ausland begonnen und möchte es nun an Ihrer Universität fortsetzen. Daher würde ich gern wissen, ob meine bisherigen Leistungen anerkannt werden und welche Unterlagen Sie dafür benötigen. Über eine baldige Rückmeldung würde ich mich sehr freuen. Mit freundlichen Grüßen, ...',
    modelMn: 'Эрхэм хүндэт ноёд хатагтай нар аа, би сургуулиа гадаадад эхлүүлсэн бөгөөд одоо танай их сургуульд үргэлжлүүлэхийг хүсэж байна. Тиймээс миний өмнөх кредит танигдах эсэх, үүнд ямар бичиг баримт хэрэгтэйг мэдмээр байна. Удахгүй хариу өгвөл их баяртай байх болно. Хүндэтгэсэн, ...' },
  { id: 205, level: 'B2', topic: 'Эссэ', title: 'Stellungnahme: Auto in der Stadt', titleMn: 'Байр суурь: хот доторх машин',
    prompt: '"Том хотуудад хувийн машиныг хязгаарлах ёстой" гэдэгт байр сууриа илэрхийл.',
    points: ['Танилцуулга', 'Хоёр аргумент', 'Дүгнэлт'],
    modelAnswer: 'In vielen Großstädten wird diskutiert, ob private Autos eingeschränkt werden sollten. Befürworter argumentieren, dass weniger Autos die Luft verbessern und den Verkehr reduzieren. Außerdem entstünde mehr Platz für Fußgänger und Radfahrer. Kritiker geben jedoch zu bedenken, dass nicht alle auf öffentliche Verkehrsmittel umsteigen können. Insgesamt halte ich eine Einschränkung für sinnvoll, sofern gleichzeitig der Nahverkehr ausgebaut wird.',
    modelMn: 'Олон том хотод хувийн машиныг хязгаарлах эсэх талаар маргаж байна. Дэмжигчид цөөн машин агаарыг сайжруулж, хөдөлгөөнийг багасгана гэж үздэг. Түүнчлэн явган зорчигч, дугуйчдад илүү зай гарна. Гэвч шүүмжлэгчид хүн бүр нийтийн тээвэрт шилжиж чадахгүй гэдгийг сануулдаг. Ерөнхийдөө нийтийн тээврийг зэрэг хөгжүүлбэл хязгаарлалт утга учиртай гэж би үзэж байна.' },
];

const B2_SPEAKING: SpeakingItem[] = [
  { id: 201, level: 'B2', topic: 'Хэлэлцүүлэг', title: 'Pro und Contra: soziale Medien', titleMn: 'Сошиал медиа: эерэг, сөрөг',
    prompt: 'Сошиал медиагийн давуу, сул талыг тэнцвэртэй хэлэлцэж, байр сууриа илэрхийл.',
    modelAnswer: 'Soziale Medien haben unser Leben stark verändert. Einerseits ermöglichen sie es, weltweit in Kontakt zu bleiben und sich schnell zu informieren. Andererseits führen sie oft zu Stress und einem ständigen Vergleich mit anderen. Ich bin der Meinung, dass es auf einen bewussten Umgang ankommt.',
    modelMn: 'Сошиал медиа бидний амьдралыг ихээхэн өөрчилсөн. Нэг талаас дэлхий даяар холбоотой байж, хурдан мэдээлэл авах боломжтой. Нөгөө талаас ихэвчлэн стресс, бусадтай байнга харьцуулахад хүргэдэг. Ухамсартай хандах нь чухал гэж би боддог.',
    tips: ['Einerseits … andererseits … (нэг талаас … нөгөө талаас …)', 'Ich bin der Meinung, dass … (… гэж боддог)', 'Es kommt auf … an (… -аас шалтгаална)'] },
  { id: 202, level: 'B2', topic: 'Санал болгох', title: 'Etwas aushandeln', titleMn: 'Тохиролцох',
    prompt: 'Найзтайгаа хамтран амралт төлөвлөж байна. Санал зөрвөл хэлэлцэж, шийдэлд хүр.',
    modelAnswer: 'Ich würde gern ans Meer fahren, aber ich verstehe, dass du lieber in die Berge möchtest. Wie wäre es, wenn wir die erste Woche am Meer und die zweite in den Bergen verbringen? So kommen wir beide auf unsere Kosten.',
    modelMn: 'Би далай руу явмаар байна, гэхдээ чи уул руу явахыг илүүд үздэгийг ойлгож байна. Эхний долоо хоногийг далайд, хоёр дахийг ууланд өнгөрүүлбэл яасан юм? Тэгвэл бид хоёулаа сэтгэл хангалуун болно.',
    tips: ['Ich würde gern … (Би … хүсэж байна)', 'Wie wäre es, wenn …? (… бол яасан юм?)', 'einen Kompromiss finden (буулт хийх)'] },
  { id: 203, level: 'B2', topic: 'Тайлбарлах', title: 'Eine Grafik beschreiben', titleMn: 'График тайлбарлах',
    prompt: 'Сүүлийн арван жилд хотдоо дугуй унагчдын тоо хэрхэн өссөнийг тайлбарла (төсөөлсөн график).',
    modelAnswer: 'Die Grafik zeigt, wie sich die Zahl der Radfahrer in den letzten zehn Jahren entwickelt hat. Während die Zahl zu Beginn relativ niedrig war, ist sie seit 2018 deutlich gestiegen. Besonders auffällig ist der starke Anstieg in den letzten drei Jahren.',
    modelMn: 'График сүүлийн арван жилд дугуйчдын тоо хэрхэн өөрчлөгдсөнийг харуулж байна. Эхэндээ тоо харьцангуй бага байсан бол 2018 оноос хойш мэдэгдэхүйц өссөн. Ялангуяа сүүлийн гурван жилийн огцом өсөлт онцлог.',
    tips: ['Die Grafik zeigt … (График … харуулж байна)', 'Die Zahl ist gestiegen / gesunken (тоо өссөн / буурсан)', 'Besonders auffällig ist … (онцлог нь …)'] },
  { id: 204, level: 'B2', topic: 'Санал бодол', title: 'Geld oder Zufriedenheit?', titleMn: 'Мөнгө уу, сэтгэл ханамж уу',
    prompt: '"Ажил сонгохдоо цалин хамгийн чухал" гэдэгтэй санал нийлэх үү? Тайлбарла.',
    modelAnswer: 'Natürlich spielt das Gehalt eine wichtige Rolle, schließlich muss man seine Rechnungen bezahlen. Dennoch glaube ich, dass die Zufriedenheit im Beruf langfristig wichtiger ist. Wer seine Arbeit hasst, wird trotz hohen Gehalts nicht glücklich. Für mich zählt die Balance zwischen beidem.',
    modelMn: 'Мэдээж цалин чухал үүрэгтэй, эцэст нь нэхэмжлэхээ төлөх ёстой. Гэсэн ч урт хугацаанд ажлын сэтгэл ханамж илүү чухал гэж би боддог. Ажлаа үзэн яддаг хүн өндөр цалинтай ч аз жаргалгүй. Миний хувьд хоёрын тэнцвэр чухал.',
    tips: ['… spielt eine Rolle (… үүрэгтэй)', 'Dennoch glaube ich … (Гэсэн ч би … боддог)', 'langfristig (урт хугацаанд)'] },
  { id: 205, level: 'B2', topic: 'Асуудал шийдэх', title: 'Eine Beschwerde mündlich', titleMn: 'Амаар гомдол гаргах',
    prompt: 'Зочид буудалд өрөө нь захиалсан шиг биш байна. Ресепшнтэй эелдэг ч шийдэмгий ярь.',
    modelAnswer: 'Entschuldigen Sie, aber ich hatte ein Zimmer mit Meerblick reserviert, und dieses Zimmer geht zur Straße. Außerdem funktioniert die Klimaanlage nicht. Ich möchte Sie bitten, mir ein anderes Zimmer zu geben oder eine Lösung anzubieten.',
    modelMn: 'Уучлаарай, би далайн харагдацтай өрөө захиалсан ч энэ өрөө гудамж руу харсан байна. Түүнчлэн агааржуулагч ажиллахгүй байна. Танаас өөр өрөө өгөх эсвэл шийдэл санал болгохыг хүсэж байна.',
    tips: ['Ich hatte … reserviert (Би … захиалсан)', 'Ich möchte Sie bitten, … (Танаас … хүсэж байна)', 'eine Lösung anbieten (шийдэл санал болгох)'] },
];

// =============================================================================
// C1 — шинээр зохиосон контент (5 тест / хэсэг)
// =============================================================================
const C1_READING: ReadingItem[] = [
  { id: 301, level: 'C1', topic: 'Нийгэм', title: 'Digitalisierung der Arbeitswelt', titleMn: 'Ажлын ертөнцийн дижиталчлал',
    text: 'Die fortschreitende Digitalisierung verändert nicht nur, womit wir arbeiten, sondern auch, wie wir zusammenarbeiten. Während Befürworter betonen, dass Automatisierung monotone Tätigkeiten überflüssig macht und Raum für kreative Aufgaben schafft, warnen Kritiker vor dem Verlust ganzer Berufsfelder. Unbestritten ist jedoch, dass lebenslanges Lernen zur Voraussetzung für beruflichen Erfolg geworden ist.',
    translation: 'Урагшилж буй дижиталчлал нь бид юугаар ажилладаг төдийгүй хэрхэн хамтран ажилладгийг өөрчилж байна. Дэмжигчид автоматжуулалт нэгэн хэвийн ажлыг илүүц болгож, бүтээлч ажилд зай гаргадаг гэж онцолдог бол шүүмжлэгчид бүхэл бүтэн мэргэжлийн салбар алга болохоос сэрэмжлүүлдэг. Гэвч насан туршийн суралцал нь ажил мэргэжлийн амжилтын урьдчилсан нөхцөл болсон нь маргаангүй.',
    question: 'Текстэд маргаангүй гэж юуг дурдсан бэ?', choices: ['Автоматжуулал муу гэдгийг', 'Насан туршийн суралцал зайлшгүй болсныг', 'Бүх ажил алга болохыг'], correctIndex: 1 },
  { id: 302, level: 'C1', topic: 'Хэл шинжлэл', title: 'Sprache und Identität', titleMn: 'Хэл ба өвөрмөц байдал',
    text: 'Sprache ist weit mehr als ein bloßes Mittel zur Verständigung; sie prägt unsere Wahrnehmung und unser Zugehörigkeitsgefühl. Mehrsprachige Menschen berichten häufig, dass sie sich je nach Sprache anders verhalten oder gar anders denken. Inwieweit die Sprache unser Denken tatsächlich formt, ist allerdings bis heute Gegenstand wissenschaftlicher Debatten.',
    translation: 'Хэл бол зүгээр л харилцах хэрэгслээс хол илүү; энэ нь бидний хүлээн авах байдал, харьяалагдах мэдрэмжийг төлөвшүүлдэг. Олон хэлтэй хүмүүс хэлээсээ хамаараад өөрөөр аашилдаг, бүр өөрөөр боддог гэж ихэвчлэн ярьдаг. Гэхдээ хэл бидний сэтгэлгээг хэр зэрэг үнэхээр төлөвшүүлдэг нь өнөөг хүртэл шинжлэх ухааны маргааны сэдэв хэвээр байна.',
    question: 'Зохиогчийн хэлснээр маргаантай хэвээр байгаа зүйл юу вэ?', choices: ['Хэл харилцааны хэрэгсэл мөн эсэх', 'Хэл сэтгэлгээг хэр төлөвшүүлдэг нь', 'Олон хэл сурах боломжтой эсэх'], correctIndex: 1 },
  { id: 303, level: 'C1', topic: 'Эдийн засаг', title: 'Globalisierung', titleMn: 'Даяаршил',
    text: 'Die Globalisierung hat den Wohlstand in vielen Teilen der Welt erhöht, zugleich aber neue Abhängigkeiten geschaffen. Lieferketten erstrecken sich heute über mehrere Kontinente, sodass eine Krise in einer Region unmittelbare Folgen für die gesamte Weltwirtschaft haben kann. Die Frage, wie sich Effizienz und Krisensicherheit vereinbaren lassen, beschäftigt Ökonomen weltweit.',
    translation: 'Даяаршил дэлхийн олон хэсэгт хөгжил дэвшлийг нэмэгдүүлсэн ч зэрэгцэн шинэ хараат байдлыг бий болгосон. Нийлүүлэлтийн сүлжээ өнөөдөр хэд хэдэн тивийг хамардаг тул нэг бүс нутгийн хямрал дэлхийн нийт эдийн засагт шууд үр дагавартай байж болно. Үр ашиг, хямралд тэсвэртэй байдлыг хэрхэн уялдуулах вэ гэдэг асуудал дэлхийн эдийн засагчдыг зовоодог.',
    question: 'Даяаршил ямар шинэ зүйл бий болгосон бэ?', choices: ['Зөвхөн хөгжил дэвшил', 'Шинэ хараат байдал', 'Хямралыг бүрэн арилгасан'], correctIndex: 1 },
  { id: 304, level: 'C1', topic: 'Шинжлэх ухаан', title: 'Wissenschaftskommunikation', titleMn: 'Шинжлэх ухааны харилцаа',
    text: 'Damit wissenschaftliche Erkenntnisse in der Gesellschaft Wirkung entfalten, müssen sie verständlich vermittelt werden. Gerade in Zeiten, in denen Fehlinformationen sich rasant verbreiten, kommt der Wissenschaftskommunikation eine entscheidende Rolle zu. Forscher stehen dabei vor der Herausforderung, komplexe Sachverhalte zu vereinfachen, ohne sie zu verfälschen.',
    translation: 'Шинжлэх ухааны мэдлэг нийгэмд нөлөө үзүүлэхийн тулд ойлгомжтойгоор дамжуулагдах ёстой. Ялангуяа худал мэдээлэл хурдан тархаж буй энэ үед шинжлэх ухааны харилцаанд шийдвэрлэх үүрэг ногддог. Үүний зэрэгцээ судлаачид нарийн төвөгтэй зүйлийг гуйвуулалгүйгээр хялбарчлах сорилттой тулгардаг.',
    question: 'Судлаачдын тулгардаг сорилт юу вэ?', choices: ['Мэдээллийг нууцлах', 'Нарийн зүйлийг гуйвуулалгүй хялбарчлах', 'Зөвхөн эрдэмтэдтэй ярих'], correctIndex: 1 },
  { id: 305, level: 'C1', topic: 'Соёл', title: 'Kunst im öffentlichen Raum', titleMn: 'Нийтийн орон зай дахь урлаг',
    text: 'Kunst im öffentlichen Raum polarisiert: Während die einen sie als Bereicherung des Stadtbildes feiern, empfinden andere sie als Verschwendung von Steuergeldern. Befürworter halten dagegen, dass frei zugängliche Kunst Menschen erreicht, die sonst nie ein Museum betreten würden. Letztlich spiegelt die Debatte unterschiedliche Vorstellungen davon wider, welche Aufgabe Kunst in einer Gesellschaft erfüllen soll.',
    translation: 'Нийтийн орон зай дахь урлаг хүмүүсийг хоёр туйлд хуваадаг: зарим нь үүнийг хотын дүр төрхийг баяжуулагч гэж тэмдэглэдэг бол зарим нь татвар төлөгчдийн мөнгийг үрэх явдал гэж үздэг. Дэмжигчид нээлттэй урлаг музейд хэзээ ч ороогүй хүмүүст хүрдэг гэж эсэргүүцдэг. Эцэст нь энэ маргаан урлаг нийгэмд ямар үүрэг гүйцэтгэх ёстой тухай өөр өөр төсөөллийг тусгадаг.',
    question: 'Маргаан эцэст нь юуг тусгадаг вэ?', choices: ['Урлагийн үнэ', 'Урлаг нийгэмд ямар үүрэгтэй тухай өөр төсөөллүүдийг', 'Музейн тоог'], correctIndex: 1 },
];

const C1_LISTENING: ListeningItem[] = [
  { id: 301, level: 'C1', topic: 'Лекц', title: 'Vortrag: Künstliche Intelligenz', titleMn: 'Лекц: хиймэл оюун',
    audioText: 'Meine Damen und Herren, künstliche Intelligenz wird oft entweder als Heilsbringer oder als Bedrohung dargestellt. Beide Sichtweisen greifen zu kurz. Entscheidend ist nicht die Technologie selbst, sondern die Frage, nach welchen ethischen Grundsätzen wir sie einsetzen. Genau hier liegt die eigentliche Herausforderung unserer Zeit.',
    transcriptMn: 'Эрхэм хүндэт зочид, хиймэл оюун ухааныг ихэвчлэн аврагч эсвэл аюул гэж дүрсэлдэг. Хоёр үзэл бодол хоёулаа дутуу. Технологи өөрөө биш, харин бид үүнийг ямар ёс зүйн зарчмаар ашиглах вэ гэдэг асуулт шийдвэрлэх ач холбогдолтой. Яг энд бидний цаг үеийн жинхэнэ сорилт оршдог.',
    question: 'Илтгэгчийн хэлснээр шийдвэрлэх зүйл юу вэ?', choices: ['Технологи өөрөө', 'Ямар ёс зүйгээр ашиглах вэ гэдэг', 'Хэн зохион бүтээсэн нь'], correctIndex: 1 },
  { id: 302, level: 'C1', topic: 'Ярилцлага', title: 'Diskussion: Stadtentwicklung', titleMn: 'Хэлэлцүүлэг: хот хөгжил',
    audioText: 'Wenn wir über die Zukunft unserer Städte sprechen, dürfen wir nicht nur an Wohnraum denken. Eine lebenswerte Stadt braucht Grünflächen, kurze Wege und Orte der Begegnung. Leider wird bei vielen Bauprojekten der Profit über die Lebensqualität gestellt, und das rächt sich langfristig.',
    transcriptMn: 'Хотынхоо ирээдүйн тухай ярихдаа бид зөвхөн орон сууцны тухай бодож болохгүй. Амьдрахад таатай хотод ногоон байгууламж, богино зам, уулзах газрууд хэрэгтэй. Харамсалтай нь олон барилгын төсөлд ашгийг амьдралын чанараас дээгүүр тавьдаг бөгөөд энэ нь урт хугацаанд хариу авчирдаг.',
    question: 'Илтгэгч юунд шүүмжлэлтэй хандаж байна вэ?', choices: ['Ногоон байгууламжид', 'Ашгийг амьдралын чанараас дээгүүр тавихад', 'Богино замд'], correctIndex: 1 },
  { id: 303, level: 'C1', topic: 'Подкаст', title: 'Podcast: Glück', titleMn: 'Подкаст: аз жаргал',
    audioText: 'Was macht uns eigentlich glücklich? Die Forschung deutet darauf hin, dass es weniger der Besitz von Dingen ist als vielmehr die Qualität unserer Beziehungen. Wer enge Freundschaften pflegt und sich für andere engagiert, berichtet langfristig von größerer Zufriedenheit als jemand, der allein dem materiellen Erfolg nachjagt.',
    transcriptMn: 'Биднийг үнэндээ юу аз жаргалтай болгодог вэ? Судалгаа эд хөрөнгөтэй байхаас илүү бидний харилцааны чанар чухал гэдгийг харуулдаг. Дотно нөхөрлөл хадгалж, бусдад туслахаар оролцдог хүн зөвхөн материаллаг амжилтын хойноос хөөцөлддөг хүнээс урт хугацаанд илүү их сэтгэл ханамжтай байдаг.',
    question: 'Судалгаагаар юу биднийг илүү аз жаргалтай болгодог вэ?', choices: ['Эд хөрөнгө', 'Харилцааны чанар', 'Материаллаг амжилт'], correctIndex: 1 },
  { id: 304, level: 'C1', topic: 'Мэдээ', title: 'Kommentar: Bildung', titleMn: 'Тайлбар: боловсрол',
    audioText: 'Es wird viel über Reformen im Bildungssystem geredet, doch oft bleiben die Maßnahmen an der Oberfläche. Solange Lehrkräfte überlastet und Schulen unterfinanziert sind, werden auch die besten Konzepte scheitern. Bildung darf nicht länger ein Sparposten sein, sondern muss als Investition in die Zukunft verstanden werden.',
    transcriptMn: 'Боловсролын тогтолцооны шинэчлэлийн тухай их ярьдаг ч арга хэмжээ ихэвчлэн өнгөн талдаа үлддэг. Багш нар хэт ачаалалтай, сургуулиуд санхүүжилт дутмаг хэвээр байх л бол хамгийн сайн төсөл ч бүтэлгүйтнэ. Боловсрол цаашид хэмнэлтийн зүйл байж болохгүй, харин ирээдүйд оруулах хөрөнгө оруулалт гэж ойлгогдох ёстой.',
    question: 'Тайлбарлагчийн гол шаардлага юу вэ?', choices: ['Боловсролыг хэмнэлтийн зүйл болгох', 'Боловсролыг хөрөнгө оруулалт гэж үзэх', 'Сургуулиудыг хаах'], correctIndex: 1 },
  { id: 305, level: 'C1', topic: 'Илтгэл', title: 'Rede: Freiwilligenarbeit', titleMn: 'Илтгэл: сайн дурын ажил',
    audioText: 'Liebe Anwesende, eine Gesellschaft zeigt ihren wahren Charakter darin, wie sie mit ihren schwächsten Mitgliedern umgeht. Freiwilliges Engagement ist dabei kein Ersatz für staatliche Verantwortung, wohl aber ein unverzichtbarer Ausdruck gelebter Solidarität. Lassen Sie uns daher gemeinsam dafür sorgen, dass niemand zurückgelassen wird.',
    transcriptMn: 'Эрхэм хүндэт оролцогчид оо, нийгэм өөрийн хамгийн сул гишүүдтэйгээ хэрхэн харьцаж буйгаараа жинхэнэ зан чанараа харуулдаг. Сайн дурын оролцоо нь төрийн хариуцлагыг орлохгүй ч амьд эв нэгдлийн зайлшгүй илэрхийлэл юм. Тиймээс хэнийг ч хоцроохгүй байхын төлөө хамтдаа хичээцгээе.',
    question: 'Илтгэгчийн хэлснээр нийгэм жинхэнэ зан чанараа хэрхэн харуулдаг вэ?', choices: ['Баялгаараа', 'Сул гишүүдтэйгээ хэрхэн харьцдгаараа', 'Технологиороо'], correctIndex: 1 },
];

const C1_WRITING: WritingItem[] = [
  { id: 301, level: 'C1', topic: 'Эссэ', title: 'Erörterung: Technologie', titleMn: 'Өгүүлэл: технологи',
    prompt: '"Технологийн дэвшил хүнийг илүү аз жаргалтай болгодог уу?" сэдвээр бүтэцтэй өгүүлэл бич.',
    points: ['Тодорхой танилцуулга ба байр суурь', 'Эсрэг талын аргументыг авч үзэх', 'Үндэслэлтэй дүгнэлт'],
    modelAnswer: 'Kaum eine Entwicklung hat unser Leben so verändert wie der technologische Fortschritt. Befürworter verweisen darauf, dass moderne Technik uns Arbeit abnimmt und den Zugang zu Wissen erleichtert. Diese Argumente sind nicht von der Hand zu weisen. Dennoch sollte man bedenken, dass ständige Erreichbarkeit und Reizüberflutung auch zu Stress führen können. Glück hängt meines Erachtens weniger von der Technik selbst ab als davon, wie bewusst wir sie nutzen. Entscheidend ist also nicht der Fortschritt an sich, sondern unser Umgang mit ihm.',
    modelMn: 'Технологийн дэвшил шиг бидний амьдралыг өөрчилсөн зүйл ховор. Дэмжигчид орчин үеийн техник биднээс ажлыг авч, мэдлэгт хүрэхийг хөнгөвчилдөг гэдгийг онцолдог. Эдгээр аргументыг үгүйсгэх аргагүй. Гэсэн ч байнгын холбогдох боломж, өдөөлтийн хэт ачаалал стресст хүргэж болзошгүйг анхаарах хэрэгтэй. Миний бодлоор аз жаргал техникээс өөрөөс нь биш, харин бид үүнийг хэр ухамсартай ашиглахаас шалтгаална. Тиймээс дэвшил өөрөө биш, харин бидний түүнд хандах хандлага шийдвэрлэх ач холбогдолтой.' },
  { id: 302, level: 'C1', topic: 'Захидал', title: 'Formeller Beschwerdebrief', titleMn: 'Албан гомдлын захидал',
    prompt: 'Семинарын чанар муу байсан тухай зохион байгуулагчид албан гомдол бич.',
    points: ['Нөхцөл байдлыг бодитойгоор тайлбарла', 'Тодорхой дутагдлуудыг дурд', 'Зохистой шийдэл шаард'],
    modelAnswer: 'Sehr geehrte Damen und Herren, ich habe vergangene Woche an Ihrem Seminar „Effektives Zeitmanagement" teilgenommen und möchte Ihnen meine Enttäuschung mitteilen. Entgegen der Ankündigung wurden zentrale Themen nur oberflächlich behandelt, und für Fragen blieb kaum Zeit. Angesichts der hohen Teilnahmegebühr halte ich dies für nicht akzeptabel. Ich bitte Sie daher, mir entweder einen Teil der Gebühr zu erstatten oder die kostenlose Teilnahme an einem weiteren Seminar zu ermöglichen. Mit freundlichen Grüßen, ...',
    modelMn: 'Эрхэм хүндэт ноёд хатагтай нар аа, би өнгөрсөн долоо хоногт танай "Үр дүнтэй цаг менежмент" семинарт оролцсон бөгөөд сэтгэл дундуур байгаагаа илэрхийлмээр байна. Зарласнаас өөрөөр гол сэдвүүдийг зөвхөн өнгөн талаас нь авч үзсэн, асуултад бараг цаг үлдээгүй. Оролцооны өндөр төлбөрийг харгалзан үзвэл би үүнийг хүлээн зөвшөөрөхийн аргагүй гэж үзэж байна. Тиймээс төлбөрийн хэсгийг буцаах эсвэл өөр семинарт үнэгүй оролцох боломжийг олгохыг хүсье. Хүндэтгэсэн, ...' },
  { id: 303, level: 'C1', topic: 'Эссэ', title: 'Stellungnahme: Ehrenamt', titleMn: 'Байр суурь: сайн дурын ажил',
    prompt: '"Сайн дурын ажлыг сургуульд заавал болгох ёстой" гэдэгт байр сууриа гарга.',
    points: ['Асуудлыг тодорхойл', 'Эерэг ба сөрөг талуудыг жинлэ', 'Хувийн дүгнэлт'],
    modelAnswer: 'Die Idee, ehrenamtliches Engagement an Schulen verpflichtend zu machen, wird kontrovers diskutiert. Auf der einen Seite könnten junge Menschen so früh Verantwortung übernehmen und soziale Kompetenzen entwickeln. Auf der anderen Seite stellt sich die Frage, ob ein erzwungenes Ehrenamt überhaupt diesen Namen verdient, denn Freiwilligkeit ist gerade sein Kern. Ich plädiere daher für ein freiwilliges Angebot mit attraktiven Anreizen statt für eine Pflicht.',
    modelMn: 'Сайн дурын оролцоог сургуульд заавал болгох санаа маргаантай хэлэлцэгддэг. Нэг талаас залуус эрт хариуцлага хүлээж, нийгмийн ур чадвар хөгжүүлж болно. Нөгөө талаас албадсан сайн дурын ажил тэр нэрийг хүртэх эсэх асуулт гарч ирдэг, учир нь сайн дур нь түүний цөм юм. Тиймээс би албадлагын оронд татах урамшуулалтай сайн дурын санал болгохыг дэмжиж байна.' },
  { id: 304, level: 'C1', topic: 'Тайлан', title: 'Bericht zusammenfassen', titleMn: 'Тайлан нэгтгэх',
    prompt: 'Гэрээсээ ажиллах талаарх судалгааны үр дүнг нэгтгэн, өөрийн үнэлгээ нэм.',
    points: ['Гол үр дүнг нэгтгэ', 'Объектив хэвээр үлд', 'Богино үнэлгээгээр төгсгө'],
    modelAnswer: 'Die vorliegende Studie untersucht die Auswirkungen des Homeoffice auf die Produktivität. Den Ergebnissen zufolge arbeiten viele Beschäftigte zu Hause konzentrierter, fühlen sich jedoch häufiger isoliert. Besonders auffällig ist, dass die Zufriedenheit stark von der individuellen Wohnsituation abhängt. Insgesamt zeichnet die Studie ein differenziertes Bild und macht deutlich, dass es keine pauschale Antwort gibt. Aus meiner Sicht bestätigt sie, wie wichtig flexible, an die Person angepasste Lösungen sind.',
    modelMn: 'Энэхүү судалгаа гэрээс ажиллах нь бүтээмжид үзүүлэх нөлөөг судалжээ. Үр дүнгээс үзвэл олон ажилтан гэртээ илүү төвлөрч ажилладаг ч ихэвчлэн тусгаарлагдсан мэдрэмж төрдөг. Ялангуяа сэтгэл ханамж хувь хүний орон сууцны нөхцөлөөс ихээхэн хамаардаг нь онцлог. Ерөнхийдөө судалгаа нарийн дүр зургийг харуулж, нэг ерөнхий хариулт байхгүйг тодорхой болгожээ. Миний хувьд энэ нь хувь хүнд тохирсон уян хатан шийдэл хэр чухал болохыг батлаж байна.' },
  { id: 305, level: 'C1', topic: 'Эссэ', title: 'Argumentation: Kultur', titleMn: 'Аргумент: соёл',
    prompt: '"Уламжлал орчин үеийн нийгэмд ач холбогдлоо алдсан уу?" сэдвээр бич.',
    points: ['Байр суурь', 'Хоёр өнцгөөс авч үзэх', 'Нийлмэл дүгнэлт'],
    modelAnswer: 'Ob Traditionen in einer modernen, schnelllebigen Gesellschaft noch eine Rolle spielen, ist eine Frage, die sich nicht einfach beantworten lässt. Zweifellos verlieren manche Bräuche an Bedeutung, weil sie nicht mehr zum Alltag passen. Gleichzeitig vermitteln Traditionen ein Gefühl von Zugehörigkeit und Kontinuität, das gerade in unsicheren Zeiten geschätzt wird. Statt Traditionen pauschal zu bewahren oder abzuschaffen, sollten wir prüfen, welche Werte sie verkörpern und ob diese noch tragfähig sind.',
    modelMn: 'Уламжлал орчин үеийн, хурдан амьдралтай нийгэмд үүрэгтэй хэвээр байгаа эсэх нь амархан хариулагдахгүй асуулт. Зарим зан заншил өдөр тутамд тохирохгүй болсон тул ач холбогдлоо алддаг нь эргэлзээгүй. Үүний зэрэгцээ уламжлал нь ялангуяа тодорхойгүй цаг үед үнэлэгддэг харьяалагдах, тасралтгүй байх мэдрэмжийг өгдөг. Уламжлалыг бүхэлд нь хадгалах эсвэл халахын оронд тэдгээр нь ямар үнэт зүйлийг илэрхийлдэг, тэдгээр нь одоо ч хүчинтэй эсэхийг шалгах хэрэгтэй.' },
];

const C1_SPEAKING: SpeakingItem[] = [
  { id: 301, level: 'C1', topic: 'Хэлэлцүүлэг', title: 'Standpunkt vertreten', titleMn: 'Байр суурь хамгаалах',
    prompt: '"Их сургуулийн боловсрол үнэгүй байх ёстой" гэдгийг хамгаалж, эсрэг аргументад хариул.',
    modelAnswer: 'Ich bin überzeugt, dass der Zugang zu höherer Bildung nicht vom Einkommen der Eltern abhängen darf. Eine kostenlose Universität fördert die Chancengleichheit und kommt langfristig der gesamten Gesellschaft zugute. Man könnte einwenden, dass dies den Staat viel kostet. Dem würde ich entgegnen, dass gut ausgebildete Bürger diese Investition durch Steuern und Innovation zurückzahlen.',
    modelMn: 'Дээд боловсрол эзэмших боломж эцэг эхийн орлогоос хамаарч болохгүй гэдэгт би итгэлтэй байна. Үнэгүй их сургууль тэгш боломжийг дэмжиж, урт хугацаанд нийт нийгэмд тустай. Энэ нь төрд их зардалтай гэж эсэргүүцэж болно. Үүнд би сайн боловсролтой иргэд татвар, шинэчлэлээр энэ хөрөнгө оруулалтыг буцааж төлдөг гэж хариулна.',
    tips: ['Ich bin überzeugt, dass … (… гэдэгт итгэлтэй)', 'Man könnte einwenden, dass … (… гэж эсэргүүцэж болно)', 'Dem würde ich entgegnen … (Үүнд би … хариулна)'] },
  { id: 302, level: 'C1', topic: 'Таамаглал', title: 'Hypothesen bilden', titleMn: 'Таамаглал дэвшүүлэх',
    prompt: 'Хэрэв хүн бүр долоо хоногт ердөө дөрвөн өдөр ажилладаг байсан бол нийгэм яаж өөрчлөгдөх байсан бэ?',
    modelAnswer: 'Wenn alle nur vier Tage pro Woche arbeiten würden, hätte das weitreichende Folgen. Einerseits hätten die Menschen mehr Zeit für Familie und Erholung, was sich positiv auf die Gesundheit auswirken könnte. Andererseits müssten Unternehmen ihre Abläufe umstellen, und manche Branchen kämen womöglich unter Druck. Letztlich hinge der Erfolg davon ab, ob die Produktivität trotz kürzerer Arbeitszeit erhalten bliebe.',
    modelMn: 'Хэрэв бүгд долоо хоногт дөрвөн өдөр ажилладаг байсан бол өргөн хүрээтэй үр дагавартай байх байсан. Нэг талаас хүмүүст гэр бүл, амралтад илүү цаг гарч, эрүүл мэндэд эерэгээр нөлөөлж болох байсан. Нөгөө талаас компаниуд үйл ажиллагаагаа өөрчлөх шаардлагатай болж, зарим салбар дарамтад орох байх. Эцэст нь амжилт нь богино цагт ч бүтээмж хадгалагдах эсэхээс шалтгаална.',
    tips: ['Wenn … würde, hätte das … (Хэрэв … бол … байх байсан)', 'Konjunktiv II: hätte, müsste, käme', 'Letztlich hinge … von … ab'] },
  { id: 303, level: 'C1', topic: 'Зуучлал', title: 'Vermitteln in einem Konflikt', titleMn: 'Зөрчилд зуучлах',
    prompt: 'Хоёр найз амралтаа хаана өнгөрүүлэх талаар маргаж байна. Зуучлан шийдэл санал болго.',
    modelAnswer: 'Ich verstehe beide Seiten gut. Du möchtest Erholung am Strand, während du eher das Abenteuer in den Bergen suchst. Vielleicht lässt sich ein Kompromiss finden, bei dem beide Wünsche berücksichtigt werden. Was haltet ihr davon, ein Ziel zu wählen, das sowohl Entspannung als auch Aktivität bietet? So muss niemand ganz auf seine Vorstellungen verzichten.',
    modelMn: 'Би хоёр талыг сайн ойлгож байна. Чи далайн эрэг дээр амрахыг хүсэж байгаа бол чи ууланд адал явдал хайж байна. Магадгүй хоёр хүсэлийг хоёуланг нь харгалзсан буулт олж болох юм. Амралт ба идэвхтэй үйл ажиллагаа хоёрыг хоёуланг нь санал болгох газар сонгох талаар та нар юу гэж бодож байна? Тэгвэл хэн ч төсөөллөөсөө бүрэн татгалзах шаардлагагүй.',
    tips: ['Ich verstehe beide Seiten (Би хоёр талыг ойлгож байна)', 'Was haltet ihr davon, … zu …? (… гэвэл яасан юм бэ?)', 'einen Kompromiss finden (буулт олох)'] },
  { id: 304, level: 'C1', topic: 'Илтгэл', title: 'Eine These verteidigen', titleMn: 'Үзэл баримтлал хамгаалах',
    prompt: '"Аялал бол хамгийн сайн боловсрол" гэдгийг үндэслэлтэйгээр хамгаал.',
    modelAnswer: 'Reisen erweitert den Horizont auf eine Weise, die kein Lehrbuch leisten kann. Wer fremde Länder besucht, lernt nicht nur andere Sprachen und Sitten kennen, sondern hinterfragt auch die eigenen Gewohnheiten. Gerade dieses Hinterfragen ist der Kern echter Bildung. Natürlich ersetzt Reisen kein systematisches Wissen, doch es vermittelt etwas, das mindestens ebenso wertvoll ist: Offenheit und Empathie.',
    modelMn: 'Аялал нь ямар ч сурах бичгийн хийж чадахгүй байдлаар хүний хүрээг тэлдэг. Харь оронд зочлох хүн өөр хэл, ёс заншлыг таних төдийгүй өөрийн зуршлаа эргэцүүлдэг. Яг энэ эргэцүүлэл нь жинхэнэ боловсролын цөм юм. Мэдээж аялал системтэй мэдлэгийг орлохгүй ч дор хаяж адил үнэ цэнэтэй зүйлийг буюу нээлттэй байдал, эмпатийг өгдөг.',
    tips: ['… auf eine Weise, die … (… байдлаар)', 'nicht nur …, sondern auch … (зөвхөн … төдийгүй …)', 'der Kern … ist (… цөм нь)'] },
  { id: 305, level: 'C1', topic: 'Дүгнэлт', title: 'Vor- und Nachteile abwägen', titleMn: 'Давуу, сул талыг жинлэх',
    prompt: 'Гадаадад амьдрахын давуу, сул талыг нарийвчлан жинлэж, дүгнэлт гарга.',
    modelAnswer: 'Im Ausland zu leben bringt zweifellos viele Chancen mit sich. Man sammelt wertvolle Erfahrungen, verbessert seine Sprachkenntnisse und lernt, mit ungewohnten Situationen umzugehen. Dem stehen jedoch Herausforderungen gegenüber: das Gefühl der Fremdheit, die Distanz zur Familie und bürokratische Hürden. Wägt man beides ab, überwiegen meiner Ansicht nach langfristig die Vorteile, sofern man bereit ist, sich auf das Neue einzulassen.',
    modelMn: 'Гадаадад амьдрах нь эргэлзээгүй олон боломж авчирдаг. Хүн үнэ цэнэтэй туршлага хуримтлуулж, хэлний мэдлэгээ сайжруулж, шинэ нөхцөлд дасан зохицож сурдаг. Гэвч үүнд сорилтууд тулгардаг: харь мэдрэмж, гэр бүлээс хол байх, хүнд суртлын саад. Хоёуланг нь жинлэвэл миний бодлоор шинэ зүйлийг хүлээн авахад бэлэн бол урт хугацаанд давуу тал давамгайлдаг.',
    tips: ['… bringt Chancen mit sich (… боломж авчирдаг)', 'Dem stehen … gegenüber (Үүнд … тулгардаг)', 'Wägt man beides ab, … (Хоёуланг жинлэвэл …)'] },
];

// =============================================================================
// C2 — шинээр зохиосон контент (5 тест / хэсэг)
// =============================================================================
const C2_READING: ReadingItem[] = [
  { id: 401, level: 'C2', topic: 'Гүн ухаан', title: 'Über das Glück', titleMn: 'Аз жаргалын тухай',
    text: 'Die Vorstellung, Glück lasse sich durch gezieltes Streben erreichen, ist so verbreitet wie trügerisch. Wer das Glück unmittelbar zum Ziel erhebt, verfehlt es nicht selten, da es sich gerade dann einstellt, wenn man in einer Tätigkeit aufgeht, ohne nach ihrem Nutzen zu fragen. Insofern erweist sich Glück weniger als erreichbarer Zustand denn als flüchtiges Nebenprodukt eines erfüllten Lebens.',
    translation: 'Аз жаргалыг зорилготой эрмэлзлээр олж авч болно гэсэн төсөөлөл нь түгээмэл хэдий ч хуурамч. Аз жаргалыг шууд зорилго болгодог хүн үүнийг ихэвчлэн алддаг, учир нь энэ нь яг хэрэгцээг нь асуулгүйгээр ямар нэг үйл ажиллагаанд автах үед бий болдог. Энэ утгаараа аз жаргал нь хүрч болох төлөв бус, харин дүүрэн амьдралын түр зуурын дайвар бүтээгдэхүүн болж хувирдаг.',
    question: 'Зохиогчийн үзэж буйгаар аз жаргал юу вэ?', choices: ['Шууд олж авах төлөв', 'Дүүрэн амьдралын дайвар бүтээгдэхүүн', 'Мөнгөний үр дүн'], correctIndex: 1 },
  { id: 402, level: 'C2', topic: 'Утга зохиол', title: 'Die Macht der Sprache', titleMn: 'Хэлний хүч',
    text: 'Worte vermögen zu trösten und zu verletzen, zu erhellen und zu verschleiern. Wer die Sprache meisterhaft beherrscht, kann Wirklichkeit nicht nur abbilden, sondern formen. Eben darin liegt zugleich ihre Gefahr: Dieselbe Beredsamkeit, die zur Aufklärung beiträgt, lässt sich zur Manipulation missbrauchen. Sprachkritik ist daher kein bloß ästhetisches, sondern ein zutiefst ethisches Anliegen.',
    translation: 'Үг тайвшруулж, гэмтээж, гэрэлтүүлж, далдалж чаддаг. Хэлийг гаргуун эзэмшсэн хүн бодит байдлыг зөвхөн дүрслэх төдийгүй төлөвшүүлж чадна. Яг үүнд түүний аюул нэгэн зэрэг оршдог: гэгээрэлд хувь нэмэр оруулдаг тэр уран яриаг манипуляцид урвуулан ашиглаж болно. Тиймээс хэлний шүүмж нь зүгээр л гоо зүйн биш, харин гүн гүнзгий ёс зүйн асуудал юм.',
    question: 'Зохиогч хэлний шүүмжийг юу гэж үздэг вэ?', choices: ['Зөвхөн гоо зүйн', 'Гүн гүнзгий ёс зүйн асуудал', 'Шаардлагагүй'], correctIndex: 1 },
  { id: 403, level: 'C2', topic: 'Нийгэм', title: 'Fortschritt und Skepsis', titleMn: 'Дэвшил ба эргэлзээ',
    text: 'Der Glaube an den unaufhaltsamen Fortschritt hat im vergangenen Jahrhundert tiefe Risse bekommen. Was als Befreiung von Mühsal gepriesen wurde, brachte zugleich ökologische Verwerfungen hervor, deren Ausmaß wir erst allmählich begreifen. Dies bedeutet keineswegs, dem Fortschritt grundsätzlich abzuschwören; vielmehr gilt es, ihn von blinder Technikgläubigkeit zu lösen und an menschliche und ökologische Maßstäbe zu binden.',
    translation: 'Зогсолтгүй дэвшилд итгэх итгэл өнгөрсөн зуунд гүнзгий хагарал авсан. Зүдгүүрээс чөлөөлөгч хэмээн магтагдсан зүйл нэгэн зэрэг экологийн эвдрэлийг бий болгож, түүний цар хүрээг бид сая аажмаар ойлгож байна. Энэ нь дэвшлээс зарчмын хувьд татгалзана гэсэн үг огтхон ч биш; харин үүнийг техникт сохроор итгэхээс салгаж, хүн болон экологийн хэмжүүрт холбох ёстой.',
    question: 'Зохиогч юуг санал болгож байна вэ?', choices: ['Дэвшлээс бүрэн татгалзах', 'Дэвшлийг хүн ба экологийн хэмжүүрт холбох', 'Технологид сохроор итгэх'], correctIndex: 1 },
  { id: 404, level: 'C2', topic: 'Уран зохиол', title: 'Die Kunst des Lesens', titleMn: 'Унших урлаг',
    text: 'Echtes Lesen erschöpft sich nicht im Entziffern von Zeichen, sondern verlangt eine Bereitschaft, sich vom Text irritieren zu lassen. Wer nur bestätigt sehen will, was er ohnehin denkt, liest im Grunde gar nicht. Erst dort, wo ein Buch uns widerspricht und zum Innehalten zwingt, beginnt jene stille Auseinandersetzung, die den Leser verwandelt.',
    translation: 'Жинхэнэ унших нь тэмдэг тайлахаар дуусдаггүй, харин бичвэрт өөрийгөө цочирдуулахад бэлэн байхыг шаарддаг. Аль хэдийн боддог зүйлээ зөвхөн батлуулахыг хүсдэг хүн үндсэндээ огт уншдаггүй. Ном бидэнтэй зөрчилдөж, зогсоход хүргэдэг тэр газар л уншигчийг өөрчилдөг чимээгүй мэтгэлцээн эхэлдэг.',
    question: 'Зохиогчийн хэлснээр жинхэнэ унших хэзээ эхэлдэг вэ?', choices: ['Тэмдэг тайлахад', 'Ном бидэнтэй зөрчилдөж, эргэцүүлэхэд хүргэх үед', 'Бодлоо батлуулах үед'], correctIndex: 1 },
  { id: 405, level: 'C2', topic: 'Ёс зүй', title: 'Verantwortung im digitalen Zeitalter', titleMn: 'Дижитал эрин дэх хариуцлага',
    text: 'Mit der Reichweite, die digitale Technologien dem Einzelnen verleihen, wächst auch dessen Verantwortung. Wo eine beiläufige Äußerung binnen Stunden Millionen erreichen kann, verliert die Ausrede, man habe es nicht so gemeint, an Gewicht. Die Mündigkeit des digitalen Bürgers bemisst sich folglich nicht allein an dem, was er zu sagen vermag, sondern an dem, was zu sagen er sich enthält.',
    translation: 'Дижитал технологи хувь хүнд олгож буй хүрээтэй хамт түүний хариуцлага ч өсдөг. Санамсаргүй хэлсэн үг хэдхэн цагийн дотор сая сая хүнд хүрч болдог газар "би тэгж хэлээгүй" гэсэн шалтаг жингээ алддаг. Тиймээс дижитал иргэний боловсронгуй байдал нь зөвхөн юу хэлж чадахаар нь биш, харин юу хэлэхээс татгалздагаар нь хэмжигддэг.',
    question: 'Зохиогчийн хэлснээр дижитал иргэний боловсронгуй байдлыг юугаар хэмждэг вэ?', choices: ['Юу хэлж чадахаар нь', 'Юу хэлэхээс татгалздагаар нь', 'Хэдэн дагагчтайгаар нь'], correctIndex: 1 },
];

const C2_LISTENING: ListeningItem[] = [
  { id: 401, level: 'C2', topic: 'Илтгэл', title: 'Festrede', titleMn: 'Ёслолын илтгэл',
    audioText: 'Verehrte Gäste, wahre Bildung erschöpft sich nicht im Anhäufen von Wissen, sondern zeigt sich in der Fähigkeit, das Gewusste in Frage zu stellen. Eine Gesellschaft, die nur Antworten belohnt, aber das Fragen verlernt, beraubt sich ihrer Zukunft. Lassen Sie uns daher den Mut zum Zweifel kultivieren, denn er ist kein Zeichen der Schwäche, sondern der geistigen Reife.',
    transcriptMn: 'Эрхэм хүндэт зочид, жинхэнэ боловсрол мэдлэг хуримтлуулахаар дуусдаггүй, харин мэдсэн зүйлээ эргэлзэн асуух чадвараар илэрдэг. Зөвхөн хариултыг шагнадаг ч асуухаа мартдаг нийгэм өөрийн ирээдүйг булаадаг. Тиймээс эргэлзэх зоригийг хөгжүүлцгээе, учир нь энэ нь сул талын бус, оюун санааны төлөвшлийн шинж юм.',
    question: 'Илтгэгчийн хэлснээр эргэлзэх нь юуны шинж вэ?', choices: ['Сул талын', 'Оюун санааны төлөвшлийн', 'Мэдлэггүйн'], correctIndex: 1 },
  { id: 402, level: 'C2', topic: 'Хэлэлцүүлэг', title: 'Debatte: Freiheit', titleMn: 'Мэтгэлцээн: эрх чөлөө',
    audioText: 'Man beruft sich gern auf die Freiheit, vergisst dabei aber, dass meine Freiheit dort endet, wo sie die des anderen beschneidet. Freiheit ohne Verantwortung ist nicht Freiheit, sondern Willkür. Eine reife Demokratie zeichnet sich gerade dadurch aus, dass sie diese Spannung aushält, statt sie vorschnell zugunsten einer Seite aufzulösen.',
    transcriptMn: 'Хүмүүс эрх чөлөөг дурдах дуртай ч миний эрх чөлөө бусдынхыг хязгаарлах газар дуусдгийг мартдаг. Хариуцлагагүй эрх чөлөө бол эрх чөлөө биш, харин дур зориг. Боловсронгуй ардчилал яг энэ хурцадмал байдлыг яаран нэг талд шийдвэрлэхийн оронд тэвчдэгээрээ онцлогтой.',
    question: 'Илтгэгчийн хэлснээр хариуцлагагүй эрх чөлөө юу болдог вэ?', choices: ['Жинхэнэ эрх чөлөө', 'Дур зориг', 'Ардчилал'], correctIndex: 1 },
  { id: 403, level: 'C2', topic: 'Шинжлэх ухаан', title: 'Vortrag: Klima', titleMn: 'Илтгэл: уур амьсгал',
    audioText: 'Die Klimakrise stellt uns vor ein Dilemma, das sich nicht mit einfachen Parolen lösen lässt. Wer ausschließlich auf individuelle Verzichtsleistungen setzt, überschätzt deren Wirkung und entlastet zugleich diejenigen, die strukturelle Veränderungen herbeiführen müssten. Notwendig ist ein Zusammenspiel aus persönlicher Verantwortung und politischer Weichenstellung.',
    transcriptMn: 'Уур амьсгалын хямрал биднийг энгийн уриагаар шийдэгдэхгүй сонголтын өмнө тавьж байна. Зөвхөн хувь хүний татгалзал дээр найддаг хүн түүний нөлөөг хэтрүүлж, бүтцийн өөрчлөлт хийх ёстой хүмүүсийг нэгэн зэрэг чөлөөлдөг. Хувь хүний хариуцлага, улс төрийн чиглэл тогтоох хоёрын харилцан үйлчлэл зайлшгүй шаардлагатай.',
    question: 'Илтгэгчийн санал болгож буй шийдэл юу вэ?', choices: ['Зөвхөн хувь хүний татгалзал', 'Хувь хүн ба улс төрийн арга хэмжээний хослол', 'Юу ч хийхгүй байх'], correctIndex: 1 },
  { id: 404, level: 'C2', topic: 'Подкаст', title: 'Essay zum Hören: Zeit', titleMn: 'Сонсох эссэ: цаг хугацаа',
    audioText: 'Wir klagen ständig über Zeitmangel, als sei die Zeit uns abhandengekommen. Dabei haben wir nicht weniger Zeit als frühere Generationen, sondern füllen sie nur dichter. Vielleicht bestünde wahrer Luxus heute nicht im Besitz, sondern in der Fähigkeit, eine Stunde verstreichen zu lassen, ohne sie nutzen zu müssen.',
    transcriptMn: 'Бид цаг хугацаа биднээс алга болсон мэт цаг дутагдлын талаар байнга гомдоллодог. Гэтэл бид өмнөх үеийнхнээс цаг бага байгаа биш, зүгээр л илүү нягтаар дүүргэдэг. Магадгүй өнөөдрийн жинхэнэ тансаглал эзэмшихэд биш, харин нэг цагийг ашиглах шаардлагагүйгээр өнгөрөөх чадварт оршдог байх.',
    question: 'Зохиогчийн хэлснээр жинхэнэ тансаглал юунд оршино вэ?', choices: ['Илүү их эд хөрөнгөнд', 'Цагийг ашиглалгүй өнгөрөөх чадварт', 'Илүү хурдан ажиллахад'], correctIndex: 1 },
  { id: 405, level: 'C2', topic: 'Тайлбар', title: 'Kommentar: Erinnerung', titleMn: 'Тайлбар: дурсамж',
    audioText: 'Eine Gesellschaft, die ihre Geschichte verdrängt, ist dazu verurteilt, deren Fehler zu wiederholen. Erinnerung ist kein Blick zurück um seiner selbst willen, sondern eine Verpflichtung gegenüber der Zukunft. Gerade die unbequemen Kapitel der Vergangenheit verdienen es, wachgehalten zu werden, denn aus ihnen erwächst die Mahnung, wachsam zu bleiben.',
    transcriptMn: 'Түүхээ дарангуйлдаг нийгэм түүний алдааг давтахаар яллагдсан байдаг. Дурсамж нь зөвхөн өөрийнхөө төлөө хойшоо харах биш, харин ирээдүйн өмнө хүлээх үүрэг юм. Яг өнгөрсний эвгүй бүлгүүд сэрүүн хадгалагдах ёстой, учир нь тэдгээрээс сонор сэрэмжтэй байх сэрэмжлүүлэг ургадаг.',
    question: 'Зохиогчийн хэлснээр дурсамж юу вэ?', choices: ['Зүгээр л хойшоо харах', 'Ирээдүйн өмнө хүлээх үүрэг', 'Шаардлагагүй зүйл'], correctIndex: 1 },
];

const C2_WRITING: WritingItem[] = [
  { id: 401, level: 'C2', topic: 'Эссэ', title: 'Essayistische Erörterung', titleMn: 'Эссе маягийн өгүүлэл',
    prompt: '"Хувь хүний эрх чөлөө ба нийтийн сайн сайхан хоёрын хооронд тэнцвэр хэрхэн олох вэ?" сэдвээр өгүүлэл бич.',
    points: ['Асуудлыг нарийн томьёол', 'Эсрэг тэсрэг үзлийг сөргүүлэн тавь', 'Боловсронгуй дүгнэлт'],
    modelAnswer: 'Nur wenige Spannungen durchziehen das politische Denken so beharrlich wie jene zwischen individueller Freiheit und Gemeinwohl. Wer die Freiheit verabsolutiert, läuft Gefahr, den Zusammenhalt zu opfern; wer hingegen das Gemeinwohl über alles stellt, ebnet womöglich der Bevormundung den Weg. Eine kluge Gesellschaft wird diese Pole nicht gegeneinander ausspielen, sondern in ein bewegliches Gleichgewicht bringen. Freiheit, die niemandem schadet, bedarf keiner Beschränkung; doch wo individuelles Handeln das Wohl aller gefährdet, ist die Gemeinschaft berechtigt, Grenzen zu ziehen. Letztlich erweist sich die Reife eines Gemeinwesens daran, dass es diese Abwägung immer wieder neu und mit Augenmaß vornimmt.',
    modelMn: 'Хувь хүний эрх чөлөө, нийтийн сайн сайхан хоёрын хоорондох хурцадмал байдал шиг улс төрийн сэтгэлгээг тууштай нэвт шувт өнгөрөх нь цөөн. Эрх чөлөөг үнэмлэхүй болгодог хүн эв нэгдлийг золиослох эрсдэлтэй; харин нийтийн сайн сайхныг бүхнээс дээгүүр тавьдаг хүн асрамжлалд зам нээж болзошгүй. Ухаалаг нийгэм эдгээр туйлыг бие биенийхээ эсрэг тоглуулахгүй, харин хөдөлгөөнт тэнцвэрт оруулна. Хэнд ч хор хүргэхгүй эрх чөлөө хязгаарлалт шаардахгүй; гэвч хувь хүний үйлдэл бүгдийн сайн сайханд аюул учруулдаг газар хамт олон хязгаар тогтоох эрхтэй. Эцэст нь нийгмийн төлөвшил энэ жинлэлтийг дахин дахин шинээр, хэмжүүртэйгээр хийдэгээрээ илэрдэг.' },
  { id: 402, level: 'C2', topic: 'Шүүмж', title: 'Kritische Rezension', titleMn: 'Шүүмжлэлт тойм',
    prompt: 'Уншсан ном эсвэл үзсэн кинондоо нарийн шүүмжлэлт тойм бич (давуу, сул талыг үндэслэлтэй).',
    points: ['Богино танилцуулга', 'Үндэслэлтэй үнэлгээ', 'Тэнцвэртэй дүгнэлт'],
    modelAnswer: 'Selten gelingt es einem Werk, Unterhaltung und Tiefgang so überzeugend zu verbinden. Der Roman besticht durch eine Sprache, die ebenso präzise wie bildreich ist, und durch Figuren, deren Widersprüchlichkeit sie zutiefst menschlich erscheinen lässt. Gleichwohl verliert die Handlung im Mittelteil an Schwung, und manche Nebenstränge wirken eher ausschmückend als notwendig. Diese Schwächen schmälern jedoch das Gesamturteil kaum: Wer bereit ist, sich auf die ruhigeren Passagen einzulassen, wird mit einem Buch belohnt, das lange nachhallt.',
    modelMn: 'Зугаа цэнгэл, гүн агуулгыг ийм итгүүлэхүйцээр хослуулж чаддаг бүтээл ховор. Энэхүү роман нь нарийн бөгөөд дүрслэлээр баялаг хэлээрээ, мөн зөрчилт байдал нь тэднийг гүн гүнзгий хүн төрхтэй мэт харагдуулдаг дүрүүдээрээ татдаг. Гэсэн ч үйл явдал дунд хэсэгтээ хурдаа алдаж, зарим хажуугийн салаа шаардлагатай гэхээсээ илүү чимэглэл мэт санагддаг. Гэвч эдгээр сул тал ерөнхий үнэлгээг бараг бууруулдаггүй: илүү тайван хэсгүүдэд автахад бэлэн хүн удаан цуурайтах номоор шагнагдана.' },
  { id: 403, level: 'C2', topic: 'Захидал', title: 'Offener Brief', titleMn: 'Нээлттэй захидал',
    prompt: 'Орон нутгийнхаа нийтийн тээврийг сайжруулахыг уриалсан нээлттэй захидлыг хотын захиргаанд бич.',
    points: ['Нөхцөл байдлыг үнэмшилтэй дүрсэл', 'Тодорхой шаардлага дэвшүүл', 'Олон нийтэд уриалга'],
    modelAnswer: 'Sehr geehrte Mitglieder des Stadtrats, mit diesem offenen Brief möchten wir, eine Gruppe besorgter Bürgerinnen und Bürger, auf einen Missstand aufmerksam machen, der den Alltag vieler beeinträchtigt. Das öffentliche Verkehrsnetz unserer Stadt ist seit Jahren unterfinanziert: Busse verkehren zu selten, Verbindungen am Abend fehlen gänzlich. Wir fordern Sie nachdrücklich auf, die Taktung zu erhöhen und die Randbezirke besser anzubinden. Eine Stadt, die Mobilität nur den Autobesitzern vorbehält, lässt einen Großteil ihrer Bewohner zurück. Wir appellieren an alle, die diese Sorge teilen, ihre Stimme zu erheben.',
    modelMn: 'Эрхэм хүндэт хотын зөвлөлийн гишүүд ээ, бид санаа зовнисон иргэдийн бүлэг энэхүү нээлттэй захидлаар олны өдөр тутмын амьдралд саад болж буй дутагдалд анхаарал хандуулмаар байна. Манай хотын нийтийн тээврийн сүлжээ олон жил санхүүжилт дутмаг байна: автобус хэт ховор явж, орой холболт огт алга. Бид давтамжийг нэмэгдүүлж, захын дүүргүүдийг илүү сайн холбохыг шаардаж байна. Хөдөлгөөнийг зөвхөн машин эзэмшигчдэд үлдээдэг хот оршин суугчдынхаа ихэнхийг хойш үлдээдэг. Энэ санааг хуваалцагч бүхнийг дуу хоолойгоо өргөхийг уриалж байна.' },
  { id: 404, level: 'C2', topic: 'Эссэ', title: 'Dialektische Erörterung', titleMn: 'Зөрчилдөөнт өгүүлэл',
    prompt: '"Урлаг нийгмийг өөрчилж чадах уу?" сэдвээр зөрчилдөөнт (тезис–антитезис–синтез) өгүүлэл бич.',
    points: ['Тезис', 'Антитезис', 'Нийлмэл синтез'],
    modelAnswer: 'Die Frage, ob Kunst die Gesellschaft zu verändern vermag, wird seit jeher leidenschaftlich diskutiert. Auf der einen Seite hat Kunst zweifellos die Kraft, Missstände sichtbar zu machen und Empathie zu wecken; Romane und Bilder haben Bewegungen inspiriert und Tabus gebrochen. Auf der anderen Seite wäre es naiv, der Kunst unmittelbare politische Wirkung zuzuschreiben — ein Gedicht stürzt keine Regierung. Die Wahrheit liegt vermutlich dazwischen: Kunst verändert nicht die Verhältnisse selbst, wohl aber das Bewusstsein der Menschen, und gerade dieses veränderte Bewusstsein ist die Voraussetzung jedes gesellschaftlichen Wandels. So betrachtet wirkt Kunst nicht trotz, sondern wegen ihrer Indirektheit.',
    modelMn: 'Урлаг нийгмийг өөрчилж чадах эсэх асуулт эртнээс хүсэл тэмүүлэлтэйгээр хэлэлцэгдэж ирсэн. Нэг талаас урлаг дутагдлыг харагдуулж, эмпатийг сэрээх хүчтэй нь эргэлзээгүй; роман, зураг хөдөлгөөнийг урамшуулж, цээрийг эвдсэн. Нөгөө талаас урлагт шууд улс төрийн нөлөө хамааруулах нь гэнэн хэрэг — шүлэг засгийн газрыг унагадаггүй. Үнэн магадгүй хооронд нь оршдог: урлаг нөхцөл байдлыг өөрчилдөггүй ч хүмүүсийн ухамсрыг өөрчилдөг, яг энэ өөрчлөгдсөн ухамсар нь нийгмийн өөрчлөлт бүрийн урьдчилсан нөхцөл юм. Ийнхүү харахад урлаг шууд бус байдлынхаа улмаас биш, харин ачаар нь үйлчилдэг.' },
  { id: 405, level: 'C2', topic: 'Тайлбар', title: 'Pointierter Kommentar', titleMn: 'Хурц тайлбар',
    prompt: '"Бид мэдээллийн эрин үед амьдарч байгаа ч урьдынхаас илүү мунхаг болов уу?" сэдвээр хурц тайлбар бич.',
    points: ['Анхаарал татах эхлэл', 'Үндэслэлтэй байр суурь', 'Сэтгэл хөдөлгөм төгсгөл'],
    modelAnswer: 'Nie war Wissen leichter zugänglich — und selten schien Verständnis ferner. Wir tragen die Bibliotheken der Welt in der Hosentasche und verwechseln doch immer häufiger das Sammeln von Informationen mit dem Verstehen von Zusammenhängen. Das Problem ist nicht der Mangel an Wissen, sondern die Mühe, es zu ordnen, zu prüfen und auszuhalten, dass manche Fragen offenbleiben. Aufklärung bestand nie darin, alles zu wissen, sondern darin, den eigenen Verstand zu gebrauchen. Vielleicht liegt die wahre Herausforderung unserer Zeit also nicht im Zugang zur Information, sondern in der wiederzugewinnenden Kunst, innezuhalten und nachzudenken.',
    modelMn: 'Мэдлэг хэзээ ч ийм амархан хүртээмжтэй байгаагүй — гэтэл ойлголт ховор холуур санагдсан. Бид дэлхийн номын сангуудыг өмднийхөө халаасанд авч явдаг ч мэдээлэл цуглуулахыг учир холбогдлыг ойлгохтой улам бүр андуурдаг. Асуудал нь мэдлэгийн дутагдал биш, харин түүнийг эмх цэгцлэх, шалгах, зарим асуулт нээлттэй үлдэхийг тэвчих хөдөлмөр юм. Гэгээрэл хэзээ ч бүгдийг мэдэхэд биш, харин өөрийн ухаанаа ашиглахад оршдог байсан. Магадгүй бидний цаг үеийн жинхэнэ сорилт мэдээлэлд хүрэхэд биш, харин зогсож эргэцүүлэх дахин эзэмших ёстой урлагт оршдог болов уу.' },
];

const C2_SPEAKING: SpeakingItem[] = [
  { id: 401, level: 'C2', topic: 'Мэтгэлцээн', title: 'Eine kontroverse These', titleMn: 'Маргаантай үзэл',
    prompt: '"Аз жаргал бол үүрэг хариуцлага биш, харин азын хэрэг" гэдэгт нюанстай байр суурь илэрхийл.',
    modelAnswer: 'Die Behauptung, Glück sei reine Glückssache, enthält ein Körnchen Wahrheit, greift aber zu kurz. Gewiss liegen manche Umstände — Gesundheit, Herkunft, Zufälle — außerhalb unserer Kontrolle. Doch zwischen den Ereignissen und unserem Erleben liegt stets unsere Haltung, und diese lässt sich kultivieren. Insofern würde ich sagen: Wir sind nicht für unser Glück verantwortlich, wohl aber für die Bereitschaft, es zu erkennen, wenn es sich zeigt.',
    modelMn: 'Аз жаргал зөвхөн азын хэрэг гэсэн санаа үнэний үр суулгатай ч дутуу. Эрүүл мэнд, гарал үүсэл, санамсаргүй явдал зэрэг зарим нөхцөл бидний хяналтаас гадуур байгаа нь лавтай. Гэвч үйл явдал, бидний мэдрэмжийн хооронд бидний хандлага үргэлж оршдог бөгөөд үүнийг хөгжүүлж болно. Тийм утгаараа би хэлнэ: бид аз жаргалынхаа төлөө хариуцлагатай биш ч илрэх үед нь түүнийг таних бэлэн байдлынхаа төлөө хариуцлагатай.',
    tips: ['… enthält ein Körnchen Wahrheit (… үнэний үртэй)', 'Gewiss …, doch … (Лавтай …, гэвч …)', 'Insofern würde ich sagen … (Тийм утгаараа би … хэлнэ)'] },
  { id: 402, level: 'C2', topic: 'Хийсвэр сэдэв', title: 'Ein abstraktes Thema', titleMn: 'Хийсвэр сэдэв',
    prompt: '"Чимээгүй байдал орчин үеийн нийгэмд ямар үнэ цэнэтэй вэ?" гэдгийг гүнзгий хэлэлц.',
    modelAnswer: 'In einer Welt, die uns pausenlos mit Reizen überflutet, wird Stille zu einem seltenen Gut. Sie ist weit mehr als die bloße Abwesenheit von Lärm; sie ist der Raum, in dem Gedanken reifen und der Mensch zu sich selbst findet. Wer die Stille fürchtet, flieht oft vor den eigenen Fragen. Vielleicht müssen wir das Schweigen neu erlernen, nicht als Leere, sondern als Fülle.',
    modelMn: 'Биднийг тасралтгүй өдөөлтөөр живүүлдэг ертөнцөд чимээгүй байдал ховор баялаг болдог. Энэ нь зүгээр л чимээ шуугианы байхгүй байдлаас хол илүү; энэ нь бодол боловсорч, хүн өөртэйгөө учирдаг орон зай юм. Чимээгүй байдлаас айдаг хүн ихэвчлэн өөрийн асуултаас зугтдаг. Магадгүй бид чимээгүй байдлыг хоосон бус, харин дүүрэн байдал гэж дахин сурах ёстой.',
    tips: ['weit mehr als … (… -аас хол илүү)', 'der Raum, in dem … (… орон зай)', 'nicht als …, sondern als … (… бус, харин … гэж)'] },
  { id: 403, level: 'C2', topic: 'Зуучлал', title: 'Differenziert vermitteln', titleMn: 'Нарийн зуучлах',
    prompt: 'Уламжлалыг хадгалах ба шинэчлэлийн талаар маргаж буй хоёр талыг эвлэрүүл.',
    modelAnswer: 'Ich verstehe das Anliegen beider Seiten und halte den Gegensatz für weniger unversöhnlich, als er scheint. Wer Traditionen bewahren will, sorgt sich um Identität und Kontinuität; wer Erneuerung fordert, sorgt sich um Lebendigkeit und Gerechtigkeit. Beides sind legitime Anliegen. Eine kluge Lösung bewahrt nicht die Form um ihrer selbst willen, sondern den Sinn, der ihr einst zugrunde lag — und erneuert die Form dort, wo sie diesen Sinn verfehlt.',
    modelMn: 'Би хоёр талын санааг ойлгож байгаа бөгөөд эсэргүүцлийг харагдаж байгаагаас бага эвлэршгүй гэж үзэж байна. Уламжлалыг хадгалахыг хүсэгч өвөрмөц байдал, тасралтгүй байдлыг санаа тавьдаг; шинэчлэлийг шаардагч амьд байдал, шударга ёсыг санаа тавьдаг. Хоёулаа зүй ёсны санаа. Ухаалаг шийдэл хэлбэрийг өөрийнх нь төлөө биш, харин нэгэнтээ суурь болсон утгыг хадгалж, утгаа алдсан газар хэлбэрийг шинэчилдэг.',
    tips: ['Ich halte … für weniger … als … (… -аас бага … гэж үзнэ)', 'Beides sind legitime Anliegen', 'um seiner selbst willen (өөрийнх нь төлөө)'] },
  { id: 404, level: 'C2', topic: 'Илтгэл', title: 'Spontan argumentieren', titleMn: 'Шуурхай аргументлах',
    prompt: '"Алдаа гаргах эрх нь суралцахад зайлшгүй" гэдгийг үнэмшилтэйгээр баталж яр.',
    modelAnswer: 'Eine Kultur, die Fehler ächtet, erstickt das Lernen im Keim. Denn jede Entdeckung, jeder Fortschritt setzt die Bereitschaft voraus, sich zu irren und aus dem Irrtum klüger hervorzugehen. Wer aus Angst vor dem Scheitern nichts wagt, scheitert auf die stillste und folgenreichste Weise — nämlich daran, sich nie zu entfalten. Das Recht auf Fehler ist daher kein Zugeständnis an die Schwäche, sondern eine Bedingung des Wachstums.',
    modelMn: 'Алдааг гадуурхдаг соёл суралцахыг нахиа дээр нь боомилдог. Учир нь нээлт, дэвшил бүр эндэх, эндэлээс илүү ухаалаг болж гарах бэлэн байдлыг шаарддаг. Бүтэлгүйтлээс айгаад юунд ч зориглодоггүй хүн хамгийн чимээгүй, хамгийн үр дагавартай байдлаар буюу хэзээ ч задрахгүйгээр бүтэлгүйтдэг. Тиймээс алдах эрх нь сул талд тавьсан буулт биш, харин өсөлтийн нөхцөл юм.',
    tips: ['… im Keim ersticken (нахиа дээр нь боомилох)', 'setzt … voraus (… шаарддаг)', 'kein … , sondern … (… биш, харин …)'] },
  { id: 405, level: 'C2', topic: 'Дүгнэлт', title: 'Eine Bilanz ziehen', titleMn: 'Дүгнэлт хийх',
    prompt: 'Дижитал технологи бидний харилцааг сайжруулсан уу, эсвэл доройтуулсан уу? Нюанстай дүгнэлт гарга.',
    modelAnswer: 'Ob die Digitalisierung unsere Beziehungen bereichert oder verarmt hat, lässt sich nicht mit einem schlichten Urteil beantworten. Zweifellos hat sie Nähe über Distanzen hinweg ermöglicht und Stimmen Gehör verschafft, die früher ungehört blieben. Zugleich aber droht die Fülle der Kontakte die Tiefe zu verdrängen, und ständige Erreichbarkeit ersetzt nicht selten echte Präsenz. Mein Fazit lautet daher: Die Technik ist weder Segen noch Fluch, sondern ein Verstärker dessen, was wir aus ihr machen — sie belohnt die Achtsamen und bestraft die Gedankenlosen.',
    modelMn: 'Дижиталчлал бидний харилцааг баяжуулсан уу, эсвэл ядууруулсан уу гэдгийг энгийн дүгнэлтээр хариулах боломжгүй. Энэ нь зайг үл харгалзан ойр дотно байдлыг бий болгож, өмнө нь сонсогдоогүй дуу хоолойг сонсголд хүргэсэн нь эргэлзээгүй. Гэвч нэгэн зэрэг харилцааны элбэг дэлбэг байдал гүнийг шахах аюултай, байнгын холбогдох боломж жинхэнэ оршихуйг ихэвчлэн орлодоггүй. Тиймээс миний дүгнэлт: технологи ерөөл ч биш, хараал ч биш, харин бид түүнээс юу хийхийн өсгөгч — анхааралтай хүнийг шагнаж, бодлогогүй хүнийг шийтгэдэг.',
    tips: ['lässt sich nicht mit … beantworten (… -аар хариулах боломжгүй)', 'Mein Fazit lautet … (Миний дүгнэлт …)', 'weder … noch … (… ч биш, … ч биш)'] },
];

// =============================================================================
// EXAMS — түвшин бүрийн бүрэн шалгалт
// =============================================================================
export const EXAMS: Record<ExamLevel, LevelExam> = {
  A1: {
    level: 'A1', titleMn: 'Анхан шат', color: 'emerald',
    descriptionMn: 'Энгийн мэндчилгээ, өөрийгөө танилцуулах, өдөр тутмын суурь хэллэг.',
    reading: byLevel(READING_LIBRARY, 'A1'), listening: byLevel(LISTENING_LIBRARY, 'A1'),
    writing: byLevel(WRITING_LIBRARY, 'A1'), speaking: byLevel(SPEAKING_LIBRARY, 'A1'),
  },
  A2: {
    level: 'A2', titleMn: 'Суурь шат', color: 'teal',
    descriptionMn: 'Танил сэдвээр энгийн харилцаа, өнгөрсөн цаг, төлөвлөгөө.',
    reading: byLevel(READING_LIBRARY, 'A2'), listening: byLevel(LISTENING_LIBRARY, 'A2'),
    writing: byLevel(WRITING_LIBRARY, 'A2'), speaking: byLevel(SPEAKING_LIBRARY, 'A2'),
  },
  B1: {
    level: 'B1', titleMn: 'Дунд шат', color: 'sky',
    descriptionMn: 'Санал бодлоо илэрхийлэх, туршлага ярих, илүү урт бичвэр.',
    reading: byLevel(READING_LIBRARY, 'B1'), listening: byLevel(LISTENING_LIBRARY, 'B1'),
    writing: byLevel(WRITING_LIBRARY, 'B1'), speaking: byLevel(SPEAKING_LIBRARY, 'B1'),
  },
  B2: {
    level: 'B2', titleMn: 'Ахисан дунд', color: 'indigo',
    descriptionMn: 'Хийсвэр сэдэв, аргумент дэвшүүлэх, давуу/сул тал жинлэх.',
    reading: B2_READING, listening: B2_LISTENING, writing: B2_WRITING, speaking: B2_SPEAKING,
  },
  C1: {
    level: 'C1', titleMn: 'Ахисан шат', color: 'violet',
    descriptionMn: 'Нарийн төвөгтэй сэдвээр уян хатан, бүтэцтэй илэрхийлэл.',
    reading: C1_READING, listening: C1_LISTENING, writing: C1_WRITING, speaking: C1_SPEAKING,
  },
  C2: {
    level: 'C2', titleMn: 'Чадварлаг шат', color: 'fuchsia',
    descriptionMn: 'Төгөлдөр, нюанстай, эх хэлтэн шиг гүн гүнзгий илэрхийлэл.',
    reading: C2_READING, listening: C2_LISTENING, writing: C2_WRITING, speaking: C2_SPEAKING,
  },
};

export const EXAM_LEVEL_ORDER: ExamLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
