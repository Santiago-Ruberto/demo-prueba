import Slider from '@mui/material/Slider';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../App';
import { Container, PriceRange, SliderContainer, Title } from './styles';


const RangeSlider = ({ onChange, setFilteredProducts }) => {
  const globalContext = useContext(GlobalContext)
  const [value, setValue] = useState([parseInt(globalContext.rangePrice.min), parseInt(globalContext.rangePrice.max)]);
  const [filteredProductsByPrice, setFilteredProductsByPrice] = useState([])

  useEffect(() => {
    setValue([parseInt(globalContext.rangePrice.min), parseInt(globalContext.rangePrice.max)])
    setFilteredProductsByPrice([])
  }, [globalContext.rangePrice])

  const valueText = (value) => {
    return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setFilteredProductsByPrice(onChange(newValue))
  };
  const handleApplyChange = () => {
    setFilteredProducts(filteredProductsByPrice.map((prod) => { return prod._id }))
  }
  const formatText = () => {
    return `[$${valueText(value[0])} - $${valueText(value[1])}]`
  }

  return (
    <Container>
      <Title>Rango de Precio</Title>
      <PriceRange>{formatText()}</PriceRange>
      <SliderContainer>
        <Slider
          getAriaLabel={() => 'Rango de Precio'}
          value={value}
          min={parseInt(globalContext.rangePrice.min)}
          step={100}
          max={parseInt(globalContext.rangePrice.max)}
          onChangeCommitted={handleApplyChange}
          onChange={handleChange}
          valueLabelDisplay="off"
          valueLabelFormat={valueText}
        />
      </SliderContainer>
      <PriceRange>Productos con ese precio: {filteredProductsByPrice.length ? filteredProductsByPrice.length : globalContext.categorizedProducts.length}</PriceRange>
    </Container>
  );
}

export default RangeSlider