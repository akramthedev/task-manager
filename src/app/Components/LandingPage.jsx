import Link from 'next/link';

export default function LandingPage(){
    return(
    <div className="planActAchieve">
        <div className="containerPAA2">
          <div className="containerPAA3">
            <h1>Schedule.&nbsp;</h1>
            <h1>Act.&nbsp;</h1>
            <h1>Achieve.</h1>
          </div>
          <div className="containerPAA4">
            <p>
            Effortlessly manage your tasks, focus on what matters most, and turn plans into accomplishments.
            </p>
          </div>
          <div className="containerPAA5">
            <div className="containerPAA6">
              <Link href="#learn-more">
                <button className='fsong1'>
                  Learn More
                </button>
              </Link>
              <Link href="/task-manager" >
                <button className='fsong2' >
                  <p className='alignThem' >
                    Start Planning&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>                  
                  </p>
                </button>
              </Link>
            </div>
          </div>
          <div className="containerPAA5 nzousfd">
            <p>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar mr-2 h-4 w-4"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            &nbsp;&nbsp;Actually, you can create tasks without even logging in ! 
            </p>
          </div>
        </div>
    </div>
    );
}