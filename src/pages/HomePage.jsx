import React from 'react'
import Grounds from '../components/main/grounds/Grounds'
import Contact from '../components/main/contact/Contact'
import Footer from '../components/common/footer/Footer'

const HomePage = () => {
    return (
        <>
            <section id="our-grounds">
                <Grounds />
            </section>
            <section id="contact"> <Contact /> </section>
            <Footer />
        </>
    )
}

export default HomePage