import { makeStyles } from '@mui/styles'
import styled from 'styled-components'
import theme, { FONT_LATO } from '../../theme'

export const Root = styled.div`
  display: flex;
  align-items: stretch;
  flex-direction: column;
  justify-content: center;
  min-height: 600;
  background: ${theme.palette.background.main};
`
export const Banner = styled.div`
  background: ${theme.palette.background.main};
  text-align: center;
`

export const FavoritesTitle = styled.div`
  font-size: 24px;
  line-height: 32px;
  font-weight: 200;
  font-family: ${FONT_LATO};
  margin-bottom: 10px;
`

export const Title = styled.div`
  font-size: 30px;
  line-height: 36px;
  font-weight: bold;
  font-family: ${FONT_LATO};
  text-transform: capitalize;
  text-align: center;
`

export const Container = styled.div`
  min-height: 100vh;
  padding: 10px;
  margin-top: 40px;
`

export const FavoriteProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  column-gap: 5px;
`

export const FavoriteItem = styled.div`
  max-width: 175px;
`

const useStyles = makeStyles(theme => ({
  favoritesTitle: {
    textTransform: 'UPPERCASE',
    textAlign: 'center',
    fontFamily: 'Spartan',
    fontWeight: 400,
    fontSize: 22,
    '@media (max-width: 400px)': {
      fontSize: 20,
    },
    margin: 5,
    marginTop: 15,
    marginBottom: 20
  },
  favoritesDescription: {
    textAlign: 'center',
    fontFamily: 'Spartan',
    fontWeight: 200,
    fontSize: 16,
  },
  loginModal: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: 'fit-content',
    height: 'fit-content',
  },
  loginModalTitle: {
    fontFamily: 'Spartan',
    color: theme.palette.text.black,
    fontSize: 20,
    fontWeight: 200,
    padding: 20,
    marginBottom: 10,
    '@media (max-width: 400px)': {
      fontSize: 16,
      fontWeight: 400,
    }
  },
  textCentered: {
    ...theme.textCentered,
    padding: 5,
    paddingBottom: 15
  },
  loader: {
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}))

export default useStyles