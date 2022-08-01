import styled, { css } from 'styled-components'
import { FONT_LATO } from '../../theme'

export const Title = styled.div`
  font-size: 24px;
  line-height: 30px;
  color: #333333;
  font-family: ${FONT_LATO};
  font-weight: bold;
  padding: 20px 0px 10px 10px;
`

export const CategoryTitle = styled.div`
  font-family: ${FONT_LATO};
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`
export const CategoryImg = styled.img.attrs({ alt: 'category-icon' })`
  background-color: #F2F2F2;
  width: 50px;
  height: 50px;
  padding: 13px;
  border-radius: 10px;
`
export const CategoryContainer = styled.div`
  width: fit-content;
  height: fit-content;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  border-radius: 20px;
  border: solid 1px #797979;
  display: flex;
  column-gap: 5px;
  align-items: center;
  background-color: #ffffff;
  ${props => props.isSelectedCategory && css`
    background-color:#b8b8b8;
  `}
`

export const CategoriesContainer = styled.div`
  overflow: auto;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  flex-wrap: nowrap;
  align-items: center;
  padding-left: 10px;
`
