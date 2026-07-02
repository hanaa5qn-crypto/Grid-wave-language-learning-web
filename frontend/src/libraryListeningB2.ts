// =============================================================================
// Vivid-Lingua — B2 түвшний сонсголын өргөтгөл
// -----------------------------------------------------------------------------
// Энэ файл нь B2 түвшний сонсгол (listening) дасгалын өргөтгөл бөгөөд 15 шинэ
// контент агуулна. Id-нууд 621-635 хооронд, өмнөх сангуудтай (1-52, 101-…)
// хэзээ ч мөргөлдөхгүй. Ярилцлага, лекц, подкаст, репортаж зэрэг монолог
// хэлбэрийн бодит амьдралын сэдвүүд.
// =============================================================================

import type { ListeningItem } from './library';

export const LISTENING_EXPANSION_B2: ListeningItem[] = [
  {
    id: 621, level: 'B2', topic: 'Радио ярилцлага',
    title: 'Interview: Minimalismus', titleMn: 'Ярилцлага: Минимализм',
    audioText: 'Vor drei Jahren habe ich angefangen, mein Leben zu vereinfachen, und ich habe es nie bereut. Damals besaß ich unzählige Dinge, die kaum benutzt wurden und mir eigentlich nur Stress bereiteten. Einerseits fällt es am Anfang schwer, sich von Erinnerungsstücken zu trennen, andererseits spürt man schon nach wenigen Wochen eine spürbare Erleichterung. Heute würde ich nie wieder so viel besitzen wollen, denn Minimalismus hat mir gezeigt, dass Freiheit oft wichtiger ist als Besitz. Allerdings bedeutet das nicht, dass man auf alles verzichten sollte, denn es geht vielmehr um bewusste Entscheidungen.',
    transcriptMn: 'Гурван жилийн өмнө би амьдралаа хялбарчлаж эхэлсэн бөгөөд хэзээ ч харамссангүй. Тэр үед би бараг ашигладаггүй, харин зөвхөн стресс өгдөг тоо томшгүй эд зүйлстэй байсан. Нэг талаас дурсамжтай зүйлээсээ салахад эхэндээ хэцүү санагддаг, нөгөө талаас хэдхэн долоо хоногийн дараа мэдэгдэхүйц хөнгөрөлт мэдрэгддэг. Өнөөдөр би дахин хэзээ ч ийм их зүйл эзэмшихийг хүсэхгүй байх байсан, учир нь минимализм надад эрх чөлөө нь эзэмшлээс илүү чухал болохыг харуулсан. Гэсэн хэдий ч энэ нь бүх зүйлээс татгалзах ёстой гэсэн үг биш, харин ухамсартай шийдвэр гаргах тухай асуудал юм.',
    question: 'Тэрээр амьдралаа хялбарчлаад юу мэдэрсэн бэ?',
    choices: ['Улам их стресс', 'Ямар ч өөрчлөлт мэдрээгүй', 'Мэдэгдэхүйц хөнгөрөлт'], correctIndex: 2,
    questions: [
      {
        question: 'Тэрээр амьдралаа хялбарчлаад юу мэдэрсэн бэ?',
        choices: ['Улам их стресс', 'Ямар ч өөрчлөлт мэдрээгүй', 'Мэдэгдэхүйц хөнгөрөлт'], correctIndex: 2,
        hint: '"andererseits spürt man …" гэсэн хэсгийг сонс.',
        explanation: '"spürt man schon nach wenigen Wochen eine spürbare Erleichterung" — хэдхэн долоо хоногийн дараа хөнгөрөлт мэдэрдэг гэж хэлсэн.',
      },
      {
        question: 'Минимализм түүнд юуг харуулсан бэ?',
        choices: ['Мөнгө хамгийн чухал', 'Эрх чөлөө нь эзэмшлээс илүү чухал', 'Эд зүйл олон байх тусам сайн'], correctIndex: 1,
        hint: 'Дунд хэсгийн "Minimalismus hat mir gezeigt …" өгүүлбэрийг сонс.',
        explanation: '"Minimalismus hat mir gezeigt, dass Freiheit oft wichtiger ist als Besitz" — эрх чөлөө эзэмшлээс илүү чухал гэдгийг ойлгуулсан.',
      },
    ],
  },
  {
    id: 622, level: 'B2', topic: 'Лекц',
    title: 'Vortrag: Erneuerbare Energien im Alltag', titleMn: 'Лекц: Өдөр тутмын сэргээгддэг эрчим хүч',
    audioText: 'Guten Tag, meine Damen und Herren. Heute möchte ich zeigen, wie erneuerbare Energien längst in unserem Alltag angekommen sind. Immer mehr Haushalte werden mit Solarstrom vom eigenen Dach versorgt, und auch kleine Balkonkraftwerke erfreuen sich wachsender Beliebtheit. Dennoch wird oft übersehen, dass der größte Hebel nicht die Technik allein ist, sondern der bewusste Umgang mit Energie im täglichen Leben. Wenn jeder Einzelne seinen Verbrauch nur geringfügig senken würde, ließe sich der Effekt auf nationaler Ebene enorm steigern.',
    transcriptMn: 'Сайн байна уу, эрхэм ноёд, хатагтай нар. Өнөөдөр би сэргээгддэг эрчим хүч бидний өдөр тутмын амьдралд хэрхэн аль хэдийн орж ирснийг харуулахыг хүсэж байна. Улам олон өрх гэрийн дээвэр дээрх нар цахилгаанаар хангагдаж байгаа бөгөөд балконы жижиг цахилгаан станцууд ч улам түгээмэл болж байна. Гэсэн хэдий ч хамгийн том хүчин зүйл нь техник ганцаараа биш, харин өдөр тутмын амьдралд эрчим хүчийг ухамсартай ашиглах явдал гэдгийг ихэвчлэн үл тоомсорлодог. Хэрэв хүн бүр хэрэглээгээ бага зэрэг л бууруулбал, үндэсний хэмжээнд үр дүн асар их нэмэгдэх байсан.',
    question: 'Илтгэгчийн үзэж байгаагаар хамгийн том хүчин зүйл юу вэ?',
    choices: ['Эрчим хүчийг ухамсартай хэрэглэх', 'Зөвхөн шинэ техник', 'Улсын хууль тогтоомж'], correctIndex: 0,
    questions: [
      {
        question: 'Илтгэгчийн үзэж байгаагаар хамгийн том хүчин зүйл юу вэ?',
        choices: ['Эрчим хүчийг ухамсартай хэрэглэх', 'Зөвхөн шинэ техник', 'Улсын хууль тогтоомж'], correctIndex: 0,
        hint: '"der größte Hebel …" гэсэн өгүүлбэрийг сонс.',
        explanation: '"der größte Hebel nicht die Technik allein ist, sondern der bewusste Umgang mit Energie" — ухамсартай хэрэглээ гол хүчин зүйл гэж хэлсэн.',
      },
      {
        question: 'Балконы жижиг цахилгаан станцын талаар юу гэж хэлсэн бэ?',
        choices: ['Хориотой болсон', 'Үнэтэй тул ховор ашигладаг', 'Улам түгээмэл болж байна'], correctIndex: 2,
        hint: 'Хоёр дахь өгүүлбэрийг анхаар.',
        explanation: '"auch kleine Balkonkraftwerke erfreuen sich wachsender Beliebtheit" — балконы станцууд улам их алдартай болж байна.',
      },
    ],
  },
  {
    id: 623, level: 'B2', topic: 'Подкаст',
    title: 'Podcast: Fernstudium', titleMn: 'Подкаст: Зайны сургалт',
    audioText: 'Willkommen zu unserer Podcast-Folge über das Fernstudium. Viele Hörerinnen und Hörer fragen sich, ob ein Studium ohne feste Vorlesungszeiten überhaupt funktionieren kann. Tatsächlich zeigt sich, dass Selbstdisziplin dabei entscheidender ist als beim klassischen Präsenzstudium, da niemand einen an feste Termine erinnert. Andererseits bietet diese Studienform enorme Flexibilität, sodass Beruf, Familie und Lernen miteinander vereinbart werden können. Wer sich allerdings keinen festen Lernplan setzt, läuft schnell Gefahr, den Anschluss zu verlieren.',
    transcriptMn: 'Фэрнштудиумын тухай манай подкастын дугаарт тавтай морил. Олон сонсогч тогтмол хичээлийн цагаагүй сургалт ерөнхийдөө боломжтой юу гэж асуудаг. Үнэн хэрэгтээ, хэн ч тогтмол хугацааг сануулдаггүй тул уламжлалт танхимын сургалттай харьцуулахад өөрийгөө захирах чадвар илүү шийдвэрлэх ач холбогдолтой болохыг харуулж байна. Нөгөө талаас энэ сургалтын хэлбэр асар их уян хатан байдал өгдөг тул ажил, гэр бүл, сурах үйл явцыг хослуулах боломжтой. Харин тогтмол сургалтын төлөвлөгөө гаргаагүй хүн хичээлээсээ хоцрох эрсдэлтэй.',
    question: 'Фэрнштудиумд юу илүү шийдвэрлэх ач холбогдолтой вэ?',
    choices: ['Багшийн тусламж', 'Өөрийгөө захирах чадвар', 'Сургуулийн байршил'], correctIndex: 1,
    questions: [
      {
        question: 'Фэрнштудиумд юу илүү шийдвэрлэх ач холбогдолтой вэ?',
        choices: ['Багшийн тусламж', 'Өөрийгөө захирах чадвар', 'Сургуулийн байршил'], correctIndex: 1,
        hint: '"Selbstdisziplin dabei entscheidender ist …" гэсэн хэсгийг сонс.',
        explanation: '"Selbstdisziplin dabei entscheidender ist als beim klassischen Präsenzstudium" — өөрийгөө захирах чадвар илүү чухал гэсэн.',
      },
      {
        question: 'Тогтмол төлөвлөгөөгүй хүнд ямар эрсдэл заналхийлж байна вэ?',
        choices: ['Хичээлээсээ хоцрох', 'Илүү их цалин авах', 'Улирлын шалгалтаас чөлөөлөгдөх'], correctIndex: 0,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"läuft schnell Gefahr, den Anschluss zu verlieren" — хичээлээсээ хоцрох эрсдэлтэй гэж хэлсэн.',
      },
    ],
  },
  {
    id: 624, level: 'B2', topic: 'Хэлэлцүүлэг',
    title: 'Diskussion: Vier-Tage-Woche', titleMn: 'Хэлэлцүүлэг: Дөрвөн өдрийн долоо хоног',
    audioText: 'Ich bin überzeugt, dass die Vier-Tage-Woche vielen Unternehmen guttun würde. Studien zeigen, dass Mitarbeitende bei kürzerer Arbeitszeit oft konzentrierter und motivierter arbeiten, weil ihnen mehr Erholung bleibt. Allerdings darf man nicht vergessen, dass diese Umstellung nicht in jeder Branche gleich einfach umzusetzen ist, etwa im Gesundheitswesen oder im Einzelhandel. Dennoch wäre es falsch, das Modell von vornherein abzulehnen, nur weil es Herausforderungen mit sich bringt. Meiner Meinung nach sollten mehr Betriebe zumindest Pilotprojekte wagen, bevor sie ein endgültiges Urteil fällen.',
    transcriptMn: 'Дөрвөн өдрийн долоо хоног олон компанид ашигтай байх болно гэдэгт би итгэлтэй байна. Судалгаагаар ажилтнууд ажлын цаг богиносоход илүү анхаарал төвлөрсөн, урам зоригтой ажилладаг болохыг харуулдаг, учир нь тэдэнд амрах цаг илүү үлддэг. Гэсэн хэдий ч энэ шилжилтийг эрүүл мэндийн салбар, жижиглэнгийн худалдаа зэрэг бүх салбарт адилхан амархан хэрэгжүүлж чадахгүй гэдгийг мартаж болохгүй. Гэвч зөвхөн бэрхшээл дагуулдаг гэдэг шалтгаанаар энэ загварыг эхнээс нь няцаах нь буруу байх байсан. Миний бодлоор эцсийн шийдвэр гаргахаасаа өмнө илүү олон компани дор хаяж туршилтын төсөл хэрэгжүүлж үзэх ёстой.',
    question: 'Ажлын цаг богиносоход ажилтнууд ямар байдалтай ажилладаг вэ?',
    choices: ['Илүү залхуу', 'Ямар ч өөрчлөлт үгүй', 'Илүү анхаарал төвлөрсөн, урам зоригтой'], correctIndex: 2,
    questions: [
      {
        question: 'Ажлын цаг богиносоход ажилтнууд ямар байдалтай ажилладаг вэ?',
        choices: ['Илүү залхуу', 'Ямар ч өөрчлөлт үгүй', 'Илүү анхаарал төвлөрсөн, урам зоригтой'], correctIndex: 2,
        hint: 'Хоёр дахь өгүүлбэрийг сонс.',
        explanation: '"Mitarbeitende bei kürzerer Arbeitszeit oft konzentrierter und motivierter arbeiten" — илтгэгч ийнхүү тайлбарласан.',
      },
      {
        question: 'Илтгэгч ямар зөвлөмж өгсөн бэ?',
        choices: ['Загварыг бүрмөсөн хориглох', 'Дор хаяж туршилтын төсөл хэрэгжүүлэх', 'Зөвхөн эрүүл мэндийн салбарт хэрэгжүүлэх'], correctIndex: 1,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"sollten mehr Betriebe zumindest Pilotprojekte wagen" — дор хаяж туршилтын төсөл хэрэгжүүлэхийг зөвлөсөн.',
      },
    ],
  },
  {
    id: 625, level: 'B2', topic: 'Тайлан',
    title: 'Bericht: Lebensmittelverschwendung', titleMn: 'Тайлан: Хүнсний хог хаягдал',
    audioText: 'In Deutschland werden jedes Jahr Millionen Tonnen Lebensmittel weggeworfen, obwohl sie noch genießbar wären. Ein großer Teil davon entsteht bereits in Privathaushalten, wo abgelaufene Mindesthaltbarkeitsdaten häufig mit tatsächlichem Verderb verwechselt werden. Supermärkte tragen ebenfalls zur Verschwendung bei, da optisch unperfektes Obst und Gemüse oft aussortiert wird, bevor es überhaupt in die Regale gelangt. Initiativen wie sogenannte Rettungs-Apps versuchen gegenzusteuern, indem übrig gebliebene Ware vergünstigt an Verbraucher vermittelt wird. Trotzdem bleibt das Grundproblem bestehen, solange sich das Konsumverhalten nicht grundlegend ändert.',
    transcriptMn: 'Германд жил бүр сая сая тонн хүнсний бүтээгдэхүүн иддэг байсан ч хогийн саванд хаягддаг. Үүний ихэнх хэсэг нь гэр бүлийн хэрэглээнд аль хэдийн үүсдэг бөгөөд хамгийн бага хадгалах хугацаа дууссан гэдгийг бодит муудсантай ихэвчлэн андуурдаг. Дэлгүүрүүд ч мөн хог хаягдалд хувь нэмэр оруулдаг, учир нь харагдах байдал муутай жимс, ногоог тавиур дээр гарахаас өмнө ихэвчлэн ялгаж хаядаг. Тусгай апп ашигладаг санаачилгууд үлдэгдэл барааг хямдруулан хэрэглэгчдэд хүргэж энэ асуудлыг шийдэхийг оролддог. Гэсэн хэдий ч хэрэглээний зан үйл эрс өөрчлөгдөхгүй л бол үндсэн асуудал хэвээр үлдэнэ.',
    question: 'Гэр бүлийн хэрэглээнд ямар алдаа гардаг вэ?',
    choices: ['Хугацаа дууссаныг бодит муудсантай андуурдаг', 'Хэт олон хоол хийдэг', 'Хүнс худалдаж авдаггүй'], correctIndex: 0,
    questions: [
      {
        question: 'Гэр бүлийн хэрэглээнд ямар алдаа гардаг вэ?',
        choices: ['Хугацаа дууссаныг бодит муудсантай андуурдаг', 'Хэт олон хоол хийдэг', 'Хүнс худалдаж авдаггүй'], correctIndex: 0,
        hint: '"abgelaufene Mindesthaltbarkeitsdaten …" гэсэн хэсгийг сонс.',
        explanation: '"abgelaufene Mindesthaltbarkeitsdaten häufig mit tatsächlichem Verderb verwechselt werden" — хугацаа дуусахыг бодит муудалтай андуурдаг.',
      },
      {
        question: 'Тусгай апп ямар үүрэг гүйцэтгэдэг вэ?',
        choices: ['Дэлгүүрийг хаадаг', 'Хүнсний үнийг өсгөдөг', 'Үлдэгдэл барааг хямдруулан хэрэглэгчдэд хүргэдэг'], correctIndex: 2,
        hint: 'Дөрөв дэх өгүүлбэрийг сонс.',
        explanation: '"übrig gebliebene Ware vergünstigt an Verbraucher vermittelt wird" — үлдэгдэл барааг хямдруулан хэрэглэгчдэд хүргэдэг.',
      },
    ],
  },
  {
    id: 626, level: 'B2', topic: 'Ярилцлага',
    title: 'Interview: Auswandern', titleMn: 'Ярилцлага: Цагаачлал',
    audioText: 'Als ich vor fünf Jahren nach Kanada ausgewandert bin, hätte ich nie gedacht, wie sehr sich mein Leben verändern würde. Am Anfang war vieles einfacher, als ich befürchtet hatte, etwa die Wohnungssuche oder die Jobsuche in meiner Branche. Schwieriger war hingegen der emotionale Abschied von Familie und Freunden, den man vorher kaum einschätzen kann. Einerseits vermisse ich bis heute bestimmte Kleinigkeiten aus der Heimat, andererseits würde ich die Entscheidung jederzeit wieder treffen. Wer auswandern möchte, sollte sich jedoch bewusst machen, dass Heimweh ein ständiger Begleiter bleibt.',
    transcriptMn: 'Таван жилийн өмнө би Канад руу цагаачлахдаа амьдрал минь ийм их өөрчлөгдөнө гэж огт бодоогүй. Эхэндээ орон сууц хайх, мэргэжлээрээ ажил хайх зэрэг олон зүйл айж байснаас илүү амархан байсан. Харин гэр бүл, найз нөхдөөсөө сэтгэл санааны хувьд салах нь урьдчилан төсөөлөхөд бэрх байв. Нэг талаас би өнөөг хүртэл эх орныхоо зарим жижиг зүйлийг санадаг, нөгөө талаас энэ шийдвэрийг хэдийд ч дахин гаргах байсан. Гэвч цагаачлахыг хүсэж буй хүн эх орноо санах мэдрэмж байнгын хамтрагч хэвээр үлдэнэ гэдгийг ухаарах хэрэгтэй.',
    question: 'Аль нь эхэндээ бодож байснаас илүү амархан байсан бэ?',
    choices: ['Хэл сурах', 'Орон сууц, ажил хайх', 'Найз нөхөд олох'], correctIndex: 1,
    questions: [
      {
        question: 'Аль нь эхэндээ бодож байснаас илүү амархан байсан бэ?',
        choices: ['Хэл сурах', 'Орон сууц, ажил хайх', 'Найз нөхөд олох'], correctIndex: 1,
        hint: 'Хоёр дахь өгүүлбэрийг сонс.',
        explanation: '"vieles einfacher, als ich befürchtet hatte, etwa die Wohnungssuche oder die Jobsuche" — орон сууц, ажил хайх нь амархан байсан.',
      },
      {
        question: 'Юу нь илүү хэцүү байсан бэ?',
        choices: ['Мөнгө олох', 'Гэр бүлээсээ сэтгэл санааны хувьд салах', 'Цаг агаарт дасах'], correctIndex: 1,
        hint: '"Schwieriger war hingegen …" гэсэн хэсгийг сонс.',
        explanation: '"Schwieriger war hingegen der emotionale Abschied von Familie und Freunden" — гэр бүлээсээ салах нь илүү хэцүү байсан.',
      },
    ],
  },
  {
    id: 627, level: 'B2', topic: 'Радио нэвтрүүлэг',
    title: 'Radiobeitrag: Sharing Economy', titleMn: 'Радио нэвтрүүлэг: Хуваалцах эдийн засаг',
    audioText: 'In den letzten Jahren hat sich die sogenannte Sharing Economy fest in unserem Alltag etabliert. Statt ein eigenes Auto zu besitzen, nutzen viele Menschen mittlerweile Carsharing-Dienste, sobald sie ein Fahrzeug tatsächlich benötigen. Befürworter argumentieren, dass dadurch Ressourcen geschont und Kosten gespart werden, da Gegenstände effizienter genutzt werden. Kritiker geben allerdings zu bedenken, dass große Plattformen oft mehr vom Geschäft profitieren als die einzelnen Nutzer selbst. Trotz dieser Debatte wird erwartet, dass der Markt für geteilte Ressourcen in den kommenden Jahren weiter wachsen wird.',
    transcriptMn: 'Сүүлийн жилүүдэд хуваалцах эдийн засаг гэгддэг зүйл бидний өдөр тутмын амьдралд бат бэх суурьшжээ. Өөрийн машинтай байхын оронд олон хүн зөвхөн машин хэрэгтэй болох үедээ car-sharing үйлчилгээг ашигладаг болжээ. Дэмжигчид энэ нь эд зүйлийг илүү үр ашигтай ашигладаг тул нөөц хэмнэж, зардал бууруулдаг гэж үздэг. Харин шүүмжлэгчид том платформууд бие даасан хэрэглэгчдээс илүү ашиг олдог гэдгийг анхаарахыг хүсдэг. Энэ маргаан үргэлжилсэн ч хуваалцсан нөөцийн зах зээл ирэх жилүүдэд улам өсөх төлөвтэй гэж таамаглаж байна.',
    question: 'Дэмжигчид Sharing Economy-ийн ямар давуу талыг онцолж байна вэ?',
    choices: ['Ажлын байр нэмэгддэг', 'Татвар бага байдаг', 'Нөөц хэмнэж, зардал бууруулдаг'], correctIndex: 2,
    questions: [
      {
        question: 'Дэмжигчид Sharing Economy-ийн ямар давуу талыг онцолж байна вэ?',
        choices: ['Ажлын байр нэмэгддэг', 'Татвар бага байдаг', 'Нөөц хэмнэж, зардал бууруулдаг'], correctIndex: 2,
        hint: '"Befürworter argumentieren …" гэсэн хэсгийг сонс.',
        explanation: '"Ressourcen geschont und Kosten gespart werden" — нөөц хэмнэгдэж, зардал буурдаг гэдгийг дэмжигчид онцолсон.',
      },
      {
        question: 'Шүүмжлэгчид юуг анхаарахыг хүсдэг вэ?',
        choices: ['Үйлчилгээ маш үнэтэй', 'Хууль эрх зүйн орон зай байхгүй', 'Том платформууд илүү ашиг олдог'], correctIndex: 2,
        hint: '"Kritiker geben allerdings zu bedenken …" гэсэн хэсгийг сонс.',
        explanation: '"große Plattformen oft mehr vom Geschäft profitieren als die einzelnen Nutzer" — том платформууд илүү ашиг олдгийг шүүмжлэгчид дурдсан.',
      },
    ],
  },
  {
    id: 628, level: 'B2', topic: 'Подкаст',
    title: 'Podcast: Berufswechsel', titleMn: 'Подкаст: Мэргэжил солих',
    audioText: 'In dieser Folge sprechen wir über Menschen, die mit über vierzig noch einmal komplett neu anfangen. Viele unserer Hörer schreiben uns, dass sie sich einen Berufswechsel wünschen, aber Angst vor dem finanziellen Risiko haben. Interessanterweise zeigen Umfragen, dass die meisten Quereinsteiger im Rückblick sagen, sie hätten den Schritt schon früher wagen sollen. Natürlich sollte man eine solche Entscheidung nicht leichtfertig treffen, sondern sich vorher gründlich informieren und wenn möglich finanzielle Rücklagen bilden. Am Ende überwiegt bei den meisten jedoch das Gefühl, dass sich der Mut gelohnt hat.',
    transcriptMn: 'Энэ дугаарт бид дөчөөс дээш насандаа бүрмөсөн шинээр эхэлсэн хүмүүсийн тухай ярилцах болно. Олон сонсогч бидэнд мэргэжил солихыг хүсдэг ч санхүүгийн эрсдэлээс айдаг гэж бичдэг. Сонирхолтой нь, судалгаагаар ихэнх шинэ мэргэжилтэй болсон хүмүүс эргэн харахад энэ алхмыг илүү эрт хийх ёстой байсан гэж хэлдэг. Мэдээж ийм шийдвэрийг хөнгөмсгөөр гаргаж болохгүй, харин урьдчилан сайтар мэдээлэл цуглуулж, боломжтой бол санхүүгийн нөөц бүрдүүлэх хэрэгтэй. Гэхдээ эцэст нь ихэнх хүн зориг гаргасандаа өртэй байгаагаа мэдэрдэг.',
    question: 'Судалгаагаар шинэ мэргэжилтэй болсон хүмүүс юу гэж хэлдэг вэ?',
    choices: ['Алхмыг илүү эрт хийх ёстой байсан', 'Хэзээ ч мэргэжил солих ёсгүй', 'Санхүүгийн эрсдэл байхгүй байсан'], correctIndex: 0,
    questions: [
      {
        question: 'Судалгаагаар шинэ мэргэжилтэй болсон хүмүүс юу гэж хэлдэг вэ?',
        choices: ['Алхмыг илүү эрт хийх ёстой байсан', 'Хэзээ ч мэргэжил солих ёсгүй', 'Санхүүгийн эрсдэл байхгүй байсан'], correctIndex: 0,
        hint: '"Interessanterweise zeigen Umfragen …" гэсэн хэсгийг сонс.',
        explanation: '"sie hätten den Schritt schon früher wagen sollen" — алхмыг илүү эрт хийх ёстой байсан гэж хэлдэг.',
      },
      {
        question: 'Мэргэжил сольсноор эцэст нь ихэнх хүн юу мэдэрдэг вэ?',
        choices: ['Зориг гаргасандаа өртэй байдаг', 'Харамсдаг', 'Юу ч мэдрэхгүй'], correctIndex: 0,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"das Gefühl, dass sich der Mut gelohnt hat" — зориг гаргасандаа өртэй байгаагаа мэдэрдэг.',
      },
    ],
  },
  {
    id: 629, level: 'B2', topic: 'Тайлан',
    title: 'Bericht: Urban Gardening', titleMn: 'Тайлан: Хотын цэцэрлэг',
    audioText: 'Immer mehr Städte entdecken sogenannte Stadtgärten als Antwort auf den Wunsch nach mehr Grün im urbanen Raum. Auf ungenutzten Dachflächen oder brachliegenden Grundstücken werden Gemüsebeete angelegt, die von Nachbarschaften gemeinsam gepflegt werden. Neben dem ökologischen Nutzen entsteht dabei auch ein sozialer Effekt, da Menschen unterschiedlicher Herkunft und Generationen zusammenkommen. Kritisch angemerkt wird allerdings, dass viele Projekte nur befristete Nutzungsverträge erhalten und deshalb keine langfristige Planung möglich ist. Dennoch gelten Stadtgärten mittlerweile als wichtiger Baustein einer nachhaltigeren Stadtentwicklung.',
    transcriptMn: 'Хотуудад ногоон орон зайн хэрэгцээнд хариу болгон хотын цэцэрлэг гэгддэг зүйл улам их түгээмэл болж байна. Ашиглагдаагүй дээвэр эсвэл хоосон талбайд хөрш зэргэлдээх иргэд хамтдаа арчилдаг ногооны маллаа байгуулж байна. Экологийн ач тустай төдийгүй, өөр өөр угсаа, үеийн хүмүүс нэгддэг тул нийгмийн үр нөлөө ч гардаг. Гэсэн хэдий ч олон төсөл зөвхөн хугацаатай ашиглалтын гэрээ авдаг тул урт хугацааны төлөвлөлт хийх боломжгүй гэдгийг шүүмжлэн тэмдэглэдэг. Гэсэн ч хотын цэцэрлэгүүд одоо тогтвортой хотжилтын чухал бүрэлдэхүүн хэсэг гэж тооцогддог.',
    question: 'Хотын цэцэрлэг ямар нийгмийн үр нөлөөтэй вэ?',
    choices: ['Гэмт хэрэг буурдаг', 'Өөр өөр угсаа, үеийн хүмүүс нэгддэг', 'Ажлын байр нэмэгддэг'], correctIndex: 1,
    questions: [
      {
        question: 'Хотын цэцэрлэг ямар нийгмийн үр нөлөөтэй вэ?',
        choices: ['Гэмт хэрэг буурдаг', 'Өөр өөр угсаа, үеийн хүмүүс нэгддэг', 'Ажлын байр нэмэгддэг'], correctIndex: 1,
        hint: '"ein sozialer Effekt …" гэсэн хэсгийг сонс.',
        explanation: '"Menschen unterschiedlicher Herkunft und Generationen zusammenkommen" — өөр өөр угсаа, үеийн хүмүүс нэгддэг гэж хэлсэн.',
      },
      {
        question: 'Олон төслийн сул тал юу вэ?',
        choices: ['Маш үнэтэй', 'Хугацаатай ашиглалтын гэрээ, урт хугацааны төлөвлөлт хийх боломжгүй', 'Хууль ёсны бус'], correctIndex: 1,
        hint: '"Kritisch angemerkt wird allerdings …" гэсэн хэсгийг сонс.',
        explanation: '"viele Projekte nur befristete Nutzungsverträge erhalten und deshalb keine langfristige Planung möglich ist" — гэрээ хугацаатай тул төлөвлөлт хийхэд хэцүү.',
      },
    ],
  },
  {
    id: 630, level: 'B2', topic: 'Ярилцлага',
    title: 'Interview: Sportvereine im Wandel', titleMn: 'Ярилцлага: Өөрчлөгдөж буй спортын клубууд',
    audioText: 'Als Vereinsvorsitzender beobachte ich seit Jahren, wie sich klassische Sportvereine verändern müssen, um zu überleben. Früher reichte es, einmal wöchentlich zum Training zu erscheinen, doch heute erwarten viele Mitglieder flexiblere Angebote ohne feste Bindung. Einerseits verlieren wir dadurch traditionelle Vereinsstrukturen, andererseits gewinnen wir neue Zielgruppen, die sich sonst nie angemeldet hätten. Besonders junge Menschen würden sich wohl kaum noch langfristig binden, wenn wir nicht auch digitale Angebote wie Online-Kurse anbieten würden. Deshalb investieren wir derzeit viel in eine moderne App, über die sich Kurse spontan buchen lassen.',
    transcriptMn: 'Клубын даргын хувьд би сүүлийн жилүүдэд уламжлалт спортын клубууд амьд үлдэхийн тулд яаж өөрчлөгдөх ёстойг ажиглаж байна. Урьд нь долоо хоногт нэг удаа дасгалжуулалтад ирвэл хангалттай байсан бол өнөөдөр олон гишүүн тогтмол хамааралгүй уян хатан үйлчилгээг хүсдэг. Нэг талаас бид уламжлалт клубын бүтцээ алдаж байгаа боловч нөгөө талаас өмнө нь хэзээ ч бүртгүүлэхгүй байсан шинэ зорилтот бүлгийг олж авч байна. Ялангуяа залуучууд бид онлайн курс зэрэг цахим үйлчилгээ санал болгохгүй бол урт хугацаанд холбогдохгүй байх байсан. Тиймээс бид одоо курсуудыг агшин зуур захиалж болох орчин үеийн апп хөгжүүлэхэд их хөрөнгө оруулж байна.',
    question: 'Өнөөдөр олон гишүүн юу хүсдэг вэ?',
    choices: ['Илүү өндөр татвар', 'Зөвхөн бие даасан дасгал', 'Тогтмол хамааралгүй уян хатан үйлчилгээ'], correctIndex: 2,
    questions: [
      {
        question: 'Өнөөдөр олон гишүүн юу хүсдэг вэ?',
        choices: ['Илүү өндөр татвар', 'Зөвхөн бие даасан дасгал', 'Тогтмол хамааралгүй уян хатан үйлчилгээ'], correctIndex: 2,
        hint: '"heute erwarten viele Mitglieder …" гэсэн хэсгийг сонс.',
        explanation: '"viele Mitglieder flexiblere Angebote ohne feste Bindung" — уян хатан, чөлөөтэй үйлчилгээг олон гишүүн хүсдэг.',
      },
      {
        question: 'Клуб одоо юунд хөрөнгө оруулж байна вэ?',
        choices: ['Шинэ талбай барих', 'Гадаад дасгалжуулагч авах', 'Курс захиалах боломжтой апп'], correctIndex: 2,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"investieren wir derzeit viel in eine moderne App, über die sich Kurse spontan buchen lassen" — курс захиалах апп хөгжүүлэхэд хөрөнгө оруулж байна.',
      },
    ],
  },
  {
    id: 631, level: 'B2', topic: 'Тайлбар нийтлэл',
    title: 'Kommentar: Musikstreaming und Künstler', titleMn: 'Тайлбар: Хөгжим стриминг ба уран бүтээлчид',
    audioText: 'Musikstreaming hat den Zugang zu Musik revolutioniert, doch die Bezahlung der Künstler bleibt ein umstrittenes Thema. Während Hörer für wenige Euro im Monat Zugriff auf Millionen Songs erhalten, verdienen viele Musiker pro Stream nur einen winzigen Bruchteil eines Cents. Befürworter der Plattformen betonen zwar, dass dadurch neue, unbekannte Künstler leichter entdeckt werden können. Dennoch fragen sich immer mehr Kritiker, ob ein System gerecht sein kann, in dem wenige große Stars fast alle Einnahmen erhalten. Es bleibt abzuwarten, ob sich die Vergütungsmodelle in naher Zukunft grundlegend ändern werden.',
    transcriptMn: 'Хөгжим стриминг хөгжимд хандах боломжийг эрс өөрчилсөн ч, уран бүтээлчдийн орлого маргаантай сэдэв хэвээр байна. Сонсогчид сард хэдхэн еврогоор сая сая дуунд хандах боломж авдаг бол олон хөгжимчин нэг стримд ердөө центийн бутархай хэсгийг л олдог. Платформыг дэмжигчид ингэснээр шинэ, тодорхойгүй уран бүтээлчдийг илүү амархан олж болно гэдгийг онцолдог. Гэсэн хэдий ч цөөн том од бараг бүх орлогыг авдаг систем шударга байж чадах уу гэдэгт улам олон шүүмжлэгч эргэлзэж байна. Ойрын ирээдүйд төлбөрийн загвар үндсээрээ өөрчлөгдөх эсэх нь тодорхойгүй хэвээр байна.',
    question: 'Хөгжимчид нэг стримд юу авдаг вэ?',
    choices: ['Центийн бутархай хэсэг', 'Их хэмжээний орлого', 'Ямар ч төлбөр авдаггүй'], correctIndex: 0,
    questions: [
      {
        question: 'Хөгжимчид нэг стримд юу авдаг вэ?',
        choices: ['Центийн бутархай хэсэг', 'Их хэмжээний орлого', 'Ямар ч төлбөр авдаггүй'], correctIndex: 0,
        hint: '"verdienen viele Musiker pro Stream …" гэсэн хэсгийг сонс.',
        explanation: '"verdienen viele Musiker pro Stream nur einen winzigen Bruchteil eines Cents" — нэг стримд центийн бутархай хэсгийг л олдог.',
      },
      {
        question: 'Дэмжигчид платформын ямар давуу талыг онцолдог вэ?',
        choices: ['Шинэ уран бүтээлчдийг илүү амархан олох боломж', 'Дуу бичлэгийн чанар сайжирдаг', 'Тоглолт зохион байгуулах хялбар болдог'], correctIndex: 0,
        hint: '"Befürworter der Plattformen betonen …" гэсэн хэсгийг сонс.',
        explanation: '"neue, unbekannte Künstler leichter entdeckt werden können" — шинэ уран бүтээлчдийг илүү амархан олох боломжийг онцолсон.',
      },
    ],
  },
  {
    id: 632, level: 'B2', topic: 'Репортаж',
    title: 'Reportage: Regionale Produkte', titleMn: 'Репортаж: Орон нутгийн бүтээгдэхүүн',
    audioText: 'Auf dem Wochenmarkt hier in der Kleinstadt boomt derzeit der Verkauf regionaler Produkte wie nie zuvor. Immer mehr Verbraucher legen Wert darauf, zu wissen, woher ihr Gemüse oder ihr Fleisch tatsächlich stammt, statt anonym im Supermarktregal zu landen. Ein örtlicher Bauer erzählte mir, dass seine Umsätze sich in den letzten zwei Jahren fast verdoppelt hätten, seit das Bewusstsein für kurze Transportwege gewachsen sei. Allerdings sind regionale Produkte häufig teurer als importierte Ware, was gerade für Familien mit kleinem Budget ein echtes Problem darstellt. Trotzdem scheint der Trend zu mehr Regionalität ungebrochen weiterzugehen.',
    transcriptMn: 'Энэ жижиг хотын долоо хоногийн зах дээр орон нутгийн бүтээгдэхүүний худалдаа өмнөх хэзээгээс илүү эрчимжиж байна. Улам олон хэрэглэгч ногоо, мах нь супермаркетын тавиур дээр нэргүй хэвлээ орхиод зогсохгүй, яг хаанаас гаралтайг мэдэхийг чухалчилж байна. Нэгэн орон нутгийн тариаланч надад тээврийн богино зайг эрхэмлэх ухамсар өссөнөөс хойш сүүлийн хоёр жилд орлого нь бараг хоёр дахин нэмэгдсэн гэж хэлсэн. Гэвч орон нутгийн бүтээгдэхүүн импортын барааноос ихэвчлэн үнэтэй байдаг нь жижиг төсөвтэй гэр бүлд бодит асуудал болдог. Гэсэн ч илүү орон нутгийн байдалд шилжих чиг хандлага тасралтгүй үргэлжилсээр байна.',
    question: 'Орон нутгийн тариаланчийн орлого хэрхэн өөрчлөгдсөн бэ?',
    choices: ['Хагасаар буурсан', 'Бараг хоёр дахин нэмэгдсэн', 'Огт өөрчлөгдөөгүй'], correctIndex: 1,
    questions: [
      {
        question: 'Орон нутгийн тариаланчийн орлого хэрхэн өөрчлөгдсөн бэ?',
        choices: ['Хагасаар буурсан', 'Бараг хоёр дахин нэмэгдсэн', 'Огт өөрчлөгдөөгүй'], correctIndex: 1,
        hint: '"seine Umsätze sich … verdoppelt hätten" гэсэн хэсгийг сонс.',
        explanation: '"seine Umsätze sich in den letzten zwei Jahren fast verdoppelt hätten" — орлого нь бараг хоёр дахин нэмэгдсэн гэсэн.',
      },
      {
        question: 'Орон нутгийн бүтээгдэхүүний сул тал юу вэ?',
        choices: ['Ихэвчлэн импортын барааноос үнэтэй', 'Чанар муутай', 'Зах зээлд байдаггүй'], correctIndex: 0,
        hint: '"Allerdings sind regionale Produkte …" гэсэн хэсгийг сонс.',
        explanation: '"regionale Produkte häufig teurer als importierte Ware" — орон нутгийн бүтээгдэхүүн ихэвчлэн үнэтэй байдаг.',
      },
    ],
  },
  {
    id: 633, level: 'B2', topic: 'Лекц',
    title: 'Vortrag: Freizeitstress', titleMn: 'Лекц: Чөлөөт цагийн стресс',
    audioText: 'Guten Abend, in diesem Vortrag geht es um ein paradoxes Phänomen unserer Zeit: den Freizeitstress. Immer mehr Menschen empfinden ihre eigentlich freie Zeit als zusätzliche Belastung, weil sie das Gefühl haben, jede Minute optimal nutzen zu müssen. Statt sich einfach zu erholen, wird die Freizeit regelrecht durchgeplant, mit Sport, sozialen Kontakten und Selbstoptimierung. Dabei würde echte Erholung eigentlich bedeuten, auch einmal bewusst nichts zu tun, ohne sich schuldig zu fühlen. Meine These lautet daher: Wer dauerhaft entspannen möchte, muss zunächst lernen, Leere auszuhalten, statt sie sofort zu füllen.',
    transcriptMn: 'Оройн мэнд, энэ лекцэд бидний цаг үеийн парадокс үзэгдэл болох чөлөөт цагийн стрессийн тухай ярина. Улам олон хүн жинхэнэ чөлөөт цагаа нэмэлт дарамт гэж мэдэрдэг болжээ, учир нь тэд минут тутмаа зохистой ашиглах ёстой гэж боддог. Зүгээр амарч сэргэхийн оронд чөлөөт цагаа спорт, нийгмийн харилцаа, өөрийгөө сайжруулах зэргээр бүрэн төлөвлөж байдаг. Гэтэл жинхэнэ амралт гэдэг нь гэмшлийн мэдрэмжгүйгээр заримдаа ухамсартайгаар юу ч хийхгүй байхыг ч мөн хамарна. Тиймээс миний санаа бол: тогтвортой амрахыг хүсэгч хоосон зайг нэн даруй дүүргэхийн оронд түүнийг тэвчихийг эхлээд сурах ёстой.',
    question: 'Илтгэгчийн үзэж байгаагаар олон хүн чөлөөт цагаа юу гэж мэддэг болжээ?',
    choices: ['Хамгийн таатай цаг', 'Ямар ч ач холбогдолгүй', 'Нэмэлт дарамт'], correctIndex: 2,
    questions: [
      {
        question: 'Илтгэгчийн үзэж байгаагаар олон хүн чөлөөт цагаа юу гэж мэддэг болжээ?',
        choices: ['Хамгийн таатай цаг', 'Ямар ч ач холбогдолгүй', 'Нэмэлт дарамт'], correctIndex: 2,
        hint: '"empfinden ihre eigentlich freie Zeit …" гэсэн хэсгийг сонс.',
        explanation: '"empfinden ihre eigentlich freie Zeit als zusätzliche Belastung" — чөлөөт цагаа нэмэлт дарамт гэж мэддэг болсон.',
      },
      {
        question: 'Илтгэгчийн санаагаар жинхэнэ амрахын тулд юу сурах хэрэгтэй вэ?',
        choices: ['Илүү олон төлөвлөгөө хийхийг', 'Спортоор илүү идэвхтэй хичээллэхийг', 'Хоосон зайг тэвчихийг'], correctIndex: 2,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"muss zunächst lernen, Leere auszuhalten" — хоосон зайг тэвчихийг сурах ёстой гэсэн.',
      },
    ],
  },
  {
    id: 634, level: 'B2', topic: 'Хэлэлцүүлэг',
    title: 'Diskussion: Haustiere in der Großstadt', titleMn: 'Хэлэлцүүлэг: Том хотод тэжээвэр амьтан',
    audioText: 'Ich finde, dass die Haltung großer Hunde in engen Stadtwohnungen kritisch hinterfragt werden sollte. Natürlich verstehe ich den Wunsch nach einem tierischen Begleiter, doch viele Tiere leiden sichtbar unter mangelnder Bewegung und fehlendem Auslauf. Andererseits könnte man argumentieren, dass es letztlich auf die individuelle Fürsorge ankommt und nicht pauschal auf die Wohnungsgröße. Trotzdem zeigen Tierärzte immer wieder, dass Verhaltensprobleme bei Stadthunden häufiger auftreten als bei Tieren, die auf dem Land aufwachsen. Deshalb würde ich mir wünschen, dass sich künftige Halter vor der Anschaffung intensiver mit den Bedürfnissen des jeweiligen Tieres beschäftigen.',
    transcriptMn: 'Хотын нарийхан орон сууцанд том нохой тэжээх нь эргэлзээтэй асуудал гэж би боддог. Мэдээж амьтан хамтрагчтай байх хүслийг би ойлгодог ч олон амьтан хөдөлгөөн, гадаа гарах боломжгүйгээс ил тод зовдог. Нөгөө талаас эцсийн эцэст энэ нь орон сууцны хэмжээ биш, харин хувь хүний халамжаас шалтгаална гэж маргаж болно. Гэсэн хэдий ч мал эмнэлгийн мэргэжилтнүүд хотын нохойд хөдөө өссөн амьтдаас илүү зан үйлийн асуудал байнга илэрдэгийг харуулсаар байна. Тиймээс ирээдүйн эзэд амьтан авахаасаа өмнө тухайн амьтны хэрэгцээг илүү сайтар судлаасай гэж хүсэж байна.',
    question: 'Мал эмнэлгийн мэргэжилтнүүд юуг харуулсан бэ?',
    choices: ['Хотын нохойд зан үйлийн асуудал илүү байнга илэрдэг', 'Хотын нохой илүү эрүүл байдаг', 'Ямар ч ялгаа байхгүй'], correctIndex: 0,
    questions: [
      {
        question: 'Мал эмнэлгийн мэргэжилтнүүд юуг харуулсан бэ?',
        choices: ['Хотын нохойд зан үйлийн асуудал илүү байнга илэрдэг', 'Хотын нохой илүү эрүүл байдаг', 'Ямар ч ялгаа байхгүй'], correctIndex: 0,
        hint: '"Trotzdem zeigen Tierärzte …" гэсэн хэсгийг сонс.',
        explanation: '"Verhaltensprobleme bei Stadthunden häufiger auftreten als bei Tieren, die auf dem Land aufwachsen" — хотын нохойд зан үйлийн асуудал илүү байнга илэрдэг.',
      },
      {
        question: 'Илтгэгч ирээдүйн эздэд юу зөвлөж байна вэ?',
        choices: ['Амьтны хэрэгцээг сайтар судлах', 'Зөвхөн жижиг амьтан авах', 'Амьтан огт авахгүй байх'], correctIndex: 0,
        hint: 'Хамгийн сүүлчийн өгүүлбэрийг сонс.',
        explanation: '"sich künftige Halter vor der Anschaffung intensiver mit den Bedürfnissen des jeweiligen Tieres beschäftigen" — амьтны хэрэгцээг сайтар судлахыг зөвлөсөн.',
      },
    ],
  },
  {
    id: 635, level: 'B2', topic: 'Подкаст',
    title: 'Podcast: Second-Hand-Mode', titleMn: 'Подкаст: Хуучин хувцасны загвар',
    audioText: 'In der heutigen Folge sprechen wir über den Boom von Second-Hand-Mode unter jungen Menschen. Was früher oft als peinlich galt, gilt inzwischen bei vielen als bewusste und stilvolle Entscheidung. Ein Hauptgrund dafür ist sicherlich das gewachsene Umweltbewusstsein, denn die Textilindustrie zählt zu den größten Umweltverschmutzern weltweit. Hinzu kommt, dass man auf Second-Hand-Plattformen oft einzigartige Stücke findet, die es in keinem gewöhnlichen Laden gibt. Wer vor einigen Jahren noch gezögert hätte, gebrauchte Kleidung zu tragen, würde heute wohl kaum mehr einen Grund dafür sehen.',
    transcriptMn: 'Өнөөдрийн дугаарт бид залуучуудын дунд хуучин хувцасны загварын өсөлтийн тухай ярина. Урьд нь ичмээр гэж тооцогддог байсан зүйл өнөөдөр олон хүний хувьд ухамсартай, эрхэмсэг сонголт болжээ. Гол шалтгаануудын нэг нь өссөн байгаль орчны ухамсар мэдээж юм, учир нь нэхмэлийн салбар дэлхийн хамгийн том байгаль орчныг бохирдуулагчдын нэг юм. Нэмж дурдвал, хуучин хувцасны платформ дээр ердийн дэлгүүрт байдаггүй өвөрмөц эд зүйл олддог. Хэдэн жилийн өмнө хуучин хувцас өмсөхөд эргэлзэж байсан хүн өнөөдөр тэгэхэд ямар ч шалтгаан олохгүй байх байсан.',
    question: 'Нэхмэлийн салбарын талаар юу гэж хэлсэн бэ?',
    choices: ['Хамгийн цэвэр салбар', 'Дэлхийн хамгийн том байгаль орчныг бохирдуулагчдын нэг', 'Хамгийн хямд салбар'], correctIndex: 1,
    questions: [
      {
        question: 'Нэхмэлийн салбарын талаар юу гэж хэлсэн бэ?',
        choices: ['Хамгийн цэвэр салбар', 'Дэлхийн хамгийн том байгаль орчныг бохирдуулагчдын нэг', 'Хамгийн хямд салбар'], correctIndex: 1,
        hint: '"die Textilindustrie zählt zu …" гэсэн хэсгийг сонс.',
        explanation: '"die Textilindustrie zählt zu den größten Umweltverschmutzern weltweit" — нэхмэлийн салбар дэлхийн хамгийн том бохирдуулагчдын нэг.',
      },
      {
        question: 'Хуучин хувцасны платформ дээр юу олддог вэ?',
        choices: ['Зөвхөн хямд бараа', 'Ердийн дэлгүүрт байдаггүй өвөрмөц эд зүйл', 'Зөвхөн шинэ хувцас'], correctIndex: 1,
        hint: '"Hinzu kommt, dass man …" гэсэн хэсгийг сонс.',
        explanation: '"man auf Second-Hand-Plattformen oft einzigartige Stücke findet, die es in keinem gewöhnlichen Laden gibt" — өвөрмөц эд зүйл олддог гэсэн.',
      },
    ],
  },
];
