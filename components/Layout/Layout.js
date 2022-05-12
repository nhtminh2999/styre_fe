import Header from './Header'

function Layout({ children }) {
  return (
    <>
      <div>
        <Header />
        <main className="bg-white flex flex-col w-full h-[calc(100vh-56px)] pt-6">{children}</main>
      </div>
    </>
  )
}

export default Layout
