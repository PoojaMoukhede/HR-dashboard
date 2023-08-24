import React,{useState} from 'react'
// import landingImage from '../Images//World tour (7).png'
import { Icon } from '@iconify/react';
import {Link} from 'react-router-dom'
import './LandingPage.css'
import world from '../Images/World tour (8).png'
import logo from '../Images/multispan-logo 2.png'
import amico from '../Images/amico.png'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function LandingPage() {
  const [headerClass, setHeaderClass] = useState('');

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setHeaderClass('header-scrolled');
    } else {
      setHeaderClass('');
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(()=>{
    AOS.init();
  })

  return (
    <>

  <nav id="header" className={`header fixed-top ${headerClass}`}>
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a href="index.html" className="d-flex align-items-center">
        <img src={logo} alt=""/>
      </a>

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto active" href="#hero">Home</a></li>
          <li><a className="getstarted scrollto" href="/register">Get Started</a></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </nav>

  <div id="hero" className="hero d-flex align-items-center">

    <div className="container">
      <div className="row">
        <div className="col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">Keep Track Of Your Employee</h1>
          <h2 data-aos="fade-up" data-aos-delay="400">Employee scheduling for payroll, productivity and billing.
            Get hours of payroll by employees clock in and out, 
            All in one platform.</h2>
          <div data-aos="fade-up" data-aos-delay="600">
            <div className="text-center text-lg-start">
              <a href="/register" className="btn-get-started scrollto d-inline-flex align-items-center justify-content-center align-self-center">
                <span>Get Started</span>
                <i className="bi bi-arrow-right"><Icon icon="bi:arrow-right-short" /></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 hero-img" data-aos="zoom-out" data-aos-delay="200">
          <img src={world} className="img-fluid" alt=""/>
        </div>
      </div>
    </div>

  </div>

  <div id="main">

    <div id="features" className="features">
      <div className="container" data-aos="fade-up">
        <div className="row feature-icons" data-aos="fade-up">
          <h3>Why we need this application</h3>

          <div className="row">

            <div className="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
              <img src={amico} className="img-fluid p-4" alt=""/>
            </div>

            <div className="col-xl-8 d-flex content">
              <div className="row align-self-center gy-4">

                <div className="col-md-6 icon-box" data-aos="fade-up">
                  <i className="ri-line-chart-line"><Icon icon="ri:line-chart-line" /></i>
                  <div>
                    <h4>Minimal Fuel cost </h4>
                    <p>Fuel cost is one of the largest expanse for an organization. You can reduce fuel by providing them most direct routes with map. </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                  <i className="ri-stack-line"><Icon icon="ri:stack-line" /></i>
                  <div>
                    <h4>Lower operational cost </h4>
                    <p>By digitizing process like pre- trip planning for nearby employee, trip location organization can lower operational cost.</p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                  <i className="ri-brush-4-line"><Icon icon="ri:brush-4-line" /></i>
                  <div>
                    <h4>Increase Productivity </h4>
                    <p>Digitizing important workflows is another way to increase productivity. </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                  <i className="ri-magic-line"><Icon icon="ri:magic-line" /></i>
                  <div>
                    <h4>Theft recovery </h4>
                    <p>When employee have a GPS tracker installed in their phone admin team can monitor the location and quickly identify unusual use of fuel and money. </p>
                  </div>
                </div>

                <div className="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                  <i className="ri-command-line"><Icon icon="ri:command-line" /></i>
                  <div>
                    <h4>Improve Safety of employee </h4>
                    <p>Safety of employees is no doubt a top priority for an organization. That starts with monitoring employee behavior and ensure that safe driving practice are being followed. </p>
                  </div>
                </div>

          

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  </div>


  <footer id="footer" className="footer">
    <div className="container">
      <div className="copyright">
        &copy; Copyright <strong><span>Multispan</span></strong>. All Rights Reserved
      </div>
    </div>
  </footer>


    {/* <div classNameName='landingpage d-flex flex-row'>
         <div classNameName='rightL'>
          <h1 classNameName='title'>Keep Track Of Your <br/>Employee</h1>
          <p classNameName='pdesc'>Employee scheduling for payroll, productivity and billing.<br/>
           Get hours of payroll by employees clock in and out, <br/>
           All in one platform.
          </p>
        <Link to='/register'><button classNameName=' btn2 button'>Get Started</button></Link> 
         </div>
         <div classNameName='leftL'>
            <img alt='' src={landingImage} classNameName='map'/>
         </div>
    </div> */}
    </>
  )
}
