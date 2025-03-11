import '@styles/globals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promptopia',
    description: 'Generate and share AI prompts, all in one place.'
}

const RootLayout = ({ children }) => {
  return (
    <html lang ='en'>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient"/>
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout
