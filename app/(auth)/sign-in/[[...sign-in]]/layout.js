export const metadata = {
  title: "User dashboard",
  description: "Boost your skills with mock interviews",
};

export default function RootLayout({ children }) {
  return <div className="w-full h-auto flex flex-col">{children}</div>;
}
