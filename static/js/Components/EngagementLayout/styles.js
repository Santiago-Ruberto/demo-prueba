import styled from 'styled-components'
import theme, { FONT_LATO } from '../../theme'

export const Container = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 50px;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  row-gap: 40px;
  column-gap: 20px ;
  @media (max-width: 400px){
    flex-direction: column;
    
  } 
`

export const Title = styled.div`
  text-transform:uppercase;
  font-family:${FONT_LATO};
  font-weight:bold;
  font-size:20px;
  text-align: center;
  line-height: 21px;
`

export const Subtitle = styled.div`
  text-transform:uppercase;
  font-family:${FONT_LATO};
  font-weight:200;
  font-size:12px;
  text-align: center;
  line-height: 13px;
  color: ${theme.palette.grey.greyIcon};
`

export const Banner = styled.div`
  background-color: ${props => props.color};
  height: 135px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  padding-bottom: 20px;
  padding-right: 20px;
`

export const BannerTitle = styled.div`
  text-transform:uppercase;
  font-family:${FONT_LATO};
  font-weight:bold;
  font-size:24px;
  line-height: 24px;
  color: ${theme.palette.white.main};
`

export const BannerSubtitle = styled(BannerTitle)`
  font-weight:200;
  font-size:10px;
  line-height: 11px;
`

export const DontPayMore = styled.div`
  width: 50%;
  @media (max-width: 400px){
    width: 100%;
  } 
`

export const PayFair = styled.div`
  width: 50%;
  @media (max-width: 400px){
    width: 100%;
  };
  margin-bottom: 10px;
`

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`

export const Img = styled.img`
  height: 435px;
  width: 50%;
  object-fit: cover;
`