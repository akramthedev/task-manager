import Navbar from '../Components/Navbar';
import Tasks from '../Components/Tasks';
import './index.css';
import Head from 'next/head';


const Page = () => {
  return (
    <>
      <Head>
        <title>Schedule - Your Perfect Task Manager</title>
        <meta name="description" content="Effortlessly manage your tasks, focus on what matters most, and turn plans into accomplishments." />
      </Head>
      <main  className='TodoPage' >
        <Navbar />
        <Tasks />
      </main>
    </>
  );
};

export default Page;
