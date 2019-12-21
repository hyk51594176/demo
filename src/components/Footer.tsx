import React from 'react';
import styled from 'styled-components';
const IndexFooter = styled.div`
  width: 100%;
  height: 44px;
  position: fixed;
  bottom: 0;
  background: #2C2F33;
`
const FooterContent = styled.div`
  font-family: PingFangSC-Regular;
  width: 1000px;
  margin: 0 auto;
  line-height: 44px;
  text-align: center;
  color: #fff;
  opacity: 0.4;
`

const Footer: React.FC = () => {
  return <IndexFooter>
    <FooterContent>
      阿里巴巴集团 Copyright ©1999-2019 版权所有
    </FooterContent>
  </IndexFooter>
}

export default Footer;
