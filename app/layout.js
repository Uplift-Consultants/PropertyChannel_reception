import Aside from "@components/dashboard/aside";
import { cookies } from "next/headers";
import StoreProvider from "@components/storeProvider";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
import Header from "@components/dashboard/header";
import "@css/main.css";
import "@css/index.css";
import "@css/colors.css";
import "@css/aside.css";
import "@css/header.css";
import "@css/buttons.css";
import "@css/icons.css";
import "@css/dropdown.css";
import "@css/modal.css";
import "@css/carousel.css";
import "@css/widgets.css";
import "@css/forms.css";
import "@css/elements.css";
import "@css/tables.css";
import 'react-loading-skeleton/dist/skeleton.css';


const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

export const metadata = {
  title: "Sales | Property Channel",
  description: "Your channel to generational wealth",
};

export default async function RootLayout({ children }) {

  const cookieStore = await cookies();

  const token = cookieStore.get('auth-agent')?.value;

return (
  <html lang="en">
    <body className={`${inter.variable} antialiased`}>
      <StoreProvider cookieToken={token} >
        <div className="wrapper">
          <Aside/>
          <div className="content">
            <Header/>
            <main className="container">
              {children}
            </main>          
          </div>          
        </div>
        <div id="portal" />
        <Toaster position="top-right" richColors /> 
      </StoreProvider>
    </body>
  </html>      
);
}