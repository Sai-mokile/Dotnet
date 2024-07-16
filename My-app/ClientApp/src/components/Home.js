import React from 'react'
import './NavMenu.css'
import Header from './Header'
 export const Home = () => {

 
 
  return (
    <div>
       <Header/>
       <div>
        <h6 className='we-prov'>We Provide</h6>
        <h1>Complete Construction Solutions</h1>
       </div>
       <div >
        <div className='d-flex flex-row col-12 home-card'>
           <div className='col-6'>
            <h5>01</h5>
            <h1>Goals and vision</h1>
            <p>Every project starts by discovering where you are—and where you want to go. By understanding what you want, we can start to build your vision</p>
           </div>
           <div className='col-6'>
            <img src='https://www.maman-corp.com/assets/img/process-step-1.jpg' alt='hfgh'/>
           </div>
        </div>
       </div>
    </div>
  )
}


