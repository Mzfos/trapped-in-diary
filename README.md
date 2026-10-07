# Trapped in Diary

พอร์ทัลต้นแบบสำหรับการเรียนรู้การพยาบาลจิตเวชผ่านสถานการณ์จำลอง ใช้ Next.js App Router, TypeScript, Tailwind CSS และข้อมูล Mock เพื่อให้ต่อ REST API และ GameMaker HTML5/Web Build ได้ในภายหลัง

## เริ่มใช้งาน

ต้องติดตั้ง Node.js 20.9 ขึ้นไปก่อน จากนั้นเปิด Terminal ในโฟลเดอร์โปรเจกต์และรัน:

```bash
npm.cmd install
npm.cmd run dev
```

เปิด `http://localhost:3000` ในเบราว์เซอร์

## หน้าสำคัญ

- `/` หน้าแนะนำโครงการ
- `/login` และ `/register` หน้าตัวอย่างการเข้าสู่ระบบและสมัครสมาชิก
- `/dashboard` ภาพรวมผู้เรียน
- `/scenarios` และ `/scenarios/SC001` คลังและรายละเอียดสถานการณ์
- `/game/SC001` หน้าจำลองสำหรับเล่นและเชื่อมต่อ GameMaker ภายหลัง
- `/results`, `/analytics`, `/profile` ผลการเรียน การวิเคราะห์ และโปรไฟล์
- `/admin/dashboard`, `/admin/users`, `/admin/lessons`, `/admin/scenarios`, `/admin/analytics` หน้าผู้ดูแลระบบ

การเข้าสู่ระบบเป็น mock: เลือกบทบาทในหน้า Login แล้วส่งฟอร์มเพื่อเปิด Dashboard ตามบทบาท ไม่มีการตรวจบัญชีหรือบันทึกข้อมูลกับเซิร์ฟเวอร์

## เชื่อมต่อเกม GameMaker

คัดลอกไฟล์ GameMaker HTML5/Web Build ไปไว้ใน `public/game-build/` แล้วกำหนด URL ใน `.env.local`:

```env
NEXT_PUBLIC_GAMEMAKER_GAME_URL=/game-build/index.html
```

หน้า `/game/[scenarioId]` จะแสดง build ใน iframe แบบ responsive และรองรับเต็มหน้าจอ เกมส่งผลกลับหน้าเว็บได้ด้วย `window.parent.postMessage({ type: 'game:complete', score: 80, completed: true }, '*')` หน้าเว็บจะจับเวลาเซสชันและส่ง `{ userId, scenarioId, score, completed, playTime }` ไปยัง `POST /api/game/result` ซึ่งปัจจุบันเป็น mock endpoint สำหรับแทนที่ด้วย Spring Boot API ภายหลัง
