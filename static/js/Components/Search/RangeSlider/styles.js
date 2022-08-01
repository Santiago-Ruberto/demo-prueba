import styled from 'styled-components'
import { FONT_LATO } from '../../../theme'

export const Container = styled.div`
  margin-top: 10px;
  @media (max-width: 400px){
    
  };
  padding: 10px;
`
export const SliderContainer = styled.div`
  padding:10px;

`

export const Title = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #333333;
  font-family: ${FONT_LATO};
  font-weight: 600;
`

export const PriceRange = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: #666666;
  font-family: ${FONT_LATO};
  margin-top: 5px;
`