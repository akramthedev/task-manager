import Link from 'next/link';
import './index.css';
import Logo from './logo.png';
import Image from 'next/image';

export default function Navbar(){
    return(
        <div className="navbar">
            <div className="logo">
                <Link href="/" >
                <Image 
                    src={Logo}          
                    alt="Best Task Manager Ever"   
                    className='logoImg'
                    priority             
                />
                </Link>
            </div>
            <div className="others">
            <Link href="/blog" >
                <button className='b1 b1b1'>
                    Blog
                </button>
            </Link>
            <Link href="/contact" >
                <button className='b1'>
                    Contact
                </button>
            </Link>
            <Link href="/sign-in" >
                <button className='b3'>
                    Log In
                </button>
            </Link>
            </div>
        </div>
    )
}