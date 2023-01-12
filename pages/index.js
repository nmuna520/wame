import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  const submitContact = async (event) => {
    event.preventDefault();
    event.target.action = 'https://wa.me/57' + event.target.name.value;
  };
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                <h2 className="text-2xl md:text-3xl">Enviar mensaje</h2>
                {post.data.description && (
                  <p className="mt-3 text-lg opacity-60">
                    Ingrese los 10 dígitos del whatsapp al que le quiere enviar
                    el mensaje sin agregarlo como contacto
                  </p>
                )}
              </a>
            </li>
          ))}
        </ul>
        <form onSubmit={submitContact} method="get">
          <input type="text" id="number" name="number" />
          <button type="submit">
            <ArrowIcon className="mt-4" />
          </button>
        </form>
      </main>
      <Footer copyrightText={globalData.footerText} />
      <GradientBackground
        variant="large"
        className="fixed top-20 opacity-40 dark:opacity-60"
      />
      <GradientBackground
        variant="small"
        className="absolute bottom-0 opacity-20 dark:opacity-10"
      />
    </Layout>
  );
}

export function getStaticProps() {
  const posts = getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
