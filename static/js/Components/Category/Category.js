import GraphicCardIcon from '../../assets/images/categorias/graphicCard.png'
import ProcessorIcon from '../../assets/images/categorias/Processor.png'
import HardDiskIcon from '../../assets/images/categorias/hardDisk.png'
import PowerIcon from '../../assets/images/categorias/power.png'
import MotherboardIcon from '../../assets/images/categorias/Motherboard.png'
import FanIcon from '../../assets/images/categorias/Fan.png'
import CoolingIcon from '../../assets/images/categorias/cooling.png'
import MonitorIcon from '../../assets/images/categorias/Monitor.png'
import RamIcon from '../../assets/images/categorias/Ram.png'
import CPUIcon from '../../assets/images/categorias/CPU.png'
import { CategoryContainer, CategoryTitle, CategoryImg } from './styles'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


const Category = ({ category, index, handleOnClick, isSelectedCategory }) => {

  const mapIcons = (category) => {
    switch (category) {
      case 'Microprocesadores':
        return ProcessorIcon
      case 'Almacenamiento':
        return HardDiskIcon
      case 'Placas de Video':
        return GraphicCardIcon
      case 'Fuentes de Alimentación':
        return PowerIcon
      case 'Motherboards':
        return MotherboardIcon
      case 'Coolers':
        return FanIcon
      case 'Refrigeracion':
        return CoolingIcon
      case 'Monitores':
        return MonitorIcon
      case 'Memorias Ram':
        return RamIcon
      case 'Gabinetes':
        return CPUIcon
      default:
        return null
    }
  }

  const placeholderRef = useRef(null);
  const [visible, setVisible] = useState(false);

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



  return (
    <CategoryContainer isSelectedCategory={isSelectedCategory} onClick={() => handleOnClick(category)}>
      {visible ?
        <CategoryImg src={mapIcons(category)} />
        :
        <div style={{ width: 50, height: 50, backgroundColor: '#EEE' }} aria-label={"loading-image"} ref={placeholderRef} />
      }
      <CategoryTitle>
        {category}
      </CategoryTitle>
    </CategoryContainer>
  )
}

export default Category