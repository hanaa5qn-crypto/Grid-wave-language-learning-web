import React from 'react';
import LegalLayout from './LegalLayout';

export default function ContactPage() {
  return (
    <LegalLayout title="Холбоо барих">
      <p>
        Vivid Lingua-тай холбоотой асуулт, санал хүсэлт, техникийн тусламж болон хуулийн асуудлаар
        доорх хаягаар бидэнтэй холбогдоно уу.
      </p>

      <hr />

      <h2>Имэйл</h2>
      <p>
        <a href="mailto:hanaa5qn@gmail.com" className="text-lg font-semibold">
          hanaa5qn@gmail.com
        </a>
      </p>

      <h2>Утас</h2>
      <p>
        <a href="tel:+97672109647" className="text-lg font-semibold">
          7210-9647
        </a>
      </p>
      <p>
        Хүсэлтэд хариу өгөх хугацаа: <strong>1–2 ажлын өдөр</strong> (даваа–баасан).
      </p>

      <h2>Ямар асуудлаар бичвэл зохилтой вэ?</h2>
      <ul>
        <li>Данс нэвтрэх болон нууц үгийн асуудал</li>
        <li>Төлбөр, захиалга, буцаан олголтын хүсэлт</li>
        <li>Агуулгын алдаа эсвэл техникийн доголдол</li>
        <li>Нууцлал болон мэдээлэл устгах хүсэлт</li>
        <li>Хамтын ажиллагаа, сурталчилгааны саналууд</li>
        <li>Ерөнхий санал, гомдол, тэмдэглэл</li>
      </ul>

      <h2>Хүсэлт бичихдээ</h2>
      <p>Асуудлаа хурдан шийдүүлэхийн тулд имэйлд дараах мэдээллийг оруулахыг зөвлөж байна:</p>
      <ul>
        <li>Бүртгэлтэй имэйл хаяг</li>
        <li>Асуудлын товч тайлбар</li>
        <li>Төлбөртэй холбоотой бол гүйлгээний огноо болон дүн</li>
      </ul>

      <hr />

      <p className="text-xs text-paper-3">
        <strong>Khansumber Altankhuyag</strong> — Vivid Lingua платформын эзэмшигч (хувь хүн).
      </p>
    </LegalLayout>
  );
}
