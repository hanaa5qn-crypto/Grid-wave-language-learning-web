// =============================================================================
// Vivid-Lingua — C1 сонсох дасгалын өргөтгөл (Hörverstehen C1)
// -----------------------------------------------------------------------------
// Эрдэм шинжилгээ / сэтгүүл зүйн бүртгэлтэй, эх герман монолог бүхий C1 түвшний
// сонсох дасгалууд. Дасгал бүр TTS хоолойгоор уншигдах 5-6 өгүүлбэртэй, 2
// дэлгэрэнгүй ойлголтын асуулттай (тайлбартай). Id-нууд 641-657, өмнөх бүх
// контенттой мөргөлдөхгүй.
// =============================================================================

import type { ListeningItem } from './library';

export const LISTENING_EXPANSION_C1: ListeningItem[] = [
  {
    id: 641, level: 'C1', topic: 'Лекц',
    title: 'Vortrag: Demografischer Wandel', titleMn: 'Лекц: демографийн өөрчлөлт',
    audioText: 'Meine Damen und Herren, der demografische Wandel wird in der öffentlichen Debatte meist auf ein einziges Schreckensbild reduziert: eine überalterte Gesellschaft, die unter der Last der Renten zusammenbricht. Diese Zuspitzung greift jedoch zu kurz. Zwar steigt der Anteil älterer Menschen unaufhaltsam, gleichwohl wäre es verfehlt, allein die Zahlen zu betrachten. Entscheidend ist vielmehr, ob es uns gelingt, das Erwerbsleben flexibler zu gestalten und die Erfahrung Älterer produktiv zu nutzen. Insofern ist der Wandel weniger ein Naturereignis als eine Gestaltungsaufgabe. Wer ihn bloß verwaltet, verspielt genau jene Chancen, die in ihm verborgen liegen.',
    transcriptMn: 'Эрхэм хүндэт зочид, демографийн өөрчлөлтийг олон нийтийн хэлэлцүүлэгт ихэвчлэн ганц айдаст дүр төрхөд буулгадаг: тэтгэврийн ачаан дор нурах хэт өтөлсөн нийгэм гэж. Гэвч ийм хялбарчлал дутуу дулимаг. Ахмад настны эзлэх хувь зогсолтгүй өсч байгаа нь үнэн боловч зөвхөн тоо баримтыг харах нь буруу байх болно. Харин ажлын амьдралыг илүү уян хатан болгож, ахмадуудын туршлагыг бүтээлчээр ашиглаж чадах эсэх нь шийдвэрлэх ач холбогдолтой. Тийм учраас энэ өөрчлөлт бол байгалийн үзэгдэл гэхээсээ илүү зохион байгуулах даалгавар юм. Түүнийг зөвхөн удирддаг хүн дотор нь нуугдаж буй яг тэр боломжуудыг л алдана.',
    question: 'Илтгэгчийн гол санаа юу вэ?',
    choices: ['Нийгэм тэтгэврийн ачаан дор гарцаагүй нурна', 'Демографийн өөрчлөлт бол зохион байгуулах даалгавар', 'Зөвхөн тоо баримт л шийдвэрлэх ач холбогдолтой'], correctIndex: 1,
    explanation: '"weniger ein Naturereignis als eine Gestaltungsaufgabe" — өөрчлөлт бол байгалийн үзэгдэл биш, зохион байгуулах даалгавар. Нурах тухай санааг илтгэгч "zu kurz" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн гол санаа юу вэ?',
        choices: ['Нийгэм тэтгэврийн ачаан дор гарцаагүй нурна', 'Демографийн өөрчлөлт бол зохион байгуулах даалгавар', 'Зөвхөн тоо баримт л шийдвэрлэх ач холбогдолтой'], correctIndex: 1,
        explanation: '"weniger ein Naturereignis als eine Gestaltungsaufgabe" — өөрчлөлт бол байгалийн үзэгдэл биш, зохион байгуулах даалгавар. Нурах тухай санааг илтгэгч "zu kurz" гэж няцаадаг.',
      },
      {
        question: 'Илтгэгч ахмад настны талаар юу санал болгож байна вэ?',
        choices: ['Тэдний туршлагыг бүтээлчээр ашиглах ёстой', 'Тэднийг эрт тэтгэвэрт гаргах ёстой', 'Тэд нийгэмд зөвхөн ачаа болдог'], correctIndex: 0,
        explanation: '"die Erfahrung Älterer produktiv zu nutzen" — ахмадуудын туршлагыг бүтээлчээр ашиглах нь шийдвэрлэх зүйл гэж хэлж байна.',
      },
    ],
  },
  {
    id: 642, level: 'C1', topic: 'Шинжлэх ухааны нэвтрүүлэг',
    title: 'Wissenschaftsbeitrag: Der Placeboeffekt', titleMn: 'Шинжлэх ухаан: плацебо эффект',
    audioText: 'Der Placeboeffekt gilt vielen als bloße Einbildung, als etwas, das man wegtherapieren müsste. Diese Auffassung verkennt jedoch, was die Forschung inzwischen zeigt. Wenn ein Patient eine wirkstofffreie Tablette erhält und sich dennoch messbar bessert, so ist das keine Selbsttäuschung, sondern Ausdruck realer neurobiologischer Prozesse. Der Körper schüttet tatsächlich schmerzlindernde Botenstoffe aus. Gleichwohl wäre es fahrlässig, daraus zu schließen, Placebos könnten echte Medikamente ersetzen. Entscheidend ist vielmehr die Erkenntnis, dass die Erwartungshaltung selbst ein Wirkfaktor ist – einer, den eine kluge Medizin nicht bekämpfen, sondern bewusst mitbedenken sollte.',
    transcriptMn: 'Плацебо эффектийг олон хүн зүгээр л хий хоосон төсөөлөл, эмчилж арилгах ёстой зүйл гэж үздэг. Гэвч энэ ойлголт судалгаанаас харагдаж буй зүйлийг үл ойшоодог. Идэвхт бодисгүй шахмал уусан өвчтөн хэмжигдэхүйц сайжирвал энэ нь өөрийгөө хуурч буй хэрэг биш, харин бодит мэдрэл-биологийн үйл явцын илрэл юм. Бие махбодь үнэхээр өвдөлт намдаах бодис ялгаруулдаг. Гэсэн хэдий ч эндээс плацебо жинхэнэ эмийг орлож чадна гэж дүгнэх нь хайхрамжгүй хэрэг болно. Харин хүлээлт өөрөө эмчилгээний хүчин зүйл бөгөөд ухаалаг анагаах ухаан үүнтэй тэмцэх бус, харин ухамсартайгаар тооцох ёстой гэдгийг ойлгох нь шийдвэрлэх юм.',
    question: 'Илтгэгчийн эцсийн дүгнэлт юу вэ?',
    choices: ['Плацебо жинхэнэ эмийг орлож чадна', 'Плацебо бол зүгээр л хий хоосон төсөөлөл', 'Хүлээлт өөрөө эмчилгээний хүчин зүйл бөгөөд түүнийг ухамсартай тооцох ёстой'], correctIndex: 2,
    explanation: '"die Erwartungshaltung selbst ein Wirkfaktor ist" — хүлээлт өөрөө эмчилгээний хүчин зүйл. Эмийг орлоно гэх санааг илтгэгч "fahrlässig" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн эцсийн дүгнэлт юу вэ?',
        choices: ['Плацебо жинхэнэ эмийг орлож чадна', 'Плацебо бол зүгээр л хий хоосон төсөөлөл', 'Хүлээлт өөрөө эмчилгээний хүчин зүйл бөгөөд түүнийг ухамсартай тооцох ёстой'], correctIndex: 2,
        explanation: '"die Erwartungshaltung selbst ein Wirkfaktor ist" — хүлээлт өөрөө эмчилгээний хүчин зүйл. Эмийг орлоно гэх санааг илтгэгч "fahrlässig" гэж няцаадаг.',
      },
      {
        question: 'Плацебо авсан өвчтөний биед юу тохиолддог вэ?',
        choices: ['Юу ч өөрчлөгддөггүй', 'Бие махбодь өвдөлт намдаах бодис ялгаруулдаг', 'Өвчин нь заавал дорддог'], correctIndex: 1,
        explanation: '"Der Körper schüttet tatsächlich schmerzlindernde Botenstoffe aus" — бие махбодь үнэхээр өвдөлт намдаах бодис ялгаруулдаг.',
      },
    ],
  },
  {
    id: 643, level: 'C1', topic: 'Подкаст',
    title: 'Podcast: Musik und Gehirn', titleMn: 'Подкаст: хөгжим ба тархи',
    audioText: 'Musik wird oft als reine Unterhaltung abgetan, als angenehmes Beiwerk ohne tiefere Wirkung. Die Hirnforschung zeichnet jedoch ein anderes Bild. Beim Hören wie beim Musizieren werden nahezu alle Areale gleichzeitig aktiviert – Bewegung, Gedächtnis und Emotion greifen ineinander. Besonders bemerkenswert ist, dass aktives Musizieren die Verknüpfung beider Hirnhälften nachweislich stärkt. Gleichwohl sollte man vorschnelle Versprechen meiden: Wer sein Kind zum Instrument drängt, macht es nicht automatisch klüger. Entscheidend ist nicht der Nutzen für andere Fächer, sondern dass Musik dem Gehirn eine Komplexität abverlangt, die kaum eine andere Tätigkeit erreicht.',
    transcriptMn: 'Хөгжмийг ихэвчлэн зүгээр л зугаа цэнгэл, гүн нөлөөгүй тааламжтай чимэглэл гэж үгүйсгэдэг. Гэвч тархи судлал өөр дүр зургийг үзүүлдэг. Сонсох болон хөгжим тоглох үед бараг бүх бүсүүд нэгэн зэрэг идэвхждэг — хөдөлгөөн, ой санамж, сэтгэл хөдлөл хоорондоо уялдана. Ялангуяа идэвхтэй хөгжим тоглох нь тархины хоёр хагасын хоорондын холболтыг батлагдсанаар бэхжүүлдэг нь анхаарал татдаг. Гэсэн хэдий ч яаран амлалт өгөхөөс зайлсхийх хэрэгтэй: хүүхдээ хөгжмийн зэмсэг рүү тулгасан хүн түүнийг автоматаар ухаантай болгодоггүй. Гол нь бусад хичээлд ашигтай эсэх биш, харин хөгжим тархинд өөр аль ч үйл ажиллагаа хүрч чаддаггүй нарийн төвөгтэй ачаалал өгдөгт оршино.',
    question: 'Илтгэгч хөгжмийн үнэ цэнийг юунд гэж үзэж байна вэ?',
    choices: ['Тархинд онцгой нарийн төвөгтэй ачаалал өгдөгт', 'Хүүхдийг автоматаар ухаантай болгодогт', 'Зүгээр л таатай зугаа цэнгэл болдогт'], correctIndex: 0,
    explanation: '"dass Musik dem Gehirn eine Komplexität abverlangt, die kaum eine andere Tätigkeit erreicht" — гол нь хөгжим тархинд онцгой нарийн ачаалал өгдөгт. Ухаантай болгоно гэх санааг илтгэгч няцаадаг.',
    questions: [
      {
        question: 'Илтгэгч хөгжмийн үнэ цэнийг юунд гэж үзэж байна вэ?',
        choices: ['Тархинд онцгой нарийн төвөгтэй ачаалал өгдөгт', 'Хүүхдийг автоматаар ухаантай болгодогт', 'Зүгээр л таатай зугаа цэнгэл болдогт'], correctIndex: 0,
        explanation: '"dass Musik dem Gehirn eine Komplexität abverlangt, die kaum eine andere Tätigkeit erreicht" — гол нь хөгжим тархинд онцгой нарийн ачаалал өгдөгт. Ухаантай болгоно гэх санааг илтгэгч няцаадаг.',
      },
      {
        question: 'Идэвхтэй хөгжим тоглох нь юуг бэхжүүлдэг вэ?',
        choices: ['Зөвхөн сонсголыг', 'Зөвхөн булчингийн хүчийг', 'Тархины хоёр хагасын хоорондын холболтыг'], correctIndex: 2,
        explanation: '"die Verknüpfung beider Hirnhälften nachweislich stärkt" — тархины хоёр хагасын хоорондын холболтыг бэхжүүлдэг.',
      },
    ],
  },
  {
    id: 644, level: 'C1', topic: 'Ярилцлага',
    title: 'Interview: Verhaltensökonomie', titleMn: 'Ярилцлага: зан үйлийн эдийн засаг',
    audioText: 'Man hat lange angenommen, der Mensch entscheide durchweg rational, stets zu seinem eigenen Vorteil. Die Verhaltensökonomie hat dieses Bild gründlich erschüttert. Unsere Entscheidungen hängen weit stärker vom Kontext ab, als uns lieb ist: Schon die Art, wie eine Wahl präsentiert wird, verschiebt das Ergebnis. Das heißt aber keineswegs, dass wir hilflos manipulierbar wären. Vielmehr eröffnet dieses Wissen die Möglichkeit, Entscheidungsumgebungen so zu gestalten, dass sie kluges Handeln erleichtern. Wenngleich Kritiker darin Bevormundung wittern, sehe ich vor allem eine Chance – vorausgesetzt, die Ziele bleiben transparent.',
    transcriptMn: 'Хүн үргэлж оновчтой, өөрийн ашиг сонирхлын үүднээс шийдвэр гаргадаг гэж удаан хугацаанд үздэг байсан. Зан үйлийн эдийн засаг энэ дүр зургийг үндсээр нь ганхуулсан. Бидний шийдвэр өөрсдийн хүсснээс хамаагүй илүү нөхцөл байдлаас хамаардаг: сонголтыг хэрхэн танилцуулж байгаа нь өөрөө үр дүнг өөрчилдөг. Гэхдээ энэ нь бид арга буюу удирдлагагүй хохирогч гэсэн үг огтхон ч биш. Харин ч энэ мэдлэг оновчтой үйлдлийг хөнгөвчлөх шийдвэрийн орчныг бүтээх боломжийг нээж өгдөг. Шүүмжлэгчид үүнийг захирангуйлал гэж сэжиглэдэг ч би юуны түрүүнд боломж гэж хардаг — зорилго нь ил тод байх нөхцөлд.',
    question: 'Ярилцагчийн үзэж буйгаар зан үйлийн эдийн засгийн мэдлэг юуг өгдөг вэ?',
    choices: ['Хүн бол арга буюу удирдлагагүй хохирогч гэдгийг', 'Оновчтой үйлдлийг хөнгөвчлөх шийдвэрийн орчин бүтээх боломжийг', 'Хүн үргэлж бүрэн оновчтой шийддэг гэдгийг'], correctIndex: 1,
    explanation: '"eröffnet dieses Wissen die Möglichkeit, Entscheidungsumgebungen so zu gestalten" — оновчтой үйлдлийг хөнгөвчлөх орчин бүтээх боломж. "hilflos manipulierbar" гэх санааг ярилцагч няцаадаг.',
    questions: [
      {
        question: 'Ярилцагчийн үзэж буйгаар зан үйлийн эдийн засгийн мэдлэг юуг өгдөг вэ?',
        choices: ['Хүн бол арга буюу удирдлагагүй хохирогч гэдгийг', 'Оновчтой үйлдлийг хөнгөвчлөх шийдвэрийн орчин бүтээх боломжийг', 'Хүн үргэлж бүрэн оновчтой шийддэг гэдгийг'], correctIndex: 1,
        explanation: '"eröffnet dieses Wissen die Möglichkeit, Entscheidungsumgebungen so zu gestalten" — оновчтой үйлдлийг хөнгөвчлөх орчин бүтээх боломж. "hilflos manipulierbar" гэх санааг ярилцагч няцаадаг.',
      },
      {
        question: 'Ярилцагч шийдвэрийн орчныг бүтээхэд ямар болзол тавьж байна вэ?',
        choices: ['Зорилго нь ил тод байх ёстой', 'Хэрэглэгчид энэ талаар мэдэх ёсгүй', 'Төр бүрэн хяналтдаа авах ёстой'], correctIndex: 0,
        explanation: '"vorausgesetzt, die Ziele bleiben transparent" — зорилго нь ил тод үлдэх нөхцөлд гэж болзол тавьж байна.',
      },
    ],
  },
  {
    id: 645, level: 'C1', topic: 'Лекц',
    title: 'Vortrag: Bionik', titleMn: 'Лекц: бионик',
    audioText: 'Die Bionik, also das Lernen von der Natur für die Technik, wird gern mit spektakulären Einzelbeispielen bebildert – dem Klettverschluss nach dem Vorbild der Klette etwa. So eingängig solche Geschichten sind, so sehr verstellen sie den Blick auf das Wesentliche. Denn die Natur liefert keine fertigen Baupläne zum Abkupfern. Ihre Lösungen sind über Jahrmillionen an ganz bestimmte Bedingungen angepasst und lassen sich selten unmittelbar übertragen. Entscheidend ist daher nicht das Nachahmen einer Form, sondern das Verstehen des zugrunde liegenden Prinzips. Wer das begreift, gewinnt weit mehr als eine clevere Erfindung – nämlich eine ganze Denkweise.',
    transcriptMn: 'Бионик буюу техникийн төлөө байгалиас суралцах ухааныг ихэвчлэн гайхалтай ганц жишээгээр дүрсэлдэг — тухайлбал өргөст ургамлын жишгээр бүтээсэн наалт зэрэг. Ийм түүх амархан ойлгогддог хэдий ч чухал зүйлийг харах харцыг халхалдаг. Учир нь байгаль хуулбарлах бэлэн зураг өгдөггүй. Түүний шийдлүүд сая сая жилийн турш тодорхой нөхцөлд дасан зохицсон бөгөөд шууд шилжүүлэхэд ховор тохирдог. Тийм учраас хэлбэрийг дуурайх биш, харин үндэс дэх зарчмыг ойлгох нь шийдвэрлэх ач холбогдолтой. Үүнийг ухаарсан хүн ухаалаг нэг зохион бүтээлээс хамаагүй илүү зүйлийг — бүхэл бүтэн сэтгэлгээний хэв маягийг олж авдаг.',
    question: 'Илтгэгчийн үзэж буйгаар бионикийн гол нь юу вэ?',
    choices: ['Байгалийн хэлбэрийг шууд хуулбарлах', 'Гайхалтай ганц жишээ олох', 'Үндэс дэх зарчмыг ойлгох'], correctIndex: 2,
    explanation: '"das Verstehen des zugrunde liegenden Prinzips" — үндэс дэх зарчмыг ойлгох нь гол. Хэлбэрийг дуурайх санааг илтгэгч "nicht das Nachahmen einer Form" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн үзэж буйгаар бионикийн гол нь юу вэ?',
        choices: ['Байгалийн хэлбэрийг шууд хуулбарлах', 'Гайхалтай ганц жишээ олох', 'Үндэс дэх зарчмыг ойлгох'], correctIndex: 2,
        explanation: '"das Verstehen des zugrunde liegenden Prinzips" — үндэс дэх зарчмыг ойлгох нь гол. Хэлбэрийг дуурайх санааг илтгэгч "nicht das Nachahmen einer Form" гэж няцаадаг.',
      },
      {
        question: 'Илтгэгч байгалийн шийдлүүдийн талаар юу гэж хэлэв?',
        choices: ['Тэдгээрийг ямар ч бэрхшээлгүй шууд хуулж болдог', 'Тэдгээр нь тодорхой нөхцөлд сая сая жилээр дасан зохицсон тул шууд шилжүүлэхэд ховор тохирдог', 'Тэдгээр нь техникт огт хэрэггүй'], correctIndex: 1,
        explanation: '"über Jahrmillionen an ganz bestimmte Bedingungen angepasst und lassen sich selten unmittelbar übertragen" — тодорхой нөхцөлд дасан зохицсон тул шууд шилжүүлэхэд ховор тохирдог.',
      },
    ],
  },
  {
    id: 646, level: 'C1', topic: 'Нэвтрүүлэг',
    title: 'Radiofeature: Citizen Science', titleMn: 'Нэвтрүүлэг: иргэдийн шинжлэх ухаан',
    audioText: 'Citizen Science, die Beteiligung von Laien an echter Forschung, wird häufig als nettes Freizeitvergnügen belächelt – Vogelzählen für Hobbynaturkundler. Diese herablassende Sicht wird der Sache nicht gerecht. Tausende Freiwillige liefern Datenmengen, die kein Forschungsinstitut allein je erheben könnte, über riesige Flächen und lange Zeiträume hinweg. Gleichwohl wäre es naiv, darin ein Allheilmittel zu sehen. Ohne sorgfältige Schulung und methodische Kontrolle bleiben die Daten wertlos. Insofern ersetzt Bürgerforschung die Wissenschaft nicht, sondern erweitert ihre Reichweite. Ihr eigentlicher Gewinn liegt vielleicht weniger in den Daten als darin, dass Menschen wieder genauer hinsehen lernen.',
    transcriptMn: 'Иргэдийн шинжлэх ухаан буюу энгийн хүмүүсийг жинхэнэ судалгаанд оролцуулахыг ихэвчлэн эрхэм чөлөөт цагийн зугаа гэж дооглон инээдэг — сонирхогч байгаль судлаачдын шувуу тоолол гэх мэтээр. Гэвч ийм дээрэлхүү харц уг хэргийг зөв тусгадаггүй. Мянга мянган сайн дурынхан ямар ч эрдэм шинжилгээний хүрээлэн ганцаараа хэзээ ч цуглуулж чадахгүй хэмжээний өгөгдлийг асар том нутаг дэвсгэр, урт хугацаагаар нийлүүлдэг. Гэсэн хэдий ч үүнийг бүх өвчний эм гэж харах нь гэнэн хэрэг. Сайтар сургалт, аргачлалын хяналтгүйгээр өгөгдөл үнэ цэнэгүй хэвээр үлддэг. Тийм учраас иргэдийн судалгаа шинжлэх ухааныг орлодоггүй, харин хүрээг нь өргөжүүлдэг. Түүний жинхэнэ ашиг тус магадгүй өгөгдөлд бус, харин хүмүүс дахин анхааралтай ажиглаж сурдагт оршино.',
    question: 'Илтгэгчийн үзэж буйгаар иргэдийн шинжлэх ухааны жинхэнэ ашиг тус юунд оршиж болох вэ?',
    choices: ['Хүмүүс дахин анхааралтай ажиглаж сурдагт', 'Эрдэм шинжилгээний хүрээлэнг бүрэн орлодогт', 'Юунаас ч илүү хямд өртөгтэйд'], correctIndex: 0,
    explanation: '"dass Menschen wieder genauer hinsehen lernen" — хүмүүс дахин анхааралтай ажиглаж сурдагт. Хүрээлэнг орлоно гэх санааг илтгэгч "ersetzt … nicht" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн үзэж буйгаар иргэдийн шинжлэх ухааны жинхэнэ ашиг тус юунд оршиж болох вэ?',
        choices: ['Хүмүүс дахин анхааралтай ажиглаж сурдагт', 'Эрдэм шинжилгээний хүрээлэнг бүрэн орлодогт', 'Юунаас ч илүү хямд өртөгтэйд'], correctIndex: 0,
        explanation: '"dass Menschen wieder genauer hinsehen lernen" — хүмүүс дахин анхааралтай ажиглаж сурдагт. Хүрээлэнг орлоно гэх санааг илтгэгч "ersetzt … nicht" гэж няцаадаг.',
      },
      {
        question: 'Илтгэгчийн хэлснээр өгөгдөл ямар нөхцөлд үнэ цэнэтэй байх вэ?',
        choices: ['Аль болох олон хүн оролцвол', 'Зөвхөн мэргэжлийн эрдэмтэн цуглуулбал', 'Сайтар сургалт, аргачлалын хяналт байвал'], correctIndex: 2,
        explanation: '"Ohne sorgfältige Schulung und methodische Kontrolle bleiben die Daten wertlos" — сургалт, аргачлалын хяналтгүйгээр өгөгдөл үнэ цэнэгүй болдог.',
      },
    ],
  },
  {
    id: 647, level: 'C1', topic: 'Хэлэлцүүлэг',
    title: 'Diskussion: Museen der Zukunft', titleMn: 'Хэлэлцүүлэг: ирээдүйн музей',
    audioText: 'In der Diskussion um das Museum der Zukunft prallen zwei Lager aufeinander. Die einen fordern immer mehr digitale Spektakel, interaktive Bildschirme, virtuelle Rundgänge; die anderen beschwören das Original und warnen vor der Verwandlung des Museums in einen Vergnügungspark. Beide Positionen enthalten Wahres und verfehlen doch den Kern. Denn Technik ist niemals Selbstzweck. Ein Bildschirm, der nur blinkt, lenkt eher ab, als dass er erschließt. Entscheidend bleibt die Frage, ob eine Anwendung dem Verstehen dient. Insofern misst sich das Museum der Zukunft nicht an seiner technischen Ausstattung, sondern daran, ob es Menschen zum Nachdenken bewegt.',
    transcriptMn: 'Ирээдүйн музейн тухай хэлэлцүүлэгт хоёр хуаран мөргөлддөг. Заримынх нь улам олон дижитал үзвэр, интерактив дэлгэц, виртуал аялал шаарддаг; нөгөөх нь эх бүтээлийг тахин шүтэж, музейг зугаа цэнгээний парк болгон хувиргахаас сэрэмжлүүлдэг. Хоёр байр суурь тус бүр үнэн зүйлтэй ч гол цөмийг нь алдаж байна. Учир нь техник хэзээ ч өөрөө зорилго болдоггүй. Зөвхөн анивчдаг дэлгэц ойлгуулахаас илүү анхаарлыг сарниулдаг. Тухайн хэрэглээ ойлголтод үйлчилдэг эсэх нь л шийдвэрлэх асуулт хэвээр үлддэг. Тийм учраас ирээдүйн музейг техникийн тоноглолоор нь бус, харин хүмүүсийг эргэцүүлэн бодоход хүргэж чадаж буй эсэхээр нь хэмждэг.',
    question: 'Илтгэгчийн үзэж буйгаар ирээдүйн музейг юугаар хэмжих вэ?',
    choices: ['Дэлгэц, технологийн тоноглолын түвшингээр', 'Хүмүүсийг эргэцүүлэн бодоход хүргэж чадаж буй эсэхээр', 'Зочдын тоогоор'], correctIndex: 1,
    explanation: '"ob es Menschen zum Nachdenken bewegt" — хүмүүсийг эргэцүүлэн бодоход хүргэж чадаж буй эсэхээр хэмждэг. Техникийн тоноглол гэх санааг "nicht an seiner technischen Ausstattung" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн үзэж буйгаар ирээдүйн музейг юугаар хэмжих вэ?',
        choices: ['Дэлгэц, технологийн тоноглолын түвшингээр', 'Хүмүүсийг эргэцүүлэн бодоход хүргэж чадаж буй эсэхээр', 'Зочдын тоогоор'], correctIndex: 1,
        explanation: '"ob es Menschen zum Nachdenken bewegt" — хүмүүсийг эргэцүүлэн бодоход хүргэж чадаж буй эсэхээр хэмждэг. Техникийн тоноглол гэх санааг "nicht an seiner technischen Ausstattung" гэж няцаадаг.',
      },
      {
        question: 'Зөвхөн анивчдаг дэлгэцийн талаар илтгэгч юу гэж хэлэв?',
        choices: ['Ойлгуулахаас илүү анхаарлыг сарниулдаг', 'Үзэгчдийг үргэлж татдаг', 'Музейд заавал шаардлагатай'], correctIndex: 0,
        explanation: '"Ein Bildschirm, der nur blinkt, lenkt eher ab, als dass er erschließt" — зөвхөн анивчдаг дэлгэц ойлгуулахаас илүү анхаарлыг сарниулдаг.',
      },
    ],
  },
  {
    id: 648, level: 'C1', topic: 'Репортаж',
    title: 'Reportage: Pendeln und Lebensqualität', titleMn: 'Репортаж: ажилдаа зорчих ба амьдралын чанар',
    audioText: 'Wer täglich weit zur Arbeit pendelt, nimmt das meist als notwendiges Übel hin, als Preis für ein günstigeres Zuhause im Grünen. Die Forschung zeichnet ein ernüchterndes Bild. Lange Arbeitswege gehen erwiesenermaßen mit mehr Stress, schlechterem Schlaf und geringerer Lebenszufriedenheit einher – und zwar dauerhaft, ohne dass man sich daran gewöhnt. Bemerkenswert ist, dass viele den finanziellen Vorteil des billigeren Wohnorts durch Fahrtkosten und verlorene Zeit letztlich wieder einbüßen. Gleichwohl fällt es schwer, umzusteuern, weil der Nutzen des größeren Hauses sofort sichtbar ist, die Kosten des Pendelns hingegen schleichend wirken.',
    transcriptMn: 'Өдөр бүр ажилдаа хол зорчдог хүн үүнийг ихэвчлэн зайлшгүй муу зүйл, ногоон байгальд байрлах хямд орон сууцны төлөө төлөх үнэ гэж хүлээн зөвшөөрдөг. Гэвч судалгаа сэрэмжлүүлсэн дүр зургийг үзүүлдэг. Урт зам нь илүү их стресс, муу нойр, амьдралын сэтгэл ханамж багатай байдалтай батлагдсанаар хамт явдаг — тэр ч бүү хэл хүн үүнд дасдаггүй бөгөөд байнга үргэлжилдэг. Хямд орон байрны санхүүгийн давуу талыг олон хүн замын зардал, алдсан цагаараа эцэстээ дахин алддаг нь анхаарал татдаг. Гэсэн хэдий ч чиглэлээ өөрчлөх хэцүү, учир нь том байшингийн ашиг тус шууд харагддаг бол зорчилтын зардал аажмаар мэдрэгддэг.',
    question: 'Репортажийн гол дүгнэлт юу вэ?',
    choices: ['Хүмүүс урт замд эцэстээ дасдаг', 'Хол орон сууц үргэлж мөнгө хэмнэдэг', 'Урт зам нь сайн сайхан байдлыг тогтвортой бууруулдаг'], correctIndex: 2,
    explanation: '"mit mehr Stress, schlechterem Schlaf und geringerer Lebenszufriedenheit einher – und zwar dauerhaft" — урт зам сайн сайхан байдлыг тогтвортой бууруулдаг. "ohne dass man sich daran gewöhnt" — хүн дасдаггүй.',
    questions: [
      {
        question: 'Репортажийн гол дүгнэлт юу вэ?',
        choices: ['Хүмүүс урт замд эцэстээ дасдаг', 'Хол орон сууц үргэлж мөнгө хэмнэдэг', 'Урт зам нь сайн сайхан байдлыг тогтвортой бууруулдаг'], correctIndex: 2,
        explanation: '"mit mehr Stress, schlechterem Schlaf und geringerer Lebenszufriedenheit einher – und zwar dauerhaft" — урт зам сайн сайхан байдлыг тогтвортой бууруулдаг. "ohne dass man sich daran gewöhnt" — хүн дасдаггүй.',
      },
      {
        question: 'Хямд орон сууцны санхүүгийн давуу талын талаар юу хэлэв?',
        choices: ['Тэр нь цаг хугацаа өнгөрөх тусам нэмэгддэг', 'Замын зардал, алдсан цагаар ихэнхдээ дахин алга болдог', 'Тэр нь огт байдаггүй'], correctIndex: 1,
        explanation: '"den finanziellen Vorteil … durch Fahrtkosten und verlorene Zeit letztlich wieder einbüßen" — санхүүгийн давуу талаа замын зардал, алдсан цагаар дахин алддаг.',
      },
    ],
  },
  {
    id: 649, level: 'C1', topic: 'Тайлбар',
    title: 'Kommentar: Bürgerbeteiligung in Kommunen', titleMn: 'Тайлбар: орон нутгийн иргэдийн оролцоо',
    audioText: 'Bürgerbeteiligung gilt heute als Zauberwort der Kommunalpolitik. Kaum ein Bauvorhaben, das nicht von Workshops und Anhörungen begleitet würde. Grundsätzlich ist das begrüßenswert. Und doch beschleicht mich ein Unbehagen. Zu oft dient Beteiligung nur der Beruhigung, als demokratisches Feigenblatt für längst gefällte Entscheidungen. Wer Menschen um ihre Meinung bittet, sie dann aber folgenlos verhallen lässt, richtet mehr Schaden an als jemand, der gar nicht erst fragt – denn er nährt Zynismus. Echte Beteiligung erkennt man nicht an der Zahl der Veranstaltungen, sondern daran, ob sie das Ergebnis tatsächlich verändern kann.',
    transcriptMn: 'Иргэдийн оролцоо өнөөдөр орон нутгийн улс төрийн шидэт үг болжээ. Семинар, сонсголоор дагалддаггүй барилгын төсөл бараг байхгүй. Зарчмын хувьд энэ нь сайшаалтай. Гэсэн ч намайг эвгүй мэдрэмж эзэмддэг. Оролцоо хэт олон удаа зөвхөн тайвшруулах зорилготой, аль эрт гаргачихсан шийдвэрийн ардчилсан халхавч болдог. Хүмүүсээс санал асуугаад, дараа нь түүнийг үр дагваргүй сарнихад орхидог хүн огт асуудаггүй хүнээс илүү их хор хөнөөл учруулдаг — учир нь тэрбээр итгэлгүй үзлийг тэжээдэг. Жинхэнэ оролцоог арга хэмжээний тоогоор бус, харин үр дүнг үнэхээр өөрчилж чадах эсэхээр танидаг.',
    question: 'Тайлбарлагчийн үзэж буйгаар жинхэнэ оролцоог юугаар танидаг вэ?',
    choices: ['Үр дүнг үнэхээр өөрчилж чадах эсэхээр', 'Семинар, сонсголын тоогоор', 'Оролцогчдын тоогоор'], correctIndex: 0,
    explanation: '"ob sie das Ergebnis tatsächlich verändern kann" — жинхэнэ оролцоог үр дүнг үнэхээр өөрчилж чадах эсэхээр танидаг. Арга хэмжээний тоо гэх санааг "nicht an der Zahl der Veranstaltungen" гэж няцаадаг.',
    questions: [
      {
        question: 'Тайлбарлагчийн үзэж буйгаар жинхэнэ оролцоог юугаар танидаг вэ?',
        choices: ['Үр дүнг үнэхээр өөрчилж чадах эсэхээр', 'Семинар, сонсголын тоогоор', 'Оролцогчдын тоогоор'], correctIndex: 0,
        explanation: '"ob sie das Ergebnis tatsächlich verändern kann" — жинхэнэ оролцоог үр дүнг үнэхээр өөрчилж чадах эсэхээр танидаг. Арга хэмжээний тоо гэх санааг "nicht an der Zahl der Veranstaltungen" гэж няцаадаг.',
      },
      {
        question: 'Тайлбарлагч ямар оролцоог хамгийн хортой гэж үзэж байна вэ?',
        choices: ['Иргэдээс огт санал асуухгүй байх', 'Хэт олон семинар зохион байгуулах', 'Асуугаад дараа нь үр дагваргүй орхих'], correctIndex: 2,
        explanation: '"folgenlos verhallen lässt, richtet mehr Schaden an als jemand, der gar nicht erst fragt" — асуугаад үр дагваргүй орхих нь огт асуухгүй байхаас илүү хортой.',
      },
    ],
  },
  {
    id: 650, level: 'C1', topic: 'Лекц',
    title: 'Vortrag: Lesen im digitalen Zeitalter', titleMn: 'Лекц: дижитал эрин дэх уншлага',
    audioText: 'Die Klage über den Niedergang des Lesens ist so alt wie das Fernsehen. Heute richtet sie sich gegen das Smartphone. Doch die Behauptung, wir läsen weniger, trifft schlicht nicht zu: Nie zuvor haben Menschen so viel Text verarbeitet wie heute. Verändert hat sich nicht die Menge, sondern die Art. Das Auge huscht, überfliegt, springt von Reiz zu Reiz. Was dabei verkümmert, ist das vertiefte, lineare Lesen, das Gedankengänge über Seiten hinweg verfolgt. Entscheidend ist daher nicht, ob wir lesen, sondern ob wir das langsame, konzentrierte Lesen als Fähigkeit bewusst pflegen, statt es dem Zufall zu überlassen.',
    transcriptMn: 'Уншлага доройтож байгаа тухай гомдол телевизтэй чацуу хуучирсан. Өнөөдөр энэ нь ухаалаг гар утасны эсрэг чиглэдэг. Гэвч бид бага уншдаг болсон гэх мэдэгдэл огт үнэн биш: хүн төрөлхтөн өнөөдрийнх шиг их текст боловсруулж байсангүй. Хэмжээ нь бус, харин арга барил нь өөрчлөгдсөн. Нүд гүйлгэн, түргэн харж, өдөөлтөөс өдөөлт рүү үсэрдэг. Ингэхэд сульдан доройтдог зүйл бол хуудсаар дамжин бодлын урсгалыг дагадаг гүнзгий, шугаман уншлага юм. Тийм учраас бид уншиж байгаа эсэх нь бус, харин удаан, төвлөрсөн уншлагыг санамсаргүй байдалд орхихын оронд чадвар болгон ухамсартай хөгжүүлж байгаа эсэх нь шийдвэрлэх ач холбогдолтой.',
    question: 'Илтгэгчийн гол санаа юу вэ?',
    choices: ['Бид өмнөхөөс бага уншдаг болсон', 'Удаан, төвлөрсөн уншлагыг ухамсартай хөгжүүлэх нь чухал', 'Ухаалаг утас уншлагыг бүрэн устгасан'], correctIndex: 1,
    explanation: '"ob wir das langsame, konzentrierte Lesen als Fähigkeit bewusst pflegen" — удаан, төвлөрсөн уншлагыг ухамсартай хөгжүүлэх нь чухал. Бид бага уншдаг гэх санааг "trifft schlicht nicht zu" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн гол санаа юу вэ?',
        choices: ['Бид өмнөхөөс бага уншдаг болсон', 'Удаан, төвлөрсөн уншлагыг ухамсартай хөгжүүлэх нь чухал', 'Ухаалаг утас уншлагыг бүрэн устгасан'], correctIndex: 1,
        explanation: '"ob wir das langsame, konzentrierte Lesen als Fähigkeit bewusst pflegen" — удаан, төвлөрсөн уншлагыг ухамсартай хөгжүүлэх нь чухал. Бид бага уншдаг гэх санааг "trifft schlicht nicht zu" гэж няцаадаг.',
      },
      {
        question: 'Илтгэгчийн хэлснээр юу өөрчлөгдсөн бэ?',
        choices: ['Уншлагын хэмжээ биш, харин арга барил', 'Уншдаг хүмүүсийн тоо', 'Номын үнэ'], correctIndex: 0,
        explanation: '"Verändert hat sich nicht die Menge, sondern die Art" — хэмжээ биш, харин арга барил өөрчлөгдсөн.',
      },
    ],
  },
  {
    id: 651, level: 'C1', topic: 'Мэдээ',
    title: 'Bericht: Wasserknappheit', titleMn: 'Мэдээ: усны хомсдол',
    audioText: 'Wenn von Wasserknappheit die Rede ist, denken die meisten an ferne Wüstenregionen. Doch auch in wasserreichen Ländern mehren sich in trockenen Sommern die Engpässe. Bemerkenswert ist dabei, dass das Problem selten in der absoluten Menge liegt, sondern in ihrer zeitlichen und räumlichen Verteilung. Es regnet nicht zu wenig, sondern zur falschen Zeit am falschen Ort. Gleichwohl wäre es verkürzt, allein auf den Ausbau von Speichern zu setzen. Ebenso wichtig ist ein sparsamer Umgang – in der Landwirtschaft, die den Löwenanteil verbraucht, weit mehr noch als in den Haushalten, auf die sich die öffentliche Debatte gern konzentriert.',
    transcriptMn: 'Усны хомсдлын тухай ярихад ихэнх хүн алс холын цөлийн бүсийг боддог. Гэвч усаар баялаг орнуудад ч хуурай зун хомсдол нэмэгддэг. Энэ асуудал нийт хэмжээнд ховор оршдог, харин цаг хугацаа, орон зайн хуваарилалтад оршдог нь анхаарал татдаг. Хур тунадас хэт бага бус, харин буруу цагт, буруу газар ордог. Гэсэн хэдий ч зөвхөн усан сан барихад найдах нь дутуу арга болно. Хэмнэлттэй харьцах нь мөн адил чухал — үүнд олон нийтийн хэлэлцүүлэг голдуу анхаардаг гэр ахуйгаас хамаагүй илүү, усны эрхэм хувийг зарцуулдаг хөдөө аж ахуйд илүү анхаарах хэрэгтэй.',
    question: 'Мэдээний гол дүгнэлт юу вэ?',
    choices: ['Хур тунадас хэт бага орж байгаа нь асуудал', 'Зөвхөн усан сан барих нь бүрэн шийдэл', 'Асуудал нь усны нийт хэмжээ биш, харин цаг хугацаа, орон зайн хуваарилалтад оршдог'], correctIndex: 2,
    explanation: '"nicht in der absoluten Menge … sondern in ihrer zeitlichen und räumlichen Verteilung" — асуудал нийт хэмжээ биш, хуваарилалтад оршдог. "nicht zu wenig" — хур бага биш.',
    questions: [
      {
        question: 'Мэдээний гол дүгнэлт юу вэ?',
        choices: ['Хур тунадас хэт бага орж байгаа нь асуудал', 'Зөвхөн усан сан барих нь бүрэн шийдэл', 'Асуудал нь усны нийт хэмжээ биш, харин цаг хугацаа, орон зайн хуваарилалтад оршдог'], correctIndex: 2,
        explanation: '"nicht in der absoluten Menge … sondern in ihrer zeitlichen und räumlichen Verteilung" — асуудал нийт хэмжээ биш, хуваарилалтад оршдог. "nicht zu wenig" — хур бага биш.',
      },
      {
        question: 'Ус хэмнэх талаар хаана хамгийн их анхаарах ёстой гэж мэдээлж байна вэ?',
        choices: ['Гэр ахуйд', 'Усны эрхэм хувийг зарцуулдаг хөдөө аж ахуйд', 'Аж үйлдвэрт'], correctIndex: 1,
        explanation: '"in der Landwirtschaft, die den Löwenanteil verbraucht, weit mehr noch als in den Haushalten" — усны ихэнхийг хэрэглэдэг хөдөө аж ахуйд гэр ахуйгаас илүү анхаарах ёстой.',
      },
    ],
  },
  {
    id: 652, level: 'C1', topic: 'Ярилцлага',
    title: 'Interview: Extremsport und Risiko', titleMn: 'Ярилцлага: экстрим спорт ба эрсдэл',
    audioText: 'Man hält uns Extremsportler gern für verantwortungslose Draufgänger, die den Tod suchen. Das Gegenteil ist der Fall. Wer sich in wirklich gefährliches Gelände begibt, überlässt nichts dem Zufall; jede Bewegung ist geplant, jedes Risiko kalkuliert. Der Reiz liegt nicht im Nervenkitzel des Kontrollverlusts, sondern gerade in der äußersten Konzentration, die einen völlig im Augenblick aufgehen lässt. Gleichwohl gebe ich zu, dass eine Restgefahr bleibt, die sich nie ganz beherrschen lässt. Wer das leugnet, belügt sich selbst. Entscheidend ist, diese Grenze zu kennen und den Mut zu haben, an manchen Tagen einfach umzukehren.',
    transcriptMn: 'Биднийг, экстрим тамирчдыг, үхлийг эрэлхийлэгч хариуцлагагүй зоригтнууд гэж үздэг. Гэтэл яг эсрэгээрээ. Үнэхээр аюултай газарт орох хүн юуг ч санамсаргүй байдалд орхидоггүй; хөдөлгөөн бүр төлөвлөгдсөн, эрсдэл бүр тооцоологдсон байдаг. Татах хүч нь хяналтаа алдах цочролд бус, харин хүнийг тухайн агшинд бүрэн шингээдэг хамгийн дээд түвшний төвлөрөлд оршдог. Гэсэн хэдий ч хэзээ ч бүрэн эзэмдэж чадахгүй үлдэгдэл аюул үлддэгийг би хүлээн зөвшөөрч байна. Үүнийг үгүйсгэдэг хүн өөрийгөө хуурч байгаа хэрэг. Гол нь энэ хязгаарыг мэдэж, зарим өдөр зүгээр л буцаж эргэх зоригтой байх явдал юм.',
    question: 'Ярилцагчийн үзэж буйгаар экстрим спортын татах хүч юунд оршдог вэ?',
    choices: ['Тухайн агшинд бүрэн шингээдэг хамгийн дээд төвлөрөлд', 'Хяналтаа алдах цочролд', 'Үхлийг эрэлхийлэхэд'], correctIndex: 0,
    explanation: '"gerade in der äußersten Konzentration, die einen völlig im Augenblick aufgehen lässt" — татах хүч нь хамгийн дээд төвлөрөлд оршдог. Хяналтаа алдах цочрол гэх санааг "nicht im Nervenkitzel des Kontrollverlusts" гэж няцаадаг.',
    questions: [
      {
        question: 'Ярилцагчийн үзэж буйгаар экстрим спортын татах хүч юунд оршдог вэ?',
        choices: ['Тухайн агшинд бүрэн шингээдэг хамгийн дээд төвлөрөлд', 'Хяналтаа алдах цочролд', 'Үхлийг эрэлхийлэхэд'], correctIndex: 0,
        explanation: '"gerade in der äußersten Konzentration, die einen völlig im Augenblick aufgehen lässt" — татах хүч нь хамгийн дээд төвлөрөлд оршдог. Хяналтаа алдах цочрол гэх санааг "nicht im Nervenkitzel des Kontrollverlusts" гэж няцаадаг.',
      },
      {
        question: 'Ярилцагч жинхэнэ зоригийг юу гэж үзэж байна вэ?',
        choices: ['Ямар ч эрсдэлийг үл тоомсорлохыг', 'Аюулыг бүрэн үгүйсгэхийг', 'Зарим өдөр буцаж эргэх шийдвэр гаргахыг'], correctIndex: 2,
        explanation: '"den Mut zu haben, an manchen Tagen einfach umzukehren" — зарим өдөр буцаж эргэх зоригтой байх нь жинхэнэ зориг. Аюулыг үгүйсгэдэг хүн "belügt sich selbst".',
      },
    ],
  },
  {
    id: 653, level: 'C1', topic: 'Хэлэлцүүлэг',
    title: 'Podiumsbeitrag: Generationen am Arbeitsplatz', titleMn: 'Хэлэлцүүлэг: ажлын байран дахь үеийнхэн',
    audioText: 'Über die junge Generation am Arbeitsplatz kursieren viele Klischees: Sie sei illoyal, anspruchsvoll, kaum belastbar. Solche Pauschalurteile führen in die Irre. Was oft als mangelnde Leistungsbereitschaft gedeutet wird, ist häufig nur ein verändertes Verständnis davon, was Arbeit leisten soll. Sinn und Vereinbarkeit wiegen schwerer als der Statusgewinn, der frühere Generationen antrieb. Gleichwohl wäre es falsch, die Unterschiede zum Grabenkampf zu stilisieren. Die Forschung zeigt, dass sich die Werte innerhalb einer Generation stärker unterscheiden als zwischen den Generationen. Insofern lohnt weniger das Reden über die Jungen als das Gespräch mit dem konkreten Menschen.',
    transcriptMn: 'Ажлын байран дахь залуу үеийнхний тухай олон хэвшмэл ойлголт тархсан: тэд үнэнч бус, шаардлага ихтэй, дарамт даахгүй гэх мэт. Ийм бүхэлчилсэн дүгнэлт төөрөгдүүлдэг. Ажилдаа хандах хүсэл дутмаг гэж голдуу тайлбарладаг зүйл нь үнэндээ ажил юу хийх ёстой тухай өөрчлөгдсөн ойлголт байдаг. Өмнөх үеийнхнийг хөтөлж байсан статусын ашгаас утга учир, ажил-амьдралын зохицол илүү хүнд жинтэй болжээ. Гэсэн хэдий ч ялгааг эвлэршгүй тулааны хэлбэрт оруулах нь буруу. Судалгаагаар үнэт зүйлс нь үеийн хооронд гэхээсээ илүү нэг үеийн дотор ялгаатай байдаг нь харагддаг. Тийм учраас "залуучуудын" тухай ярихаас илүү тухайн тодорхой хүнтэй ярилцах нь үнэ цэнэтэй.',
    question: 'Илтгэгчийн гол санаа юу вэ?',
    choices: ['Залуу үе үнэхээр үнэнч бус, дарамт даахгүй', 'Үнэт зүйлсийн ялгаа үеийн хооронд биш, харин нэг үеийн дотор илүү их байдаг', 'Үеүүд хоорондоо эвлэршгүй тулаанд байдаг'], correctIndex: 1,
    explanation: '"die Werte innerhalb einer Generation stärker unterscheiden als zwischen den Generationen" — ялгаа нэг үеийн дотор илүү их. Үеийн тулаан гэх санааг "zum Grabenkampf zu stilisieren" буруу гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн гол санаа юу вэ?',
        choices: ['Залуу үе үнэхээр үнэнч бус, дарамт даахгүй', 'Үнэт зүйлсийн ялгаа үеийн хооронд биш, харин нэг үеийн дотор илүү их байдаг', 'Үеүүд хоорондоо эвлэршгүй тулаанд байдаг'], correctIndex: 1,
        explanation: '"die Werte innerhalb einer Generation stärker unterscheiden als zwischen den Generationen" — ялгаа нэг үеийн дотор илүү их. Үеийн тулаан гэх санааг "zum Grabenkampf zu stilisieren" буруу гэж няцаадаг.',
      },
      {
        question: 'Залуу үеийнхэнд юу илүү чухал байдаг гэж хэлэв?',
        choices: ['Утга учир ба ажил-амьдралын зохицол', 'Статус, албан тушаалын ахиц', 'Хамгийн өндөр цалин'], correctIndex: 0,
        explanation: '"Sinn und Vereinbarkeit wiegen schwerer als der Statusgewinn" — утга учир ба ажил-амьдралын зохицол статусын ашгаас илүү хүнд жинтэй.',
      },
    ],
  },
  {
    id: 654, level: 'C1', topic: 'Лекц',
    title: 'Vortrag: Humor in der Kommunikation', titleMn: 'Лекц: харилцаан дахь хошин шог',
    audioText: 'Humor gilt in ernsten Zusammenhängen oft als unseriös, als etwas, das man sich am Rednerpult besser verkneift. Diese Skepsis ist unbegründet. Ein treffender, im rechten Moment gesetzter Witz baut Distanz ab und macht selbst sperrige Inhalte zugänglich. Zuhörer, die lachen, hören nachweislich aufmerksamer zu. Gleichwohl ist Humor ein zweischneidiges Schwert. Wer auf Kosten anderer scherzt oder den Ton verfehlt, verspielt in Sekunden jedes Vertrauen. Entscheidend ist daher nicht, möglichst witzig zu sein, sondern das Gespür dafür, wann Leichtigkeit trägt und wann sie deplatziert wirkt. Humor ersetzt kein Argument – aber er öffnet Ohren.',
    transcriptMn: 'Хошин шогийг ноцтой нөхцөлд ихэвчлэн нухацгүй, илтгэлийн индэр дээр барих нь дээр зүйл гэж үздэг. Ийм эргэлзээ үндэсгүй. Оновчтой, зөв агшинд тавьсан хошигнол зайг багасгаж, бүр төвөгтэй агуулгыг ч ойлгомжтой болгодог. Инээж буй сонсогчид батлагдсанаар илүү анхааралтай сонсдог. Гэсэн хэдий ч хошин шог бол хоёр иртэй сэлэм. Бусдын зардлаар хошигнодог эсвэл өнгө аясаа алдсан хүн хэдхэн секундэд бүх итгэлийг алддаг. Тийм учраас аль болох хөгжилтэй байх нь бус, харин хөнгөн байдал хэзээ тохирох, хэзээ тохирохгүйг мэдрэх нь шийдвэрлэх ач холбогдолтой. Хошин шог маргааныг орлодоггүй — гэхдээ чихийг нээдэг.',
    question: 'Илтгэгчийн үзэж буйгаар хамгийн чухал зүйл юу вэ?',
    choices: ['Аль болох хөгжилтэй байх', 'Хошигнолыг бүрмөсөн зайлсхийх', 'Хөнгөн байдал хэзээ тохирох, хэзээ тохирохгүйг мэдрэх'], correctIndex: 2,
    explanation: '"das Gespür dafür, wann Leichtigkeit trägt und wann sie deplatziert wirkt" — хэзээ тохирох, хэзээ тохирохгүйг мэдрэх нь чухал. "nicht, möglichst witzig zu sein" — аль болох хөгжилтэй байх нь гол биш.',
    questions: [
      {
        question: 'Илтгэгчийн үзэж буйгаар хамгийн чухал зүйл юу вэ?',
        choices: ['Аль болох хөгжилтэй байх', 'Хошигнолыг бүрмөсөн зайлсхийх', 'Хөнгөн байдал хэзээ тохирох, хэзээ тохирохгүйг мэдрэх'], correctIndex: 2,
        explanation: '"das Gespür dafür, wann Leichtigkeit trägt und wann sie deplatziert wirkt" — хэзээ тохирох, хэзээ тохирохгүйг мэдрэх нь чухал. "nicht, möglichst witzig zu sein" — аль болох хөгжилтэй байх нь гол биш.',
      },
      {
        question: 'Илтгэгч хошин шогийг юутай зүйрлэв?',
        choices: ['Найдвартай хамгаалалттай', 'Хоёр иртэй сэлэмтэй', 'Утгагүй чимэглэлтэй'], correctIndex: 1,
        explanation: '"Humor ist ein zweischneidiges Schwert" — хошин шог бол хоёр иртэй сэлэм: буруу хэрэглэвэл итгэлийг алддаг.',
      },
    ],
  },
  {
    id: 655, level: 'C1', topic: 'Нэвтрүүлэг',
    title: 'Feature: Artenvielfalt in der Stadt', titleMn: 'Нэвтрүүлэг: хот дахь зүйлийн олон янз байдал',
    audioText: 'Die Stadt gilt gemeinhin als Feind der Natur, als versiegelte Wüste aus Beton. Dieses Bild ist überholt. Manche Städte beherbergen heute eine erstaunlich hohe Artenvielfalt, vielerorts sogar eine größere als das umliegende, industriell bewirtschaftete Agrarland mit seinen ausgeräumten Monokulturen. Brachen, Parks und Gärten bieten Nischen, die auf dem Acker längst verschwunden sind. Gleichwohl darf man dies nicht romantisieren: Es sind oft anspruchslose Allerweltsarten, die profitieren, während seltene Spezialisten weiter schwinden. Entscheidend ist also nicht die bloße Zahl der Arten, sondern die Frage, welche wir mit unserer Art zu bauen und zu gärtnern fördern.',
    transcriptMn: 'Хотыг ерөнхийдөө байгалийн дайсан, битүүмжилсэн бетон цөл гэж үздэг. Энэ дүр төрх хуучирсан. Зарим хот өнөөдөр гайхмаар өндөр зүйлийн олон янз байдлыг агуулдаг, олон газарт бүр эргэн тойрны, ганц таримал ургамлаараа хоосорсон, аж үйлдвэрийн аргаар ашигладаг хөдөө аж ахуйн газраас ч илүү байдаг. Эзгүй талбай, цэцэрлэгт хүрээлэн, цэцэрлэгүүд тариалангийн газраас аль эрт алга болсон амьдрах орчныг санал болгодог. Гэсэн хэдий ч үүнийг романтик болгож болохгүй: голдуу даруу, түгээмэл зүйлүүд ашиг хүртдэг бол ховор, тусгай төрөлжсөн зүйлүүд цаашид үгүй болсоор байдаг. Тийм учраас зүйлийн жирийн тоо биш, харин бид барих, цэцэрлэгжүүлэх арга барилаараа алийг нь дэмжиж байгаа вэ гэдэг асуулт л шийдвэрлэх ач холбогдолтой.',
    question: 'Илтгэгчийн үзэж буйгаар хамгийн чухал асуулт юу вэ?',
    choices: ['Бид арга барилаараа алийг нь дэмжиж байгаа вэ гэдэг', 'Хотод нийт хэдэн зүйл байгаа тоо', 'Хот байгальд дайсагнасан эсэх'], correctIndex: 0,
    explanation: '"welche wir mit unserer Art zu bauen und zu gärtnern fördern" — алийг нь дэмжиж байгаа вэ гэдэг гол асуулт. "nicht die bloße Zahl der Arten" — жирийн тоо биш.',
    questions: [
      {
        question: 'Илтгэгчийн үзэж буйгаар хамгийн чухал асуулт юу вэ?',
        choices: ['Бид арга барилаараа алийг нь дэмжиж байгаа вэ гэдэг', 'Хотод нийт хэдэн зүйл байгаа тоо', 'Хот байгальд дайсагнасан эсэх'], correctIndex: 0,
        explanation: '"welche wir mit unserer Art zu bauen und zu gärtnern fördern" — алийг нь дэмжиж байгаа вэ гэдэг гол асуулт. "nicht die bloße Zahl der Arten" — жирийн тоо биш.',
      },
      {
        question: 'Хотод голдуу ямар зүйлүүд ашиг хүртдэг вэ?',
        choices: ['Ховор, тусгай төрөлжсөн зүйлүүд', 'Бүх зүйл адилхан', 'Даруу, түгээмэл зүйлүүд'], correctIndex: 2,
        explanation: '"Es sind oft anspruchslose Allerweltsarten, die profitieren, während seltene Spezialisten weiter schwinden" — даруу, түгээмэл зүйлүүд ашиг хүртдэг, ховор нь үгүй болдог.',
      },
    ],
  },
  {
    id: 656, level: 'C1', topic: 'Ярилцлага',
    title: 'Interview: Stimme und Wirkung', titleMn: 'Ярилцлага: хоолой ба нөлөө',
    audioText: 'Wir überschätzen gewaltig, was wir sagen, und unterschätzen, wie wir es sagen. Untersuchungen legen nahe, dass die Stimme – ihr Klang, ihr Tempo, ihre Pausen – die Wirkung einer Botschaft oft stärker prägt als der Wortlaut selbst. Eine tiefe, ruhige Stimme wirkt kompetenter, fast unabhängig vom Inhalt. Das heißt jedoch nicht, dass man sich eine künstliche Stimme antrainieren sollte; nichts wirkt unglaubwürdiger als aufgesetztes Timbre. Entscheidend ist vielmehr, die eigene Stimme bewusst wahrzunehmen und ihr durch ruhiges Atmen Halt zu geben. Wer hektisch spricht, verrät Unsicherheit – ganz gleich, wie klug seine Worte sein mögen.',
    transcriptMn: 'Бид юу хэлж байгаагаа хэт үнэлж, харин яаж хэлж байгаагаа дутуу үнэлдэг. Судалгаанууд хоолой — түүний өнгө, хэмнэл, завсарлага — нь илгээмжийн нөлөөг ихэвчлэн үгийн агуулгаас илүү хүчтэй тодорхойлдгийг харуулж байна. Гүн, тайван хоолой агуулгаас бараг үл хамааран илүү чадварлаг мэт сэтгэгдэл төрүүлдэг. Гэхдээ энэ нь хиймэл хоолой сургах ёстой гэсэн үг биш; зохиомол өнгөнөөс илүү итгэл төрүүлэхгүй зүйл байхгүй. Харин өөрийн хоолойгоо ухамсартай мэдэрч, тайван амьсгалаар түүнд тулгуур өгөх нь шийдвэрлэх ач холбогдолтой. Яаран сандран ярьдаг хүн үгс нь хэчнээн ухаалаг байлаа ч итгэлгүй байдлаа илчилдэг.',
    question: 'Ярилцагчийн гол санаа юу вэ?',
    choices: ['Хиймэл, дуурайсан хоолой сургах хэрэгтэй', 'Хэлэх агуулгаас илүү яаж хэлэх нь ихэвчлэн чухал', 'Зөвхөн үгийн сонголт л шийдвэрлэдэг'], correctIndex: 1,
    explanation: '"die Stimme … die Wirkung einer Botschaft oft stärker prägt als der Wortlaut selbst" — яаж хэлэх нь агуулгаас илүү чухал. Хиймэл хоолой сургах санааг "nichts wirkt unglaubwürdiger als aufgesetztes Timbre" гэж няцаадаг.',
    questions: [
      {
        question: 'Ярилцагчийн гол санаа юу вэ?',
        choices: ['Хиймэл, дуурайсан хоолой сургах хэрэгтэй', 'Хэлэх агуулгаас илүү яаж хэлэх нь ихэвчлэн чухал', 'Зөвхөн үгийн сонголт л шийдвэрлэдэг'], correctIndex: 1,
        explanation: '"die Stimme … die Wirkung einer Botschaft oft stärker prägt als der Wortlaut selbst" — яаж хэлэх нь агуулгаас илүү чухал. Хиймэл хоолой сургах санааг "nichts wirkt unglaubwürdiger als aufgesetztes Timbre" гэж няцаадаг.',
      },
      {
        question: 'Яаран сандран ярих нь юуг илчилдэг вэ?',
        choices: ['Итгэлгүй байдлыг', 'Онцгой ухаалаг байдлыг', 'Гүн мэдлэгийг'], correctIndex: 0,
        explanation: '"Wer hektisch spricht, verrät Unsicherheit" — яаран сандран ярих нь итгэлгүй байдлыг илчилдэг, үг нь хэчнээн ухаалаг байсан ч.',
      },
    ],
  },
  {
    id: 657, level: 'C1', topic: 'Нэвтрүүлэг',
    title: 'Beitrag: Der Zufall in der Wissenschaft', titleMn: 'Нэвтрүүлэг: шинжлэх ухаан дахь санамсаргүй тохиол',
    audioText: 'In der öffentlichen Vorstellung schreitet die Wissenschaft planvoll voran, Schritt für Schritt dem Ziel entgegen. Die Realität ist unordentlicher. Viele der größten Entdeckungen – vom Penicillin bis zum Mikrowellenofen – verdanken sich einem glücklichen Zufall, einem misslungenen Versuch, einer unerwarteten Beobachtung. Doch wäre es ein Missverständnis, daraus zu schließen, Erfolg sei bloße Glückssache. Der Zufall begünstigt bekanntlich den vorbereiteten Geist. Erst wer über tiefes Wissen verfügt, erkennt im scheinbaren Fehler die Entdeckung, statt ihn achtlos wegzuwischen. Insofern ist der Zufall in der Forschung weniger das Gegenteil von Können als dessen unerlässlicher Verbündeter.',
    transcriptMn: 'Олон нийтийн төсөөлөлд шинжлэх ухаан төлөвлөгөөтэйгээр, алхам алхмаар зорилго руугаа урагшилдаг. Бодит байдал илүү эмх замбараагүй. Хамгийн том нээлтүүдийн олонх нь — пенициллинээс микро долгионы зуух хүртэл — азтай санамсаргүй тохиол, амжилтгүй туршилт, гэнэтийн ажиглалтын ачаар бий болсон. Гэвч эндээс амжилт бол зүгээр л азын хэрэг гэж дүгнэх нь буруу ойлголт болно. Санамсаргүй тохиол нь мэдэгдэж буйгаар бэлтгэгдсэн оюун ухаанд тустай байдаг. Зөвхөн гүн мэдлэгтэй хүн л илэрхий алдаанаас нээлтийг олж хардаг, түүнийг хайхрамжгүй арчихын оронд. Тийм учраас судалгаа дахь санамсаргүй тохиол нь чадварын эсрэг тал бус, харин түүний зайлшгүй холбоотон юм.',
    question: 'Илтгэгчийн эцсийн дүгнэлт юу вэ?',
    choices: ['Амжилт бол зүгээр л цэвэр азын хэрэг', 'Шинжлэх ухаан үргэлж төлөвлөгөөтэй урагшилдаг', 'Санамсаргүй тохиол нь чадварын эсрэг биш, харин зайлшгүй холбоотон'], correctIndex: 2,
    explanation: '"weniger das Gegenteil von Können als dessen unerlässlicher Verbündeter" — санамсаргүй тохиол нь чадварын эсрэг биш, зайлшгүй холбоотон. Амжилт бол цэвэр аз гэх санааг "ein Missverständnis" гэж няцаадаг.',
    questions: [
      {
        question: 'Илтгэгчийн эцсийн дүгнэлт юу вэ?',
        choices: ['Амжилт бол зүгээр л цэвэр азын хэрэг', 'Шинжлэх ухаан үргэлж төлөвлөгөөтэй урагшилдаг', 'Санамсаргүй тохиол нь чадварын эсрэг биш, харин зайлшгүй холбоотон'], correctIndex: 2,
        explanation: '"weniger das Gegenteil von Können als dessen unerlässlicher Verbündeter" — санамсаргүй тохиол нь чадварын эсрэг биш, зайлшгүй холбоотон. Амжилт бол цэвэр аз гэх санааг "ein Missverständnis" гэж няцаадаг.',
      },
      {
        question: 'Санамсаргүй нээлтийг хэн олж хардаг вэ?',
        choices: ['Хэн ч санамсаргүйгээр', 'Гүн мэдлэгтэй, бэлтгэгдсэн хүн', 'Зөвхөн азтай хүн'], correctIndex: 1,
        explanation: '"Der Zufall begünstigt … den vorbereiteten Geist" / "wer über tiefes Wissen verfügt, erkennt … die Entdeckung" — зөвхөн гүн мэдлэгтэй, бэлтгэгдсэн хүн нээлтийг олж хардаг.',
      },
    ],
  },
];
