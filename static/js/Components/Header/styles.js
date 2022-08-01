import styled from 'styled-components'
import theme, { FONT_LATO } from '../../theme'

export const Container = styled.div`
  background-color: ${theme.palette.background.main};
  height: 50px;
  width: '100%';
`

export const Title = styled.div`
  color: '#333333';
  text-transform: uppercase;
  font-family: ${FONT_LATO};
  font-weight: 200;
  font-size: 24px;
  line-height: 32px;
  text-decoration: none;
  hover: {
    text-decoration: none;
    color: ${theme.palette.white.main};
  };
  @media (max-width: 400px){
    padding-left: 0px
  }
`