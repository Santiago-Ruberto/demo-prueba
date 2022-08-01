import { Modal } from "@mui/material"
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/CloseRounded';
import ReactCardFlip from "react-card-flip";
import { useContext, useEffect, useRef, useState } from "react";
import ProductChart from "./ProductChart";
import Login from "../AuthGoogle/Login";
import { postFavorite, deleteFavorite } from "./Product.actions";
import { stillValidToken } from "../AuthGoogle/functions";
import { Brand, Card, Container, Content, FavBorderIcon, FavIcon, Favorites, GraphIcon, Img, Price, ProductDescription, Title } from "./styles";
import { GlobalContext } from "../../App";


const useStyles = makeStyles(theme => ({
  buttonContainer: {
    width: '100%',
    textAlign: 'center',
    marginTop: 10
  },
  button: {
    borderRadius: '0px !important',
    backgroundColor: `${theme.palette.primary.main} !important`,
    width: '30%',
  },
  buttonText: {
    color: theme.palette.white.main,
    fontFamily: 'Spartan'
  },
  modal: {
    ...theme.modal,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '95%',
    height: '95%',
  },
  loginModal: {
    ...theme.modal,
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
  closeModalIcon: {
    cursor: 'pointer'
  },
  textCentered: {
    ...theme.textCentered,
    padding: 5,
    paddingBottom: 15
  }
}));

const Product = ({ product, isFavorite, singleModeView }) => {
  const classes = useStyles()
  const [graphicOnView, setGraphicOnView] = useState(false)
  const [visible, setVisible] = useState(false);
  const [favorite, setFavorite] = useState(false)
  const [loginModal, setLoginModal] = useState(false)
  const placeholderRef = useRef(null);
  const globalContext = useContext(GlobalContext)


  useEffect(() => {
    setFavorite(isFavorite)
  }, [isFavorite])

  useEffect(() => {
    if (!visible && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setVisible(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [visible, placeholderRef]);


  const handleOnClick = (url, title, store) => {
    globalContext.eventTrackGA(store, `${store}:${title}`, 'click-on-prod')
    window.open(url, "_blank").focus()
  }

  const handleGraphic = () => {
    setGraphicOnView(!graphicOnView)
  }

  const handleFavorite = async (favoriteValue) => {
    if (localStorage.getItem('googleId') && await stillValidToken()) {
      if (favoriteValue) {
        const response = await postFavorite(product._id)
        setLoginModal(false)
        if (response) {
          setFavorite(true)
        }
      } else {
        const response = await deleteFavorite(product._id)
        setLoginModal(false)
        if (response) {
          setFavorite(false)
        }
      }
    } else {
      setLoginModal(true)
    }
  }


  const onSuccess = async () => {
    await handleFavorite(!favorite)
  }

  const onFailure = async () => {
    setLoginModal(false)
  }

  return (
    <Container>
      <Card singleModeView={singleModeView}>
        <GraphIcon singleModeView={singleModeView} onClick={(product) => handleGraphic(product)} />
        {visible && process.env.NODE_ENV !== 'development' ?
          <Img src={product.img_url} onClick={() => handleOnClick(product.url, product.title, product.store)} />
          :
          <div style={{ height: 165, width: 165, backgroundColor: '#EEE', borderRadius: 15 }} aria-label={"loading-image"} ref={placeholderRef} />
        }
        <Content>
          <div>
            <Title
              singleModeView={singleModeView}
              onClick={() => handleOnClick(product.url)}>{product.title.toLowerCase()}
            </Title>
            <Brand>{product.store}</Brand>
          </div>
          <ProductDescription>
            <Price singleModeView={singleModeView}>${product.price}</Price>
            <ProductDescription>
              <Favorites>{product.favorites}</Favorites>
              {
                favorite ?
                  <FavIcon onClick={() => handleFavorite(false)} />
                  :
                  <FavBorderIcon onClick={() => handleFavorite(true)} />
              }
            </ProductDescription>
          </ProductDescription>
        </Content>
      </Card>

      <Modal
        open={graphicOnView}
        onClose={() => handleGraphic(product)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modal}>
          <CloseIcon className={classes.closeModalIcon} onClick={() => handleGraphic(product)} />
          <ProductChart product={product} />
        </div>
      </Modal>

      <Modal
        open={loginModal}
        onClose={() => setLoginModal(false)}
        aria-labelledby="modal-google-login"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.loginModal}>
          <CloseIcon className={classes.closeModalIcon} onClick={() => setLoginModal(false)} />
          <div className={classes.textCentered}>
            <Login onSuccess={onSuccess} onFailure={onFailure} />
          </div>
        </div>
      </Modal>
    </Container>
  )
}

export default Product