import styled from 'styled-components'
import theme, { FONT_LATO } from './theme'

export const Container = styled.div`
  background: ${theme.palette.background.main};
`

export const Title = styled.p`
  font-weight: bold;
  font-size: 30px;
  color: #222324;
  line-height: 40px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  padding-top: 5px;
  font-family: ${FONT_LATO};
`