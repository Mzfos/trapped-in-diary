import Portal from '../portal';

export async function generateStaticParams() {
  // บังคับให้ระบบรู้จักเส้นทางจำลอง 1 เส้นทาง
  return [{ slug: ['index'] }];
}

export default function RoutedPage() {
  return <Portal />;
}