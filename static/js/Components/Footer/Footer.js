import { MDBContainer, MDBFooter, MDBIcon } from "mdbreact";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { makeStyles } from '@mui/styles'
import FooterForm from "./FooterForm";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#ffffff",
    textAlign: 'center',
    boxShadow: '0px -1px 15px -5px rgb(0 0 0 / 45%)',
  },
  faqSection: {
    color: '#000000',
    fontFamily: 'Spartan',
    fontWeight: 400,
    fontSize: 18,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      color: '#000000',
      fontWeight: 500,
    }
  }
}))
const Footer = () => {
  const classes = useStyles()
  return (
    <MDBFooter className={classes.root} color='white' >
      <MDBContainer className='p-4'>
        <div className='container p-4 pb-0'>
          <section className='mb-4'>
            <a
              className='btn btn-primary btn-floating m-1'
              style={{ backgroundColor: '#ac2bac' }}
              href='https://www.instagram.com/devthion/'
              role='button'
            >
              <MDBIcon fab icon='instagram' />
            </a>

            <a
              className='btn btn-primary btn-floating m-1'
              style={{ backgroundColor: '#0082ca' }}
              href='https://www.linkedin.com/in/devthion-enterprise-803949228/'
              role='button'
            >
              <MDBIcon fab icon='linkedin-in' />
            </a>
          </section>
          <Link className={classes.faqSection} to="/faqs">Preguntas Frecuentes</Link>
        </div>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright: {' '}
        <a className='text-white' href='http://www.devthion.com/'>
          DEVTHION
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer