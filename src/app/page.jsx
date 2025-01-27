import LandingPage from './Components/LandingPage';
import Navbar from './Components/Navbar';
import './index.css';


export default function Home() {
  return (
    <div className='Home' >
      <Navbar />
      <LandingPage />
    </div>
  );
}
