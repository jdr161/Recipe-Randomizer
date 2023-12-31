// These styles apply to every route in the application
import './globals.css'
import NavBar from './server-components/navbar.js'
import Footer from './server-components/footer.js'
 
export const metadata = {
  title: 'Recipe Randomizer',
  description: 'Generated by create next app',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="autumn">
      <body>
        <header className='sticky top-0 z-50'>
          <NavBar />
        </header>
        <main className='relative min-h-[89vh]'>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}