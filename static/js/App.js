import Products from "./Components/Product/Products";
import Categories from "./Components/Category/Categories";
import Search from "./Components/Search/Search";
import { createContext, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Faq from "./Components/Faq/Faq";
import Profile from "./Components/Profile/Profile";
import { Container, Title } from "./styles";
import EngagementLayout from "./Components/EngagementLayout/EngagementLayout";

export const GlobalContext = createContext(null);

const App = ({ eventTrackGA }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [rangePrice, setRangePrice] = useState({ min: null, max: null });
  const [filteredProduct, setFilteredProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categorizedProducts, setCategorizedProducts] = useState([]);

  //TODO USAR [products, setProducts] DESDE EL GLOBAL CONTEXT
  return (
    <BrowserRouter>
      <GlobalContext.Provider
        value={{
          rangePrice: rangePrice,
          setRangePrice: setRangePrice,
          filteredProduct: filteredProduct,
          setFilteredProduct: setFilteredProduct,
          setSelectedCategory: setSelectedCategory,
          selectedCategory: selectedCategory,
          categorizedProducts: categorizedProducts,
          setCategorizedProducts: setCategorizedProducts,
          eventTrackGA: eventTrackGA,
          products: products,
          setProducts: setProducts,
        }}
      >
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Container>
                  <Title>Encontrá el mejor precio para tu producto</Title>
                  <Search
                    products={filteredProducts.sort(function (a, b) {
                      return a.price - b.price;
                    })}
                    setFilteredProducts={setFilteredProducts}
                  />
                  <Categories
                    categories={categories}
                    setCategories={setCategories}
                    products={products}
                    setFilteredProducts={setFilteredProducts}
                  />
                  <Products
                    totalProducts={products.length}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    products={filteredProducts.sort(function (a, b) {
                      return a.price - b.price;
                    })}
                    setProducts={setProducts}
                    setFilteredProducts={setFilteredProducts}
                    filteredProducts={filteredProducts}
                  />
                  <EngagementLayout />
                </Container>
                <Footer />
              </>
            }
          />
          <Route
            exact
            path="/faqs"
            element={
              <>
                <Faq />
                <Footer />
              </>
            }
          />

          <Route exact path="/profile" element={<Profile />} />

          {/*<Route exact path='/prueba' element={
            <PruebaTs />
          } />*/}
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
};

export default App;
