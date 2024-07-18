export default function SignupLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section className="min-h-screen flex justify-center items-center bg-white dark:bg-black">{children}</section>
  }