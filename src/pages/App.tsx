import React from 'react';
import Header from '../components/Header'
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Content from '../components/Content';
const App: React.FC = () => {
  return (
    <div>
     <Header/>
     <Banner/>
     <Content/>
     <Footer/>
    </div>
  );
}

export default App;
