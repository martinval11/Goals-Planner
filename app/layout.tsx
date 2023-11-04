import './globals.css';

export const metadata = {
  title: 'Goals Planner',
  description: 'Plan your goals',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
