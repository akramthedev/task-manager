import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",  
  subsets: ["latin"],       
});

export const metadata = {
  title: "Schedule",
  description: "Schedule helps you stay on top of tasks. Plan your day, track progress, and organize priorities to focus on what matters most.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} BODYX` }>
        {children}
      </body>
    </html>
  );
}
