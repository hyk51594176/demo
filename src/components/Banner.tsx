import React from 'react';
import styled from 'styled-components';
import { EnWordAttr } from '../types';
const IndexMain = styled.div`
  position: relative;
  height: 478px;
  width: 100%;
  font-family: PingFangSC-Regular;
  overflow: hidden;
`
const BgImg = styled.img`
  vertical-align: middle;
  width: 1440px; 
  height: 478px;
`
const Mark = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(31,56,88,0.40);
`
const Continer = styled.div`
  width: 1000px;
  height: 100%;
  position: absolute;
  margin-left: -500px;
  top: 0;
  left: 50%;
`
const Form = styled.div`
  position: absolute;
  left: 50%
  top: 50%;
  margin-left: -245px;
  margin-top: -145px;
`

const EnWord = styled.p<EnWordAttr>`
  font-family: Rufina-Bold;
  color: #fff;
  font-size: ${props => props.fontSize||' 54px'}; 
  line-height: ${props => props.lineHeight||' 56px'}; 
  margin-bottom:${props => props.marginBottom};
`
const SearchBox = styled.div`
  width: 490px;
  height: 60px;
  position: relative;
  border: 0px;
  background: none;
  margin: 0 auto;
`
const InputMark = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  position: absolute;
  opacity: 0.1;
`
const Input = styled.input`
  padding: 10px 0 6px;
  text-indent: 10px;
  float: left;
  border: 0;
  font-size: 14px;
  position: relative;
  top: 4px;
  outline: none;
  width: 368px;
  height: 40px;
  padding-top: 6px;
  margin-top: 6px;
  margin-left: 10px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 3px;
`
const Button = styled.button`
  color: #fff;
  background: #F37327;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  width: 92px;
  height: 40px;
  border-radius: 3px;
  margin-top: 10px;
  margin-left: 10px;
  position: relative;
  z-index: 2;
  border: 0;
  cursor: pointer;
`
const HotText = styled.div`
  text-align: center;
  color: rgba(255,255,255,0.80);
  padding: 10px 0;
`
const SearchKey = styled.a`
  color: rgba(255,255,255,0.80);
  padding-right: 10px;
  &:hover{
    color: #F37327
  }
`

const Banner: React.FC = () => {
  return <IndexMain>
    <BgImg src="https://img.alicdn.com/tfs/TB14TEEm7CWBuNjy0FaXXXUlXXa-1440-478.png" />
    <Mark/>
    <Continer>
      <Form>
        <EnWord>If not now, when?</EnWord>
        <EnWord>If not me, who?</EnWord>
        <EnWord fontSize='34px' lineHeight='48px' marginBottom='38px'>此时此刻，非我莫属！</EnWord>
        <SearchBox>
          <InputMark/>
          <Input placeholder='请输入职位关键词'/>
          <Button>搜索</Button>
        </SearchBox>
        <HotText>
          <SearchKey>热门搜索： </SearchKey>
          <SearchKey>JAVA</SearchKey>
          <SearchKey>IOS</SearchKey>
          <SearchKey>数据</SearchKey>
          <SearchKey>安全</SearchKey>
          <SearchKey>搜索</SearchKey>
          <SearchKey>算法</SearchKey>
          <SearchKey>运营</SearchKey>
          <SearchKey>视觉</SearchKey>
          <SearchKey>交互</SearchKey>
          <SearchKey>前端</SearchKey>
        </HotText>
      </Form>
    </Continer>
  </IndexMain>
}

export default Banner;
