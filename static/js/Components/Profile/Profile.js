import { CircularProgress, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import Product from "../Product/Product"
import { getFavorites } from "./Profile.actions"
import useStyles, { Banner, Container, FavoriteItem, FavoriteProducts, FavoritesTitle, Root, Title } from './styles'
import Login from "../AuthGoogle/Login";
import { useNavigate } from "react-router-dom";
import { stillValidToken } from "../AuthGoogle/functions";
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';


const Profile = () => {
  const navigate = useNavigate();
  const [profileInfo, setProfileInfo] = useState(null)
  const classes = useStyles()
  const [favoritesProducts, setFavoritesProducts] = useState([])
  const [loginModal, setLoginModal] = useState(false)
  const [loading, setLoading] = useState(false)


  const handleFavorites = async (googleId) => {
    setLoading(true)
    const favorites = await getFavorites(googleId)
    if (favorites) setFavoritesProducts(favorites)
    else {
      //handlear?
    }
    setLoading(false)
  }

  const handleInit = async () => {
    if (localStorage.getItem('googleObj') && await stillValidToken()) {
      setProfileInfo(JSON.parse(localStorage.getItem('googleObj')))
      handleFavorites(JSON.parse(localStorage.getItem('googleObj')).googleId)
    } else {
      setLoginModal(true)
    }
  }

  useEffect(() => {
    handleInit()
  }, [])

  const onSuccess = () => {
    window.location.reload()
  }

  const onFailure = () => {
    navigate('')
  }

  return (
    <Root>
      {
        profileInfo ?
          <>
            <Banner>
              <AccountCircleIcon fontSize="large" />
              <Title>
                Mi Perfil
              </Title>
            </Banner>
            <Container>
              <div className={classes.favorites}>
                <FavoritesTitle>
                  Favoritos
                </FavoritesTitle>
                {favoritesProducts.length === 0 ?
                  <div className={classes.favoritesDescription}>
                    Si guardas productos en favoritos, recibirás alertas de actualización de precio del mismo ;)
                  </div>
                  :
                  <FavoriteProducts>
                    {
                      loading ?
                        Array.from(Array(6)).map((product, index) => {
                          return <Skeleton key={index} variant="rectangular" height={300} />
                        })
                        :
                        favoritesProducts.map((product, index) => (
                          <FavoriteItem>
                            <Product product={product} isFavorite={true} />
                          </FavoriteItem>
                        ))
                    }
                  </FavoriteProducts>}
              </div>
            </Container>
          </>
          :
          !loginModal && <CircularProgress className={classes.loader} />
      }
      {
        loginModal &&
        <div className={classes.loginModal}>
          <div className={classes.textCentered}>
            <Login onSuccess={onSuccess} onFailure={onFailure} />
          </div>
        </div>
      }
    </Root>
  )
}

export default Profile