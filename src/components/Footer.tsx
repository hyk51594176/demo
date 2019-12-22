import React from 'react';
import styled from 'styled-components';
import { useResize } from '../api';
import { IndexFooterAttr } from '../types';
const IndexFooter = styled.div<IndexFooterAttr>`
  position: ${props => props.isFixed ? 'fixed' : null};
  bottom: ${props => props.isFixed ? 0 : null};
  width: 100%;
  height: 44px;
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
  const innerHeight = useResize()

  return <IndexFooter isFixed={innerHeight > 938}>
    <FooterContent>
      阿里巴巴集团 Copyright ©1999-2019 版权所有
    </FooterContent>
  </IndexFooter>
}

export default Footer;
