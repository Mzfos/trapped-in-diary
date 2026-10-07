import Portal from '../portal';

export async function generateStaticParams() {
  return [
    // หน้าเมนูหลักและเข้าสู่ระบบ
    { slug: ['dashboard'] },
    { slug: ['scenarios'] },
    { slug: ['results'] },
    { slug: ['analytics'] },
    { slug: ['profile'] },
    { slug: ['login'] },
    { slug: ['register'] },

    // หน้ารายละเอียดสถานการณ์ 3 บทเรียน
    { slug: ['scenarios', 'SC001'] },
    { slug: ['scenarios', 'SC002'] },
    { slug: ['scenarios', 'SC003'] },

    // หน้าเล่นเกม 3 บทเรียน
    { slug: ['game', 'SC001'] },
    { slug: ['game', 'SC002'] },
    { slug: ['game', 'SC003'] },

    // หน้าผู้ดูแลระบบ (Admin)
    { slug: ['admin', 'dashboard'] },
    { slug: ['admin', 'users'] },
    { slug: ['admin', 'lessons'] },
    { slug: ['admin', 'scenarios'] },
    { slug: ['admin', 'analytics'] }
  ];
}

export default function RoutedPage() {
  return <Portal />;
}