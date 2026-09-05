import "./globals.css";

export const metadata = {
  title: "حقول السلام | حلول زراعية متكاملة",
  description: "توريد الشتلات وتنسيق الحدائق واللاندسكيب في المملكة العربية السعودية.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
