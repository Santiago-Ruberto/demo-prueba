import styled, { css } from 'styled-components'
import theme, { FONT_LATO } from '../../theme'
import TimelineIcon from '@mui/icons-material/Timeline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export const Container = styled.div`
  width: fit-content;
`

export const Img = styled.img`
  width: 165px;
  height: 165px;
  border-radius: 15px;
`

export const Card = styled.div`
  position: relative;
  box-shadow: none;
  width: fit-content;
  padding: 5px;
  padding-top: 20px;
  min-height: 300px;
  height: fit-content;
  background: ${theme.palette.white.main};
  border-radius: 20px;
  box-shadow: 0px 4px 20px 0px rgb(0 0 0 / 8%);
  text-align: center;
  ${props => !props.singleModeView && css`
    max-width: 250px;
  `}
  ${props => props.singleModeView && css`
    display: flex;
    flex-direction: row;
    min-height: fit-content;
    padding: 10px;
    border-radius: 10px;
  `}
`

export const Content = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 16px;
  height: 55px;
  overflow-y: auto;
  ${props => props.singleModeView && css`
    font-size: 20px;
    font-weight: 400;
    line-height: 20px;
    height: fit-content;
    overflow-y: unset;
  `}
  font-family: ${FONT_LATO};
  text-transform: capitalize;
  margin-top: 3px;
  margin-left: 10px;
  margin-bottom:3px;
  color: #000000;
  text-align: left;
`

export const Price = styled(Title)`
  color: #505050;
  margin-top: 10px;
  height: fit-content;
  ${props => props.singleModeView && css`
    font-size: 20px;
  `}
`

export const Favorites = styled.div`
  font-family: ${FONT_LATO};
  color: #000000;
  font-size: 16px;
  font-weight: 200;
  padding-right: 2px;
`

export const ProductsTitle = styled.div`
  font-size: 24px;
  line-height: 30px;
  color: #333333;
  font-family: ${FONT_LATO};
  font-weight: bold;
  padding: 25px;
  padding-left: 10px;
  display: flex;
`

export const ProductsQuantity = styled(ProductsTitle)`
  font-weight: 200;
  padding: 0px;
  font-size: 16px;
  line-height: 22px;
  align-items: end;
  margin-left: 5px;
`

export const ChartTitle = styled.div`
  text-transform:uppercase;
  font-family:${FONT_LATO};
  font-weight:500;
  font-size:25px;
  padding:5px;
  color: ${theme.palette.text.blackLight};
  text-align:center;
  @media (max-width: 400px){
    font-size:18px;
  } 
`

export const Brand = styled.div`
  text-transform:uppercase;
  font-family:${FONT_LATO};
  font-weight:200;
  font-size:8px;
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  margin-top:3px;
  background-color: #F26F3F;
  box-shadow: 0px 2px 2px 0px rgb(0 0 0 / 30%);
  color: #F2F2F2;
  width: fit-content;
  margin-right: auto;
  margin-left: 10px;
`

export const GraphIcon = styled(TimelineIcon)`
  top: 0px;
  ${props => props.singleModeView && css`
    left:0px;
    margin-left: 5px;
  `}
  ${props => !props.singleModeView && css`
    right: 0px;
  `}
  margin-top: 10px;
  margin-right: 5px;
  position: absolute;
  border: solid 1px ${theme.palette.orange.main};
  background-color: ${theme.palette.white.main};
  color: ${theme.palette.orange.main};
  padding: 5px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: ${theme.shadows[5]};
  width: 30px !important;
  height: 30px !important;
  @media (max-width: 380px){
    width: 25px !important;
    height: 25px !important;
  };
`

const favIcon = css`
  width: 30px !important;
  height: 30px !important;
  cursor: pointer;
  color: ${theme.palette.orange.main};
  @media (max-width: 380px){
    width: 25px !important;
    height: 25px !important;
  }
`;

export const FavIcon = styled(FavoriteIcon)`
  ${favIcon}
`

export const FavBorderIcon = styled(FavoriteBorderIcon)`
  ${favIcon}
`

export const ProductDescription = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`