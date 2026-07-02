// =============================================================================
// Vivid-Lingua — Сонсох дасгалын C2 өргөтгөл (Listening Expansion · C2)
// -----------------------------------------------------------------------------
// C2 түвшний сонсох дасгалын нэмэлт багц. Фейлетон / радио эссэ маягийн
// уран яруу, ёж, эсрэгцэл бүхий герман монолог + монгол орчуулга, тайлбар.
// ID хүрээ: 661–678 (нийт 18 дасгал).
// =============================================================================

import type { ListeningItem } from './library';

export const LISTENING_EXPANSION_C2: ListeningItem[] = [
  {
    id: 661, level: 'C2', topic: 'Эссэ',
    title: 'Essay: Ironie und Ernst', titleMn: 'Эссэ: Ёж ба нухацлал',
    audioText: 'Man hält die Ironie gern für das Gegenteil des Ernstes, für eine Flucht vor dem Bekenntnis. Doch wer genau hinsieht, erkennt: Die schärfste Ironie entspringt nicht der Gleichgültigkeit, sondern einer verletzten Ernsthaftigkeit, die sich nicht mehr direkt zu sagen traut. Sie ist der Umweg, den die Überzeugung nimmt, wenn ihr das Pathos peinlich geworden ist. Freilich lauert darin eine Gefahr: Wer alles in Anführungszeichen setzt, dem entgleitet irgendwann das eigene Gesicht. Die Ironie, ursprünglich ein Instrument der Freiheit, wird dann zum Gefängnis, das jede Festlegung verbietet. Reif ist nicht, wer nie ironisch spricht, sondern wer weiß, wann er die Anführungszeichen wieder fallen lassen muss.',
    transcriptMn: 'Ёжлолыг ихэвчлэн нухацлалын эсрэг тал, өөрийгөө илэрхийлэхээс зугтах гэж үздэг. Гэвч анхааралтай ажиглах хүнд ойлгогдоно: хамгийн хурц ёжлол хайхрамжгүй байдлаас биш, харин шууд хэлж зүрхлэхээ больсон шархадсан нухацлалаас үүсдэг. Энэ бол эмгэнэлт өнгө нь ичгэвтэр санагдах болсон итгэл үнэмшлийн сонгосон тойруу зам юм. Гэлээ ч үүнд аюул нуугдаж байдаг: бүхнийг хашилтад хийдэг хүний нүүр царай нэгэн өдөр гээгддэг. Анх эрх чөлөөний зэвсэг байсан ёжлол тэгээд аливаа шийдэмгий байр суурийг хориглох шорон болон хувирдаг. Хэзээ ч ёжилдоггүй хүн биш, харин хашилтаа хэзээ дахин буулгахаа мэддэг хүн л төлөвшсөн нэгэн болой.',
    question: 'Зохиогчийн үзлээр хамгийн хурц ёжлол юунаас үүсдэг вэ?',
    choices: ['Хайхрамжгүй байдлаас', 'Шархадсан нухацлалаас', 'Хошин шогийн авьяаснаас'], correctIndex: 1,
    questions: [
      {
        question: 'Зохиогчийн үзлээр хамгийн хурц ёжлол юунаас үүсдэг вэ?',
        choices: ['Хайхрамжгүй байдлаас', 'Шархадсан нухацлалаас', 'Хошин шогийн авьяаснаас'], correctIndex: 1,
        hint: '"nicht der Gleichgültigkeit, sondern …" гэсэн эсрэгцлийг сонс.',
        explanation: '"nicht der Gleichgültigkeit, sondern einer verletzten Ernsthaftigkeit" — ёжлол хайхрамжгүй байдлаас биш, харин шууд хэлж зүрхлэхээ больсон нухацлалаас үүсдэг.',
      },
      {
        question: 'Зохиогчийн хэлснээр төлөвшил юунд оршдог вэ?',
        choices: ['Хэзээ ч ёжлохгүй байхад', 'Хашилтаа хэзээ буулгахаа мэдэхэд', 'Бүх зүйлийг ноцтой авахад'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "Reif ist nicht, wer …, sondern wer …".',
        explanation: '"wann er die Anführungszeichen wieder fallen lassen muss" — төлөвшил ёжлолыг мэдэх, мөн түүнийг хэзээ орхихоо мэдэхэд оршдог.',
      },
    ],
  },
  {
    id: 662, level: 'C2', topic: 'Илтгэл',
    title: 'Vortrag: Eigentum im Wandel', titleMn: 'Илтгэл: Өөрчлөгдөж буй өмч',
    audioText: 'Meine Damen und Herren, wir sprechen vom Eigentum, als sei es ein Ding, das man in Händen hält. Tatsächlich aber ist Eigentum niemals eine Sache gewesen, sondern stets ein Bündel von Beziehungen — das Recht, andere von etwas auszuschließen. Eben dieses Recht gerät heute ins Wanken. Wer Musik streamt, Software mietet und Autos teilt, besitzt immer weniger und verfügt zugleich über immer mehr. Die Ökonomen feiern das als Triumph des Zugangs über den Besitz. Doch man sollte sich nicht täuschen: Wo niemand mehr etwas besitzt, besitzen einige wenige die Plattformen, auf denen alle anderen nur noch Gäste sind. Der Abschied vom Eigentum ist kein Abschied von der Macht — er verlagert sie bloß.',
    transcriptMn: 'Хатагтай, ноёд оо, бид өмчийн тухай гартаа барьдаг эд зүйл мэт ярьдаг. Гэтэл өмч хэзээ ч эд зүйл байгаагүй, харин үргэлж харилцааны багц — бусдыг ямар нэг зүйлээс хасах эрх байсаар ирсэн. Яг энэ эрх өнөөдөр ганхаж байна. Хөгжим стриминглэж, программ хангамж түрээслэж, машин хуваалцдаг хүн улам бага эзэмшиж, зэрэгцээд улам ихийг захиран зарцуулж байна. Эдийн засагчид үүнийг эзэмшлийн дээгүүр хүртээмжийн ялалт хэмээн магтдаг. Гэвч бүү мэхлэгдээрэй: хэн ч юу ч эзэмшихээ больсон газар цөөхөн хэдэн хүн бусад бүгд зөвхөн зочин болох платформуудыг эзэмшдэг. Өмчөөс салах нь эрх мэдлээс салах биш — тэр зөвхөн эрх мэдлийг шилжүүлж байгаа хэрэг юм.',
    question: 'Илтгэгчийн үзлээр өмч гэж юу вэ?',
    choices: ['Гартаа барьдаг эд зүйл', 'Харилцааны багц буюу бусдыг хасах эрх', 'Мөнгөний нэг хэлбэр'], correctIndex: 1,
    questions: [
      {
        question: 'Илтгэгчийн үзлээр өмч гэж юу вэ?',
        choices: ['Гартаа барьдаг эд зүйл', 'Харилцааны багц буюу бусдыг хасах эрх', 'Мөнгөний нэг хэлбэр'], correctIndex: 1,
        hint: '"nicht eine Sache …, sondern ein Bündel von Beziehungen" хэсгийг сонс.',
        explanation: '"ein Bündel von Beziehungen — das Recht, andere von etwas auszuschließen" — өмч бол эд зүйл биш, харилцааны багц.',
      },
      {
        question: 'Илтгэгч хүртээмжийн эдийн засгийн талаар юуг сэрэмжлүүлдэг вэ?',
        choices: ['Хүн бүр эрх тэгш болно', 'Цөөхөн хүн платформыг эзэмшиж, эрх мэдэл зөвхөн шилждэг', 'Эд хөрөнгө үнэгүй болно'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "kein Abschied von der Macht — er verlagert sie bloß".',
        explanation: '"besitzen einige wenige die Plattformen" — эзэмшил алга болсон мэт боловч эрх мэдэл цөөхөн платформ эзэмшигчид рүү шилждэг.',
      },
    ],
  },
  {
    id: 663, level: 'C2', topic: 'Мэтгэлцээн',
    title: 'Debattenbeitrag: Generationengerechtigkeit', titleMn: 'Мэтгэлцээний үг: Үеийн шударга ёс',
    audioText: 'Kaum ein Schlagwort wird so gern beschworen wie die Generationengerechtigkeit. Angeblich plündert die alte Generation die Zukunft der jungen — bei Rente, Klima und Staatsschulden. Doch dieses Bild zweier verfeindeter Altersblöcke führt in die Irre. Denn zwischen einer vermögenden Erbin und einem prekären Leiharbeiter desselben Jahrgangs liegen Welten, während ein armer Großvater und eine arme Enkelin oft dieselbe Not teilen. Wer die Gesellschaft allein nach Geburtsjahrgängen sortiert, verdeckt die eigentliche Bruchlinie: die zwischen Arm und Reich. Die Rede von der Generationengerechtigkeit ist deshalb nicht selten ein bequemes Ablenkungsmanöver. Nicht die Alten stehen gegen die Jungen — sondern jene, die erben, gegen jene, die nur arbeiten.',
    transcriptMn: 'Үеийн шударга ёс шиг тийм дуртайяа дуудагдах уриа лоозон ховор. Хөгшин үе тэтгэвэр, уур амьсгал, төрийн өрөөр залуу үеийн ирээдүйг тонон дээрэмддэг гэнэ. Гэвч харш хоёр насны блокийн энэ дүр зураг төөрөгдүүлдэг. Учир нь нэг оны хөрөнгөтэй өв залгамжлагч эмэгтэй, тогтворгүй түр ажилтан хоёрын хооронд тэнгэр газар шиг зөрүү оршдог бол ядуу өвөө, ядуу ач охин хоёр ихэвчлэн ижил зовлон хуваалцдаг. Нийгмийг зөвхөн төрсөн оноор нь ангилдаг хүн жинхэнэ хагарлын шугам болох баян, ядуугийн заагийг далдалдаг. Тиймээс үеийн шударга ёсны яриа тав тухтай анхаарал сарниулах арга болох нь цөөнгүй. Хөгшид залуучуудын эсрэг биш — өв залгамжлагчид зөвхөн хөдөлмөрлөгчдийн эсрэг зогсож байгаа юм.',
    question: 'Илтгэгчийн үзлээр нийгмийн жинхэнэ хагарлын шугам аль вэ?',
    choices: ['Баян ба ядуугийн хооронд', 'Хөгшин ба залуугийн хооронд', 'Хот ба хөдөөгийн хооронд'], correctIndex: 0,
    questions: [
      {
        question: 'Илтгэгчийн үзлээр нийгмийн жинхэнэ хагарлын шугам аль вэ?',
        choices: ['Баян ба ядуугийн хооронд', 'Хөгшин ба залуугийн хооронд', 'Хот ба хөдөөгийн хооронд'], correctIndex: 0,
        hint: '"die eigentliche Bruchlinie: die zwischen …" гэсэн хэсгийг сонс.',
        explanation: '"die eigentliche Bruchlinie: die zwischen Arm und Reich" — жинхэнэ зөрчил нас биш, баялгийн зааг дээр оршдог.',
      },
      {
        question: 'Илтгэгч үеийн шударга ёсны яриаг юу гэж нэрлэдэг вэ?',
        choices: ['Чухал шинэ санаа', 'Тав тухтай анхаарал сарниулах арга', 'Шинжлэх ухааны батлагдсан баримт'], correctIndex: 1,
        hint: '"ein bequemes Ablenkungsmanöver" гэсэн үгийг сонс.',
        explanation: '"ein bequemes Ablenkungsmanöver" — уг яриа баян ядуугийн зөрчлийг далдлах тав тухтай анхаарал сарниулалт болдог.',
      },
    ],
  },
  {
    id: 664, level: 'C2', topic: 'Эссэ',
    title: 'Feuilleton: Die Übersetzbarkeit von Literatur', titleMn: 'Фейлетон: Уран зохиолын орчуулагдах чадвар',
    audioText: 'Es gehört zu den zählebigsten Klischees, jede Übersetzung sei ein Verrat, ein bloßer Abglanz des Originals. Gewiss, was in der einen Sprache selbstverständlich klingt, muss in der anderen mühsam errungen werden; der Wortwitz verpufft, der Rhythmus stolpert. Und doch wäre es kurzsichtig, darin nur Verlust zu sehen. Denn ein großes Werk beweist seine Größe gerade darin, dass es die Reise in eine fremde Sprache übersteht — ja, dass es dort mitunter Töne findet, die im Original noch schliefen. Die Übersetzung tötet das Original nicht, sie zwingt es zu einem zweiten Leben. Nicht das Unübersetzbare ist der Skandal der Literatur, sondern ihr hartnäckiges Weiterleben in tausend fremden Zungen.',
    transcriptMn: 'Орчуулга бүр урвалт, эх зохиолын хиртэлзсэн туяа төдий гэдэг нь хамгийн зүтгэлтэй жишиг ойлголтын нэг. Мэдээж нэг хэлэнд аяндаа сонсогддог зүйл нөгөө хэлэнд хүнд хүчирээр олж авагдана; үгийн тоглоом сарнина, хэмнэл бүдэрнэ. Гэсэн ч үүнд зөвхөн алдагдал харах нь холч биш ойрч ухаан болой. Учир нь агуу бүтээл яг л харь хэл рүү аялахдаа тэсэж үлддэгээрээ, тэр ч байтугай эх хувьдаа унтаж байсан аялгууг тэнд олдгоороо агуу байдгаа батлдаг. Орчуулга эх зохиолыг үхүүлдэггүй, харин түүнийг хоёр дахь амьдрал руу албаддаг. Утга зохиолын жинхэнэ шуугиан нь орчуулагдашгүй зүйл биш, харин мянган харь хэлэн дэх түүний зөрүүд амьд оршихуй нь мөн.',
    question: 'Зохиогчийн гол санаа юу вэ?',
    choices: ['Орчуулга үргэлж эх зохиолыг урвадаг', 'Орчуулга утгыг бүрэн хэвээр хадгалдаг', 'Орчуулга зохиолд хоёр дахь амьдрал өгдөг'], correctIndex: 2,
    questions: [
      {
        question: 'Зохиогчийн гол санаа юу вэ?',
        choices: ['Орчуулга үргэлж эх зохиолыг урвадаг', 'Орчуулга утгыг бүрэн хэвээр хадгалдаг', 'Орчуулга зохиолд хоёр дахь амьдрал өгдөг'], correctIndex: 2,
        hint: '"sie zwingt es zu einem zweiten Leben" хэсгийг сонс.',
        explanation: '"sie zwingt es zu einem zweiten Leben" — зохиогч орчуулгыг урвалт биш, зохиолын хоёр дахь амьдрал гэж үздэг.',
      },
      {
        question: 'Агуу бүтээл өөрийн агуу байдлаа юугаараа батлдаг вэ?',
        choices: ['Гадаад хэл рүү хийх аяллыг давснаараа', 'Богино байдгаараа', 'Орчуулагдахгүй байдгаараа'], correctIndex: 0,
        hint: '"dass es die Reise in eine fremde Sprache übersteht" хэсгийг сонс.',
        explanation: '"dass es die Reise in eine fremde Sprache übersteht" — агуу бүтээл харь хэл рүү аяллыг давж, бүр шинэ аялгуу олдгоороо агуу.',
      },
    ],
  },
  {
    id: 665, level: 'C2', topic: 'Тайлбар',
    title: 'Kommentar: Expertise und Vertrauen', titleMn: 'Тайлбар: Мэргэшил ба итгэл',
    audioText: 'Gern wird der Vertrauensverlust in Experten als Triumph der Dummheit über die Vernunft gedeutet. Doch so schmeichelhaft diese Erklärung für die Gebildeten ist, so unvollständig bleibt sie. Denn nicht selten haben die Fachleute selbst zur Erosion beigetragen — dann nämlich, wenn sie ihre Kompetenz überdehnten und wissenschaftliche Autorität für Werturteile in Anspruch nahmen, die keine Messung entscheidet. Ob ein Risiko hinnehmbar ist, verrät kein Datensatz; das ist eine politische Frage. Wer sie im Gewand der Objektivität beantwortet, verspielt eben jenes Vertrauen, das er einfordert. Die Öffentlichkeit ist nicht wissenschaftsfeindlich, weil sie zweifelt — sie wird es, wenn man ihr das Zweifeln verbietet.',
    transcriptMn: 'Мэргэжилтнүүдэд итгэх итгэл алдагдсаныг ихэвчлэн мунхаг ухааныг ялсан явдал гэж тайлбарладаг. Гэвч энэ тайлбар боловсролтой хүмүүст хичнээн зусардуу байлаа ч тэр хэрээр дутуу хэвээр үлддэг. Учир нь мэргэжилтнүүд өөрсдөө эрозид нэгэнтээ хувь нэмэр оруулсан байдаг — тухайлбал чадвараа хэтрүүлж, ямар ч хэмжилтээр шийдэгддэггүй үнэ цэнийн дүгнэлтэд шинжлэх ухааны эрх мэдлийг ашиглах үед. Аль эрсдэл хүлээн зөвшөөрөгдөх нь гэдгийг ямар ч тоон өгөгдөл хэлж өгөхгүй; энэ бол улс төрийн асуулт. Түүнийг бодит байдлын нэрийн дор хариулдаг хүн өөрийнхөө шаардаж буй итгэлийг л алдана. Олон нийт эргэлзсэн учраас шинжлэх ухааны эсрэг болдоггүй — тэдэнд эргэлзэхийг хориглох үед л тийм болдог юм.',
    question: 'Зохиогчийн үзлээр мэргэжилтнүүдэд итгэх итгэл яагаад буурсан бэ?',
    choices: ['Мэргэжилтнүүд өөрсдөө чадвараа хэтрүүлж, үнэ цэнийн асуултыг шинжлэх ухааны нэрээр шийдсэн', 'Олон нийт бүрэн мунхаг учраас', 'Мэдээлэл хэт хомс байсан учраас'], correctIndex: 0,
    questions: [
      {
        question: 'Зохиогчийн үзлээр мэргэжилтнүүдэд итгэх итгэл яагаад буурсан бэ?',
        choices: ['Мэргэжилтнүүд өөрсдөө чадвараа хэтрүүлж, үнэ цэнийн асуултыг шинжлэх ухааны нэрээр шийдсэн', 'Олон нийт бүрэн мунхаг учраас', 'Мэдээлэл хэт хомс байсан учраас'], correctIndex: 0,
        hint: '"wenn sie ihre Kompetenz überdehnten …" хэсгийг сонс.',
        explanation: '"ihre Kompetenz überdehnten und wissenschaftliche Autorität für Werturteile in Anspruch nahmen" — буруутгал зөвхөн олон нийтэд биш, чадвараа хэтрүүлсэн мэргэжилтнүүдэд ч бий.',
      },
      {
        question: 'Олон нийт хэзээ шинжлэх ухааны эсрэг болдог вэ?',
        choices: ['Тэдэнд эргэлзэхийг хориглох үед', 'Тэд эргэлзэж эхлэх үед', 'Тэд мэдээлэл авах үед'], correctIndex: 0,
        hint: 'Сүүлчийн өгүүлбэр: "sie wird es, wenn man ihr das Zweifeln verbietet".',
        explanation: '"wenn man ihr das Zweifeln verbietet" — эргэлзэх нь өөрөө биш, эргэлзэхийг хориглох нь олон нийтийг шинжлэх ухааны эсрэг болгодог.',
      },
    ],
  },
  {
    id: 666, level: 'C2', topic: 'Илтгэл',
    title: 'Festvortrag: Utopien', titleMn: 'Ёслолын илтгэл: Утопи',
    audioText: 'Verehrte Festgemeinde, man hat die Utopie oft für tot erklärt — und meist im selben Atemzug erleichtert aufgeatmet. Denn wo Menschen den vollkommenen Staat zu bauen versuchten, endete das Vorhaben nicht selten im Zwang, im Lager, in der Guillotine. Und doch wäre es ein Fehler, mit den Blaupausen auch die Sehnsucht zu begraben. Denn die Utopie taugt nicht als Bauplan, wohl aber als Spiegel: Sie zeigt uns, woran unsere Gegenwart krankt, indem sie ein Anderes denkbar macht. Wer keinen Kompass mehr besitzt, richtet sich zwangsläufig nach dem Bestehenden. Gefährlich ist nicht, wer vom Besseren träumt, sondern wer es für bereits verwirklicht hält. Die Utopie ist kein Ort, den man erreicht — sie ist eine Richtung, die uns in Bewegung hält.',
    transcriptMn: 'Эрхэм хүндэт ёслолын цугларагсад аа, утопийг олонтоо үхсэн гэж зарлаж, ихэнхдээ тэр дороо сэтгэл амарч тухалдаг байв. Учир нь хүмүүс төгс төрийг барихыг оролдсон газар тэр оролдлого албадлага, лагерь, гильотинаар төгсдөг байлаа. Гэсэн ч зураг төслүүдийн хамт хүслийг булах нь алдаа болно. Учир нь утопи барилгын төлөвлөгөө болж чадахгүй, харин толь болж чаддаг: тэр өөр боломжийг сэтгэж болохуйц болгосноороо бидний одоо цагийн өвчнийг харуулдаг. Луужингүй болсон хүн зайлшгүй одоо байгаа зүйлээр чиглэдэг. Илүү сайныг мөрөөддөг хүн аюултай биш, харин түүнийг аль хэдийн биелсэн гэж үздэг хүн аюултай. Утопи бол хүрдэг газар биш — биднийг хөдөлгөөнд байлгадаг чиглэл юм.',
    question: 'Илтгэгчийн үзлээр утопи ямар ач холбогдолтой вэ?',
    choices: ['Төгс төрийг барих төлөвлөгөө болдогт', 'Аль хэдийн биелсэнд', 'Одоо цагийн өвчнийг харуулах толь болдогт'], correctIndex: 2,
    questions: [
      {
        question: 'Илтгэгчийн үзлээр утопи ямар ач холбогдолтой вэ?',
        choices: ['Төгс төрийг барих төлөвлөгөө болдогт', 'Аль хэдийн биелсэнд', 'Одоо цагийн өвчнийг харуулах толь болдогт'], correctIndex: 2,
        hint: '"nicht als Bauplan, wohl aber als Spiegel" хэсгийг сонс.',
        explanation: '"nicht als Bauplan, wohl aber als Spiegel" — утопи барилгын төлөвлөгөө биш, одоо цагийг тусгах толь болдгоороо үнэ цэнэтэй.',
      },
      {
        question: 'Илтгэгчийн үзлээр хэн аюултай вэ?',
        choices: ['Илүү сайныг мөрөөддөг хүн', 'Илүү сайныг аль хэдийн биелсэн гэж үздэг хүн', 'Утопийг үгүйсгэдэг хүн'], correctIndex: 1,
        hint: '"sondern wer es für bereits verwirklicht hält" хэсгийг сонс.',
        explanation: '"wer es für bereits verwirklicht hält" — мөрөөдөгч биш, төгс ертөнц аль хэдийн бүрдсэн гэж итгэгч аюултай.',
      },
    ],
  },
  {
    id: 667, level: 'C2', topic: 'Эссэ',
    title: 'Radioessay: Langeweile', titleMn: 'Радио эссэ: Уйтгар',
    audioText: 'Kaum ein Gefühl genießt einen schlechteren Ruf als die Langeweile. Wir bekämpfen sie mit einem Wischen des Daumens, als wäre sie ein Feind, den es auszurotten gilt. Dabei war die Langeweile über Jahrhunderte die Amme der Einbildungskraft. Wer nichts zu tun hat, beginnt zu denken; wer sich langweilt, dem wird die Welt fragwürdig — und aus dieser Fragwürdigkeit ist noch jedes Gedicht und jede Erfindung entsprungen. Indem wir jede Leerstelle sofort mit Reizen füllen, berauben wir uns genau jener Öde, in der das Neue keimt. Womöglich ist die eigentliche Armut unserer Zeit nicht der Mangel an Unterhaltung, sondern der Verlust der Fähigkeit, sich zu langweilen.',
    transcriptMn: 'Уйтгар мэт муу нэр хүндтэй мэдрэмж ховор. Бид түүнийг устгах ёстой дайсан мэт эрхий хуруугаа гулсуулан тэмцдэг. Гэтэл уйтгар олон зууны туршид уран сэтгэмжийн эх барьгч байсан. Хийх юмгүй хүн бодож эхэлдэг; уйдсан хүнд ертөнц эргэлзээтэй болдог — тэр эргэлзээнээс шүлэг бүр, зохион бүтээл бүр төрсөөр ирсэн. Хоосон орон зай бүрийг тэр даруй өдөөлтөөр дүүргэснээрээ бид шинэ зүйл соёолдог яг тэр эзгүйгээ өөрсдийгөө хасдаг. Магадгүй бидний цаг үеийн жинхэнэ ядуурал зугаа цэнгэлийн дутагдал биш, харин уйдах чадвараа алдсан явдал болой.',
    question: 'Зохиогчийн үзлээр уйтгар нь юу байсан бэ?',
    choices: ['Устгах ёстой дайсан', 'Уран сэтгэмжийн эх барьгч', 'Дэмий цаг алдалт'], correctIndex: 1,
    questions: [
      {
        question: 'Зохиогчийн үзлээр уйтгар нь юу байсан бэ?',
        choices: ['Устгах ёстой дайсан', 'Уран сэтгэмжийн эх барьгч', 'Дэмий цаг алдалт'], correctIndex: 1,
        hint: '"die Amme der Einbildungskraft" хэсгийг сонс.',
        explanation: '"die Amme der Einbildungskraft" — уйтгар олон зууны турш уран сэтгэмжийг тэжээгч байсан.',
      },
      {
        question: 'Зохиогчийн үзлээр бидний цаг үеийн жинхэнэ ядуурал юу вэ?',
        choices: ['Зугаа цэнгэлийн дутагдал', 'Уйдах чадвараа алдсан явдал', 'Цаг хугацааны хомсдол'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "nicht der Mangel an Unterhaltung, sondern …".',
        explanation: '"der Verlust der Fähigkeit, sich zu langweilen" — жинхэнэ ядуурал зугааны дутагдал биш, харин уйдах чадвараа алдах юм.',
      },
    ],
  },
  {
    id: 668, level: 'C2', topic: 'Тайлбар',
    title: 'Glosse: Höflichkeit', titleMn: 'Ёж бичвэр: Эелдэг байдал',
    audioText: 'Es gilt heute als Zeichen von Authentizität, jedem ungefragt die Meinung zu geigen. Höflichkeit hingegen gerät unter Verdacht: Sie sei bloß Fassade, Verstellung, kurz Heuchelei. Nun gut — dann lobe ich die Heuchelei. Denn die kleine Lüge des »Wie schön, Sie zu sehen« kostet mich wenig und schenkt dem anderen einen freundlichen Morgen. Der Grobian, der stets nur seine Wahrheit poltert, hält sich für mutig; in Wahrheit ist er bloß bequem, denn Rücksicht ist anstrengender als Aufrichtigkeit. Höflichkeit ist die Kunst, den anderen so zu behandeln, wie er sein möchte, nicht wie er ist. Eine Zivilisation erkennt man nicht an ihrer Ehrlichkeit, sondern an der Eleganz ihrer Umwege.',
    transcriptMn: 'Өнөөдөр хэнээс ч асуулгүй бодлоо нүдэнд нь хатгах нь жинхэнэ чанарын шинж гэж тооцогддог. Харин эелдэг байдал сэжигт өртдөг: тэр зөвхөн гадуур царай, дүр эсгэлт, товчоор хоёр нүүр гаргалт гэнэ. За тэгвэл — би хоёр нүүрийг магтъя. Учир нь «Тантай уулзсандаа баяртай байна» гэсэн жижигхэн худал надаас өчүүхэнийг л авч, нөгөө хүнд найрсаг өглөө бэлэглэдэг. Байнга зөвхөн үнэнээ хашгирдаг бүдүүлэг хүн өөрийгөө зоригтой гэж боддог; үнэндээ тэр зүгээр л залхуу, учир нь бусдыг тоох нь үнэнч байхаас илүү хүнд. Эелдэг байдал бол нөгөө хүнийг байгаагаар нь бус, байхыг хүссэнээр нь харьцах урлаг юм. Соёл иргэншлийг үнэнч байдлаар нь бус, тойруу замынх нь дэгжин байдлаар нь таньдаг.',
    question: 'Зохиогч бүдүүлэг шулуун хүнийг хэрхэн үнэлдэг вэ?',
    choices: ['Зоригтой биш, залхуу гэж', 'Үнэнч, эр зоригтой гэж', 'Хамгийн соёлтой гэж'], correctIndex: 0,
    questions: [
      {
        question: 'Зохиогч бүдүүлэг шулуун хүнийг хэрхэн үнэлдэг вэ?',
        choices: ['Зоригтой биш, залхуу гэж', 'Үнэнч, эр зоригтой гэж', 'Хамгийн соёлтой гэж'], correctIndex: 0,
        hint: '"in Wahrheit ist er bloß bequem" хэсгийг сонс.',
        explanation: '"in Wahrheit ist er bloß bequem, denn Rücksicht ist anstrengender als Aufrichtigkeit" — бүдүүлэг хүн зоригтой биш, зүгээр л залхуу.',
      },
      {
        question: 'Зохиогч эелдэг байдлын "хоёр нүүр" гэдгийг хэрхэн үздэг вэ?',
        choices: ['Устгах ёстой гэмт хэрэг гэж', 'Соёл иргэншлийн ач тус гэж ёжтойгоор магтдаг', 'Хүмүүсийг хуурдаг аюул гэж'], correctIndex: 1,
        hint: '"dann lobe ich die Heuchelei" гэсэн ёжийг анзаар.',
        explanation: '"dann lobe ich die Heuchelei" — зохиогч ёжтойгоор жижиг эелдэг худлыг магтдаг, учир нь тэр бусдад найрсаг өдөр бэлэглэдэг.',
      },
    ],
  },
  {
    id: 669, level: 'C2', topic: 'Эссэ',
    title: 'Essay: Reue', titleMn: 'Эссэ: Гэмшил',
    audioText: 'Ratgeber empfehlen uns, ohne Reue zu leben — »no regrets«, als wäre das Bedauern ein überflüssiger Ballast. Doch wer nichts bereut, hat womöglich nie etwas ernst genommen. Denn Reue ist der Schmerz darüber, dass ich ein anderer hätte sein können, und eben dieser Schmerz beweist, dass mir mein Handeln nicht gleichgültig war. Freilich gibt es die zerstörerische Reue, die im Kreis der Selbstanklage rotiert und nichts hervorbringt. Von ihr zu unterscheiden ist jene fruchtbare Reue, die aus dem Bedauern eine Verpflichtung für morgen gewinnt. Wer sein früheres Ich verurteilt, beweist damit, dass er gewachsen ist. Ein Leben ganz ohne Reue wäre kein befreites — es wäre ein Leben, das sich selbst nie wichtig genug war.',
    transcriptMn: 'Зөвлөгөө өгөгчид биднийг гэмшилгүй амьдра гэж ухуулдаг — «no regrets», гэмших нь илүүц ачаа мэт. Гэвч юуг ч гэмшдэггүй хүн магадгүй юуг ч нухацтай авч байгаагүй. Учир нь гэмшил бол би өөр хүн байж болох байсан гэдэг өвдөлт бөгөөд яг энэ өвдөлт үйлдэл маань надад хайхрамжгүй байгаагүйг батлдаг. Мэдээж өөрийгөө буруутгах тойрогт эргэлдэж, юу ч төрүүлдэггүй сүйтгэгч гэмшил байдаг. Түүнээс ялгах ёстой нь гэмшлээс маргаашийн үүрэг хариуцлагыг гаргаж авдаг үр бүтээлтэй гэмшил. Урьдын би-гээ буруутгадаг хүн тэгснээрээ өссөнөө батлдаг. Огт гэмшилгүй амьдрал чөлөөлөгдсөн амьдрал биш — тэр өөрийгөө хэзээ ч хангалттай чухалд тооцоогүй амьдрал болой.',
    question: 'Зохиогчийн үзлээр гэмшил юуг батлдаг вэ?',
    choices: ['Хүн сул дорой болохыг', 'Хүн өнгөрснөө мартахыг', 'Үйлдэл нь өөрт нь хайхрамжгүй байгаагүйг'], correctIndex: 2,
    questions: [
      {
        question: 'Зохиогчийн үзлээр гэмшил юуг батлдаг вэ?',
        choices: ['Хүн сул дорой болохыг', 'Хүн өнгөрснөө мартахыг', 'Үйлдэл нь өөрт нь хайхрамжгүй байгаагүйг'], correctIndex: 2,
        hint: '"dass mir mein Handeln nicht gleichgültig war" хэсгийг сонс.',
        explanation: '"dass mir mein Handeln nicht gleichgültig war" — гэмшил бол хийсэн зүйл маань бидэнд чухал байсны нотолгоо.',
      },
      {
        question: 'Үр бүтээлтэй гэмшлийг сүйтгэгч гэмшлээс юу ялгадаг вэ?',
        choices: ['Маргаашийн үүрэг хариуцлагыг гаргаж авдаг', 'Өөрийгөө тасралтгүй буруутгадаг', 'Гэмшлийг бүрэн үгүйсгэдэг'], correctIndex: 0,
        hint: '"die aus dem Bedauern eine Verpflichtung für morgen gewinnt" хэсгийг сонс.',
        explanation: '"eine Verpflichtung für morgen gewinnt" — үр бүтээлтэй гэмшил өөрийгөө буруутгах тойрогт эргэлдэхгүй, ирээдүйн үүрэг болж хувирдаг.',
      },
    ],
  },
  {
    id: 670, level: 'C2', topic: 'Эссэ',
    title: 'Feuilleton: Provinz und Metropole', titleMn: 'Фейлетон: Муж ба метрополь',
    audioText: 'Die Metropole hält sich für den Nabel der Welt und blickt milde herab auf die Provinz, dieses angebliche Reich der Enge und der immerselben Gesichter. Doch Provinzialität ist keine Frage der Postleitzahl, sondern eine Haltung. Provinziell ist, wer die eigene Umgebung für den Maßstab aller Dinge hält — und in diesem Sinne gibt es keine provinziellere Gestalt als den Großstädter, der überzeugt ist, jenseits seines Viertels beginne das Nichts. Die echte Provinz hingegen weiß um ihre Randlage und schärft eben dadurch den Blick für das Ganze. Weltläufigkeit misst sich nicht an der Zahl besuchter Flughäfen, sondern an der Fähigkeit, das Eigene für eine Möglichkeit unter vielen zu halten.',
    transcriptMn: 'Метрополь өөрийгөө ертөнцийн хүй гэж үзэн нарийхан орон зай, ижилхэн царайнуудын гэгдэх мужийг өршөөнгүй дороос нь харна. Гэвч мужийн байдал шуудангийн кодын асуудал биш, харин хандлага. Өөрийн орчноо бүх зүйлийн хэмжүүр гэж үздэг хүн мужийн сэтгэлгээтэй — энэ утгаараа өөрийн хорооллоос цааш юу ч эхлэхгүй гэж итгэдэг том хотынхноос илүү мужийн дүр гэж үгүй. Харин жинхэнэ муж өөрийн захын байрлалаа мэддэг бөгөөд яг үүгээрээ бүхэлд нь харах хараагаа хурцалдаг. Дэлхийг үзсэн байдал зочилсон нисэх онгоцны буудлын тоогоор бус, харин өөрийнхөө зүйлийг олон боломжийн нэг гэж үзэх чадвараар хэмжигдэнэ.',
    question: 'Зохиогчийн үзлээр "мужийн байдал" гэж юу вэ?',
    choices: ['Газар зүйн байршил', 'Сэтгэлгээний хандлага', 'Хүн амын тоо'], correctIndex: 1,
    questions: [
      {
        question: 'Зохиогчийн үзлээр "мужийн байдал" гэж юу вэ?',
        choices: ['Газар зүйн байршил', 'Сэтгэлгээний хандлага', 'Хүн амын тоо'], correctIndex: 1,
        hint: '"keine Frage der Postleitzahl, sondern eine Haltung" хэсгийг сонс.',
        explanation: '"keine Frage der Postleitzahl, sondern eine Haltung" — мужийн байдал бол газар биш, харин хандлага.',
      },
      {
        question: 'Зохиогч хэнийг хамгийн "мужийн" гэж нэрлэдэг вэ?',
        choices: ['Хөдөөгийн оршин суугчийг', 'Өөрийн хорооллоос цааш юу ч байхгүй гэж боддог хотынхныг', 'Их аялдаг хүнийг'], correctIndex: 1,
        hint: '"keine provinziellere Gestalt als den Großstädter" хэсгийг сонс.',
        explanation: '"jenseits seines Viertels beginne das Nichts" — өөрийн орчноо бүхний хэмжүүр гэж боддог хотынхон хамгийн мужийн сэтгэлгээтэй.',
      },
    ],
  },
  {
    id: 671, level: 'C2', topic: 'Илтгэл',
    title: 'Monolog: Der literarische Kanon', titleMn: 'Монолог: Утга зохиолын канон',
    audioText: 'Man greift den Kanon gern als Herrschaftsinstrument an: eine Liste toter Männer, die uns vorschreibe, was zu lesen sei. An dieser Kritik ist manches richtig, und doch führt sie in die Irre, wenn sie den Kanon gleich ganz abschaffen will. Denn ein Kanon ist kein Museum abgeschlossener Meisterwerke, sondern ein fortwährender Streit darüber, was uns noch etwas zu sagen hat. Wer ihn erweitert, hält ihn lebendig; wer ihn zertrümmert, überlässt die Auswahl nicht etwa der Freiheit, sondern schlicht dem Markt und seinen Bestsellerlisten. Und der Markt ist ein weit unbarmherzigerer Kanonwächter als jeder Professor. Nicht die Abschaffung des Kanons ist die Antwort, sondern der Mut, ihn immer wieder neu zu verhandeln.',
    transcriptMn: 'Канонг ноёрхлын зэвсэг гэж дайрах нь элбэг: бидэнд юу унших ёстойг зааварладаг үхсэн эрчүүдийн жагсаалт гэнэ. Энэ шүүмжлэлд зарим зүйл үнэн боловч канонг тэр чигт нь халъя гэвэл төөрдөг. Учир нь канон бол дуусгасан шилдэг бүтээлүүдийн музей биш, харин юу бидэнд одоо ч хэлэх зүйлтэй хэвээр байгаа тухай тасралтгүй маргаан юм. Түүнийг өргөжүүлдэг хүн амьд байлгадаг; түүнийг нурааж бутлагч хүн сонголтыг эрх чөлөөнд бус, зүгээр л зах зээл, түүний бестселлерийн жагсаалтад үлдээдэг. Зах зээл бол ямар ч профессороос хамаагүй өршөөлгүй канон сахигч. Канонг халах нь хариулт биш, харин түүнийг дахин дахин шинээр хэлэлцэх зориг л хариулт мөн.',
    question: 'Зохиогчийн үзлээр канон гэж юу вэ?',
    choices: ['Юу утга учиртай хэвээр байгаа тухай тасралтгүй маргаан', 'Дуусгасан бүтээлүүдийн музей', 'Үхсэн эрчүүдийн жагсаалт'], correctIndex: 0,
    questions: [
      {
        question: 'Зохиогчийн үзлээр канон гэж юу вэ?',
        choices: ['Юу утга учиртай хэвээр байгаа тухай тасралтгүй маргаан', 'Дуусгасан бүтээлүүдийн музей', 'Үхсэн эрчүүдийн жагсаалт'], correctIndex: 0,
        hint: '"ein fortwährender Streit darüber, was uns noch etwas zu sagen hat" хэсгийг сонс.',
        explanation: '"ein fortwährender Streit darüber, was uns noch etwas zu sagen hat" — канон бол хөшөө музей биш, амьд маргаан.',
      },
      {
        question: 'Канонг халвал юу болно гэж зохиогч үздэг вэ?',
        choices: ['Уншигчид эрх чөлөөтэй болно', 'Сонголт зах зээлд шилжинэ', 'Утга зохиол алга болно'], correctIndex: 1,
        hint: '"überlässt die Auswahl … dem Markt" хэсгийг сонс.',
        explanation: '"überlässt die Auswahl … dem Markt und seinen Bestsellerlisten" — халалт эрх чөлөө биш, харин илүү өршөөлгүй зах зээлд сонголтыг үлдээдэг.',
      },
    ],
  },
  {
    id: 672, level: 'C2', topic: 'Эссэ',
    title: 'Betrachtung: Rituale des Abschieds', titleMn: 'Эргэцүүлэл: Салах ёсны зан үйл',
    audioText: 'Rituale des Abschieds gelten heute vielen als hohle Förmlichkeit, als Relikt einer Zeit, die noch an Zeremonien glaubte. Man reist ab, ohne sich zu verabschieden; man beerdigt in aller Stille; man löscht den Kontakt mit einem Klick. Das mag effizient wirken, doch es übersieht, wozu Rituale einst dienten: Sie geben dem Verlust eine Form und machen ihn dadurch überhaupt erst erträglich. Wer sich nicht verabschieden darf, dem bleibt der Schmerz formlos — und das Formlose lässt sich schwerer betrauern als das Benannte. Eine Gesellschaft, die ihre Abschiedsrituale abschafft, wird nicht nüchterner, sondern nur sprachloser vor dem Tod. Nicht die Zeremonie ist überflüssig — überflüssig ist der Hochmut, ohne sie auskommen zu wollen.',
    transcriptMn: 'Салах ёсны зан үйлийг өнөөдөр олонх нь хоосон ёслол, ёслолд итгэдэг байсан цаг үеийн үлдэц гэж үздэг. Хүн салах ёс гүйцэтгэлгүйгээр явдаг; чимээгүйхэн оршуулдаг; нэг товшилтоор холбоог устгадаг. Энэ нь үр ашигтай мэт санагдаж болох ч зан үйл нэгэнтээ юунд зориулж байсныг умартдаг: тэд алдагдалд хэлбэр өгч, түүгээрээ түүнийг тэвчихүйц болгодог байв. Салах ёс гүйцэтгэхийг зөвшөөрөөгүй хүнд өвдөлт нь хэлбэргүй үлддэг — хэлбэргүй зүйлийг нэрлэгдсэн зүйлээс гашуудахад хэцүү. Салах ёсны зан үйлээ халдаг нийгэм илүү сэрүүн болдоггүй, харин зөвхөн үхлийн өмнө хэлгүй болдог. Ёслол илүүц биш — түүнгүйгээр өнгөрөх гэсэн бардамнал л илүүц юм.',
    question: 'Зохиогчийн үзлээр салах ёсны зан үйл юу хийдэг вэ?',
    choices: ['Хоосон ёс төдий', 'Зөвхөн цаг хэмнэдэг', 'Алдагдалд хэлбэр өгч, тэвчихүйц болгодог'], correctIndex: 2,
    questions: [
      {
        question: 'Зохиогчийн үзлээр салах ёсны зан үйл юу хийдэг вэ?',
        choices: ['Хоосон ёс төдий', 'Зөвхөн цаг хэмнэдэг', 'Алдагдалд хэлбэр өгч, тэвчихүйц болгодог'], correctIndex: 2,
        hint: '"Sie geben dem Verlust eine Form …" хэсгийг сонс.',
        explanation: '"Sie geben dem Verlust eine Form und machen ihn dadurch überhaupt erst erträglich" — зан үйл гашуудалд хэлбэр өгч тэвчихүйц болгодог.',
      },
      {
        question: 'Салах ёсны зан үйлээ халсан нийгэм ямар болдог вэ?',
        choices: ['Илүү эрх чөлөөтэй болдог', 'Үхлийн өмнө хэлгүй болдог', 'Илүү үр ашигтай болдог'], correctIndex: 1,
        hint: '"nur sprachloser vor dem Tod" хэсгийг сонс.',
        explanation: '"nicht nüchterner, sondern nur sprachloser vor dem Tod" — зан үйлээ халсан нийгэм чөлөөтэй биш, харин үхлийн өмнө хэлгүй болдог.',
      },
    ],
  },
  {
    id: 673, level: 'C2', topic: 'Тайлбар',
    title: 'Kommentar: Meritokratie', titleMn: 'Тайлбар: Меритократи',
    audioText: 'Die Meritokratie verspricht, was gerecht klingt: Jeder solle so weit kommen, wie sein Talent und sein Fleiß ihn tragen. Doch diese schöne Formel hat eine dunkle Kehrseite. Denn wer glaubt, seinen Erfolg allein sich selbst zu verdanken, vergisst nur allzu leicht das Glück der Geburt, die geneigten Lehrer, die zufällige Gelegenheit. Aus verdientem Erfolg wird so ein Hochmut, der auf die Zurückgebliebenen herabsieht — als hätten sie ihr Scheitern verdient. Und genau darin liegt die eigentliche Grausamkeit: Nicht die Ungleichheit selbst, sondern die Erniedrigung, sie sich auch noch selbst zuschreiben zu müssen. Eine Gesellschaft, die den Erfolgreichen sagt, sie hätten alles verdient, sagt den Übrigen, sie hätten ihr Los verschuldet.',
    transcriptMn: 'Меритократи шударга сонсогдох зүйлийг амладаг: хүн бүр авьяас, хичээл зүтгэл нь дааж чадах хэрээр дэвших ёстой гэнэ. Гэвч энэ сайхан томьёо харанхуй нөгөө талтай. Учир нь амжилтаа зөвхөн өөртөө өртэй гэж боддог хүн төрсний азаа, тааламжтай багш нараа, санамсаргүй боломжоо амархан мартдаг. Ингэж олсон амжилт ард хоцорсон хүмүүсийг дороос нь харах бардамналд хувирдаг — тэд бүтэлгүйтлээ өөрсдөө хүртсэн мэт. Яг үүнд жинхэнэ харгислал оршдог: тэгш бус байдал өөрөө биш, харин түүнийгээ бас өөртөө хамааруулан хүлээх дорд байдал. Амжилттай хүмүүст чи бүхнийг хүртсэн гэж хэлдэг нийгэм бусдад чи хувь заяагаа өөрөө буруутгасан гэж хэлж байгаа хэрэг.',
    question: 'Зохиогчийн үзлээр меритократийн жинхэнэ харгислал юу вэ?',
    choices: ['Бүтэлгүйтлээ өөрөө буруутай гэж хүлээх дорд байдал', 'Тэгш бус байдал өөрөө', 'Авьяас хэрэггүй болох'], correctIndex: 0,
    questions: [
      {
        question: 'Зохиогчийн үзлээр меритократийн жинхэнэ харгислал юу вэ?',
        choices: ['Бүтэлгүйтлээ өөрөө буруутай гэж хүлээх дорд байдал', 'Тэгш бус байдал өөрөө', 'Авьяас хэрэггүй болох'], correctIndex: 0,
        hint: '"Nicht die Ungleichheit selbst, sondern die Erniedrigung …" хэсгийг сонс.',
        explanation: '"die Erniedrigung, sie sich auch noch selbst zuschreiben zu müssen" — жинхэнэ харгислал нь тэгш бус байдал биш, харин бүтэлгүйтлээ өөртөө хамааруулах дорд байдал.',
      },
      {
        question: 'Амжилттай хүн юуг амархан мартдаг вэ?',
        choices: ['Төрсний азаа, санамсаргүй боломжоо', 'Хөдөлмөрөө', 'Авьяасаа'], correctIndex: 0,
        hint: '"vergisst … das Glück der Geburt, die geneigten Lehrer, die zufällige Gelegenheit" хэсгийг сонс.',
        explanation: '"das Glück der Geburt, die geneigten Lehrer, die zufällige Gelegenheit" — амжилтаа зөвхөн өөртөө өртэй гэж боддог хүн азаа мартдаг.',
      },
    ],
  },
  {
    id: 674, level: 'C2', topic: 'Илтгэл',
    title: 'Vortrag: Spielen als Kulturtechnik', titleMn: 'Илтгэл: Тоглоом соёлын арга барил болох нь',
    audioText: 'Meine Damen und Herren, wir stellen das Spiel gern dem Ernst gegenüber, als sei es der Zeitvertreib, den man ablegt, sobald das eigentliche Leben beginnt. Doch diese Rangordnung verkehrt die Wahrheit. Denn kaum eine unserer höchsten Errungenschaften ist ohne den Geist des Spiels denkbar: Der Rechtsstreit folgt Regeln wie ein Wettkampf, die Dichtung lebt vom Reim als Spielzug, und selbst die Wissenschaft beginnt mit dem zweckfreien »Was wäre, wenn«. Wer spielt, probiert Möglichkeiten, ohne den Ernstfall zu riskieren — und eben diese Freiheit vom Zwang ist die Wiege der Kultur. Nicht das Kind, das spielt, ist unreif; unreif ist die Kultur, die vergessen hat, dass sie dem Spiel entstammt.',
    transcriptMn: 'Хатагтай, ноёд оо, бид тоглоомыг нухацлалтай харьцуулан жинхэнэ амьдрал эхлэнгүүт орхидог цаг өнгөрөөлт мэт үздэг. Гэвч энэ дэс дараалал үнэнийг эсрэгээр нь эргүүлдэг. Учир нь бидний хамгийн дээд амжилтуудын аль нь ч тоглоомын сүнсгүйгээр төсөөлөгдөхгүй: шүүхийн маргаан тэмцээн шиг дүрэм баримталдаг, яруу найраг холбоц үгийг тоглоомын нүүдэл болгон амьдардаг, шинжлэх ухаан хүртэл зорилгогүй «яав гэж бол» гэдгээс эхэлдэг. Тоглодог хүн жинхэнэ аюулыг эрсдэлд оруулалгүйгээр боломжуудыг туршдаг — албадлагаас чөлөөлөгдсөн яг энэ эрх чөлөө соёлын өлгий болой. Тоглодог хүүхэд төлөвшөөгүй биш; тоглоомоос үүссэнээ мартсан соёл л төлөвшөөгүй юм.',
    question: 'Илтгэгчийн гол санаа юу вэ?',
    choices: ['Тоглоом бол насанд хүрэхэд орхидог хүүхдийн зугаа', 'Тоглоом бол соёлын өлгий', 'Тоглоом нухацлалын эсрэг зүйл'], correctIndex: 1,
    questions: [
      {
        question: 'Илтгэгчийн гол санаа юу вэ?',
        choices: ['Тоглоом бол насанд хүрэхэд орхидог хүүхдийн зугаа', 'Тоглоом бол соёлын өлгий', 'Тоглоом нухацлалын эсрэг зүйл'], correctIndex: 1,
        hint: '"diese Freiheit vom Zwang ist die Wiege der Kultur" хэсгийг сонс.',
        explanation: '"diese Freiheit vom Zwang ist die Wiege der Kultur" — тоглоом хүүхдийн зугаа биш, соёлын үндэс.',
      },
      {
        question: 'Илтгэгчийн үзлээр хэн/юу төлөвшөөгүй вэ?',
        choices: ['Тоглодог хүүхэд', 'Тоглоомоос үүссэнээ мартсан соёл', 'Дүрэм баримталдаг хүн'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "unreif ist die Kultur, die vergessen hat …".',
        explanation: '"unreif ist die Kultur, die vergessen hat, dass sie dem Spiel entstammt" — тоглодог хүүхэд биш, гарлаа мартсан соёл л төлөвшөөгүй.',
      },
    ],
  },
  {
    id: 675, level: 'C2', topic: 'Эссэ',
    title: 'Essay: Über den Geschmack', titleMn: 'Эссэ: Амтын тухай (гоо зүйн дүгнэлт)',
    audioText: '»Über Geschmack lässt sich nicht streiten«, heißt es — und selten wurde ein Satz so bequem missverstanden. Denn gewiss ist der Geschmack keine Rechenaufgabe mit einer beweisbaren Lösung; niemand kann mir mathematisch vorführen, dass eine Sonate schön sei. Und doch behaupte ich, wenn ich sie schön nenne, weit mehr als bloß mein privates Gefallen. Ich lade den anderen ein, mit meinen Ohren zu hören, und bin enttäuscht, wenn er taub bleibt — was ich bei einer bloßen Vorliebe für Erdbeereis nie wäre. Der Geschmack liegt also weder im kühlen Reich der Tatsachen noch in der Willkür der Laune, sondern in jenem sonderbaren Zwischenreich, wo ich urteile und zugleich um Zustimmung werbe. Wer über Geschmack nicht streitet, hat aufgehört, ihn ernst zu nehmen.',
    transcriptMn: '«Амтны талаар маргаж болохгүй» гэдэг — гэтэл нэг өгүүлбэр ийм тав тухтайгаар буруу ойлгогдсон нь ховор. Мэдээж амт нь батлагдах шийдэлтэй бодлого биш; сонат сайхан гэдгийг надад хэн ч математикаар харуулж чадахгүй. Гэсэн ч би түүнийг сайхан гэж нэрлэхдээ зөвхөн хувийн таашаалаас хамаагүй илүүг баталдаг. Би нөгөө хүнийг өөрийн чихээр сонсохыг урьж, тэр дүлий хэвээр үлдвэл урам хугардаг — гүзээлзгэнэтэй зайрмаг дурлах төдий зүйлд би хэзээ ч тэгэхгүй. Тэгэхээр амт баримтын хүйтэн ертөнцөд ч, дур зоргийн эрхшээлд ч биш, харин би дүгнэж, зэрэгцээд зөвшөөрөл эрэлхийлдэг тэрхүү хачирхалтай завсрын оронд оршдог. Амтны талаар маргадаггүй хүн түүнийг нухацтай авахаа больсон хэрэг.',
    question: 'Зохиогчийн үзлээр амт (гоо зүйн дүгнэлт) хаана оршдог вэ?',
    choices: ['Баримтын хүйтэн ертөнцөд', 'Дур зоргийн эрхшээлд', 'Дүгнэж, зэрэгцээд зөвшөөрөл эрэлхийлдэг завсрын оронд'], correctIndex: 2,
    questions: [
      {
        question: 'Зохиогчийн үзлээр амт (гоо зүйн дүгнэлт) хаана оршдог вэ?',
        choices: ['Баримтын хүйтэн ертөнцөд', 'Дур зоргийн эрхшээлд', 'Дүгнэж, зэрэгцээд зөвшөөрөл эрэлхийлдэг завсрын оронд'], correctIndex: 2,
        hint: '"weder … noch …, sondern in jenem sonderbaren Zwischenreich" хэсгийг сонс.',
        explanation: '"in jenem sonderbaren Zwischenreich, wo ich urteile und zugleich um Zustimmung werbe" — амт баримт ч биш, дур зорго ч биш, харин бусдын зөвшөөрлийг эрэлхийлдэг дүгнэлт.',
      },
      {
        question: 'Зохиогчийн үзлээр "амтны талаар маргадаггүй" нь юу гэсэн үг вэ?',
        choices: ['Амтыг хүндэлж байгаа хэрэг', 'Амтыг нухацтай авахаа больсон хэрэг', 'Амт бүх хүнд адил гэсэн үг'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "hat aufgehört, ihn ernst zu nehmen".',
        explanation: '"hat aufgehört, ihn ernst zu nehmen" — маргалдахгүй байх нь амтыг хүндэлсэн биш, харин нухацтай авахаа больсон гэсэн үг.',
      },
    ],
  },
  {
    id: 676, level: 'C2', topic: 'Мэтгэлцээн',
    title: 'Debattenbeitrag: Autorität', titleMn: 'Мэтгэлцээний үг: Эрх мэдэл (autoritet)',
    audioText: 'Verehrte Anwesende, es ist Mode geworden, jede Autorität für autoritär zu erklären und mit dem Gestus der Befreiung abzuschütteln. Doch dieser Reflex verwechselt zwei grundverschiedene Dinge. Autorität im echten Sinne beruht nicht auf Zwang, sondern auf anerkannter Kompetenz — ich folge dem Arzt nicht, weil er mich zwingt, sondern weil ich seinem Wissen vertraue. Wo diese Autorität schwindet, verschwindet keineswegs die Herrschaft; an ihre Stelle tritt lediglich das nackte Machtwort oder die lauteste Stimme im Raum. Eine Gesellschaft ohne jede Autorität ist deshalb kein Reich der Mündigen, sondern eine Arena, in der sich der Rücksichtsloseste durchsetzt. Nicht die Autorität ist der Feind der Freiheit — ihr Feind ist die Autorität, die sich nicht mehr rechtfertigen muss.',
    transcriptMn: 'Эрхэм хүндэт оролцогчид оо, аливаа эрх мэдлийг дарангуйлагч гэж зарлаад чөлөөлөлтийн дүрээр сэгсрэн зайлуулах нь моод болжээ. Гэвч энэ рефлекс үндсэндээ өөр хоёр зүйлийг хольж хутгадаг. Жинхэнэ утгаараа эрх мэдэл албадлага дээр бус, харин хүлээн зөвшөөрөгдсөн ур чадвар дээр тулгуурладаг — би эмчийг албаддаг учраас бус, харин мэдлэгт нь итгэдэг учраас дагадаг. Энэ эрх мэдэл суларсан газар ноёрхол огт алга болдоггүй; түүний оронд зөвхөн нүцгэн эрх мэдлийн үг, эсвэл өрөөн дэх хамгийн чанга дуу хоолой ирдэг. Тиймээс ямар ч эрх мэдэлгүй нийгэм эрх чөлөөтэй иргэдийн орон биш, харин хамгийн хайр найргүй нэгэн ноёрхдог тавцан болдог. Эрх мэдэл эрх чөлөөний дайсан биш — түүний дайсан бол өөрийгөө зөвтгөх шаардлагагүй болсон эрх мэдэл юм.',
    question: 'Илтгэгчийн үзлээр жинхэнэ эрх мэдэл юун дээр тулгуурладаг вэ?',
    choices: ['Хүлээн зөвшөөрөгдсөн ур чадвар дээр', 'Албадлага дээр', 'Хамгийн чанга дуу хоолой дээр'], correctIndex: 0,
    questions: [
      {
        question: 'Илтгэгчийн үзлээр жинхэнэ эрх мэдэл юун дээр тулгуурладаг вэ?',
        choices: ['Хүлээн зөвшөөрөгдсөн ур чадвар дээр', 'Албадлага дээр', 'Хамгийн чанга дуу хоолой дээр'], correctIndex: 0,
        hint: '"nicht auf Zwang, sondern auf anerkannter Kompetenz" хэсгийг сонс.',
        explanation: '"beruht nicht auf Zwang, sondern auf anerkannter Kompetenz" — жинхэнэ эрх мэдэл албадлага биш, хүлээн зөвшөөрөгдсөн ур чадвар дээр тогтдог.',
      },
      {
        question: 'Илтгэгчийн үзлээр эрх чөлөөний жинхэнэ дайсан юу вэ?',
        choices: ['Аливаа эрх мэдэл', 'Өөрийгөө зөвтгөх шаардлагагүй болсон эрх мэдэл', 'Эмчийн зөвлөгөө'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "ihr Feind ist die Autorität, die sich nicht mehr rechtfertigen muss".',
        explanation: '"die Autorität, die sich nicht mehr rechtfertigen muss" — эрх мэдэл өөрөө биш, өөрийгөө зөвтгөхөө больсон эрх мэдэл л дайсан.',
      },
    ],
  },
  {
    id: 677, level: 'C2', topic: 'Эссэ',
    title: 'Radioessay: Melancholie', titleMn: 'Радио эссэ: Меланхоли',
    audioText: 'Unsere Zeit kennt für die Traurigkeit nur noch eine Sprache: die der Diagnose. Wer schwermütig ist, gilt als behandlungsbedürftig, und flugs wird die Melancholie zur Krankheit erklärt, die es zu beheben gilt. Nun will ich das echte Leiden gewiss nicht verharmlosen. Und doch geht mit dieser Medikalisierung etwas verloren. Denn die Melancholie war einst mehr als ein Defekt: Sie war der klarsichtige Blick auf die Vergänglichkeit aller Dinge, jene Schwermut, aus der die schönsten Elegien und die tiefsten Einsichten stammen. Wer jede Trübung sogleich wegtherapiert, gewinnt vielleicht die Heiterkeit — und verliert die Tiefe. Nicht jede Traurigkeit ist ein Symptom; manche ist schlicht die Antwort eines wachen Geistes auf eine Welt, die den Abschied in sich trägt.',
    transcriptMn: 'Бидний цаг үе гунигийн төлөө ганцхан хэлтэй болжээ: онош тавих хэл. Гунигтай хүнийг эмчлүүлэх шаардлагатай гэж үзэн, меланхолийг тэр даруй засах ёстой өвчин болгон зарладаг. Би жинхэнэ зовлонг хөнгөвчлөх гэсэнгүй. Гэсэн ч энэ эмчилгээжүүлэлттэй хамт нэг зүйл гээгддэг. Учир нь меланхоли нэгэнтээ зүгээр л согогоос илүү зүйл байсан: тэр бүх зүйлийн мөнх бус байдлыг тод харах харц, хамгийн сайхан гашуудлын шүлэг, хамгийн гүн ухаарал төрдөг тэрхүү гуниг байлаа. Аливаа бүрхэгийг тэр дороо эмчилгээгээр арилгадаг хүн магадгүй хөгжилтэй байдлыг олох ч гүнзгий байдлыг алддаг. Гуниг бүр шинж тэмдэг биш; зарим нь зүгээр л салалтыг өөртөө агуулсан ертөнцөд сэрүүн оюуны өгч буй хариулт болой.',
    question: 'Зохиогчийн үзлээр меланхоли нэгэн цагт юу байсан бэ?',
    choices: ['Эмчлэх ёстой өвчин', 'Хэрэггүй сул тал', 'Бүх зүйлийн мөнх бус байдлыг тод харах харц'], correctIndex: 2,
    questions: [
      {
        question: 'Зохиогчийн үзлээр меланхоли нэгэн цагт юу байсан бэ?',
        choices: ['Эмчлэх ёстой өвчин', 'Хэрэггүй сул тал', 'Бүх зүйлийн мөнх бус байдлыг тод харах харц'], correctIndex: 2,
        hint: '"der klarsichtige Blick auf die Vergänglichkeit aller Dinge" хэсгийг сонс.',
        explanation: '"der klarsichtige Blick auf die Vergänglichkeit aller Dinge" — меланхоли зүгээр л согог биш, гүн ухаарлын эх сурвалж байсан.',
      },
      {
        question: 'Аливаа гунигийг эмчилгээгээр арилгах нь юу авчирч, юуг алддаг вэ?',
        choices: ['Гүнзгий байдлыг олж, хөгжилтэй байдлыг алддаг', 'Хөгжилтэй байдлыг олж, гүнзгий байдлыг алддаг', 'Юу ч өөрчлөгддөггүй'], correctIndex: 1,
        hint: '"gewinnt vielleicht die Heiterkeit — und verliert die Tiefe" хэсгийг сонс.',
        explanation: '"gewinnt vielleicht die Heiterkeit — und verliert die Tiefe" — хөгжилтэй байдлыг олж болох ч гүнзгий байдлаа алддаг.',
      },
    ],
  },
  {
    id: 678, level: 'C2', topic: 'Илтгэл',
    title: 'Rede: Das Fremde und das Eigene', titleMn: 'Илтгэл: Харь ба өөрийн зүйл',
    audioText: 'Verehrte Gäste, man beschwört heute das Eigene, als wäre es ein reiner Quell, den es vor der Trübung durch das Fremde zu bewahren gälte. Doch werfen wir einen Blick in die eigene Geschichte, so zerrinnt diese Reinheit zwischen den Fingern. Die Sprache, die wir für urdeutsch halten, ist durchsetzt von lateinischen, französischen, arabischen Wörtern; die Kartoffel, das Symbol bodenständiger Kost, kam aus den Anden. Das Eigene ist niemals der Ursprung, sondern stets das Ergebnis unzähliger Begegnungen mit dem Fremden. Wer die Kultur vom Fremden reinigen wollte, zerstörte eben jene Kultur, die er zu verteidigen vorgibt. Nicht das Fremde bedroht das Eigene — bedroht wird es allein von der Illusion, es habe je ohne das Fremde bestanden.',
    transcriptMn: 'Эрхэм зочид оо, өнөөдөр өөрийн зүйлийг харийн хиртлээс хамгаалах ёстой цэвэр эх булаг мэт дуудна. Гэвч бид өөрийн түүх рүү нэг харвал энэ цэвэр байдал хуруу хооронд гоожин алга болдог. Бидний цэвэр герман гэж үздэг хэл латин, франц, араб үгсээр шигтгэгдсэн; бат бөх хоолны бэлгэдэл болох төмс Андын нуруунаас ирсэн. Өөрийн зүйл хэзээ ч эх сурвалж биш, харин үргэлж харьтай тоолж баршгүй уулзалтуудын үр дүн юм. Соёлыг харийн зүйлээс цэвэрлэхийг хүссэн хүн хамгаалж буйгаа мэдэгддэг яг тэр соёлыг устгах болно. Харь зүйл өөрийн зүйлд заналхийлдэггүй — түүнд зөвхөн харь зүйлгүйгээр хэзээ нэгэн цагт оршин байсан гэсэн хуурмаг ойлголт л заналхийлдэг.',
    question: 'Илтгэгчийн үзлээр "өөрийн зүйл" (das Eigene) гэж юу вэ?',
    choices: ['Цэвэр, анхдагч эх сурвалж', 'Харьтай тоолж баршгүй уулзалтын үр дүн', 'Хамгаалах ёстой байгалийн өв'], correctIndex: 1,
    questions: [
      {
        question: 'Илтгэгчийн үзлээр "өөрийн зүйл" (das Eigene) гэж юу вэ?',
        choices: ['Цэвэр, анхдагч эх сурвалж', 'Харьтай тоолж баршгүй уулзалтын үр дүн', 'Хамгаалах ёстой байгалийн өв'], correctIndex: 1,
        hint: '"niemals der Ursprung, sondern stets das Ergebnis …" хэсгийг сонс.',
        explanation: '"stets das Ergebnis unzähliger Begegnungen mit dem Fremden" — өөрийн зүйл цэвэр эх сурвалж биш, харийн уулзалтуудын үр дүн.',
      },
      {
        question: 'Илтгэгчийн үзлээр өөрийн зүйлд юу нь үнэндээ заналхийлдэг вэ?',
        choices: ['Харь зүйл', 'Харь зүйлгүйгээр оршин байсан гэсэн хуурмаг ойлголт', 'Хэлний өөрчлөлт'], correctIndex: 1,
        hint: 'Сүүлчийн өгүүлбэр: "bedroht wird es allein von der Illusion …".',
        explanation: '"von der Illusion, es habe je ohne das Fremde bestanden" — харь зүйл биш, харин "цэвэр гарал"-ын хуурмаг ойлголт л жинхэнэ аюул.',
      },
    ],
  },
];
