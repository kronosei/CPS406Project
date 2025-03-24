import Layout from "../components/Layout"
import Link from 'next/link';
export default function Home() {
  return (
    <Layout>
      <div>
        <header><h1>Welcome to the Generic Co-op Page</h1></header>
        <section>Press below to sign up or log in</section>
        <section id="link"><Link href="/login">To Login/Sign up page</Link></section>
      </div>
    </Layout>
  );
}
