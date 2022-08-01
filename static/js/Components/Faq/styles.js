import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    padding: '4%',
    paddingLeft: '10%',
    paddingRight: '10%',
    '@media (max-width: 400px)': {
      paddingLeft: '5%',
      paddingRight: '5%',
    },
  },
  title: {
    fontFamily: 'Spartan',
    fontWeight: 500,
    fontSize: 32,
    marginBottom: 20,
    '@media (max-width: 400px)': {
      fontSize: 24,
    },
    textAlign: 'center'
  },
  faqTitle: {
    fontFamily: 'Spartan',
    fontWeight: 400,
    fontSize: 18,
  },
  faqText: {
    fontFamily: 'Spartan',
    fontWeight: 200,
    fontSize: 14,
  }
}))

export default useStyles