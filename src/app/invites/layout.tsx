import MenuBar from "@/components/menu";
import TopBar from "@/components/topBar";
import SseConnectComponent from "../messages/components/sseConnect";
import './../globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <TopBar />
      <MenuBar />
      <SseConnectComponent />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {children}
        </div>
      </div>
    </main>

  );
}
