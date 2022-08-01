import { useEffect, useRef, useState } from "react";
import { Banner, BannerSubtitle, BannerTitle, Container, DontPayMore, ImageContainer, Img, PayFair, Subtitle, Title, Wrapper } from "./styles"

const EngagementLayout = () => {
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
    <Container>
      <Wrapper>
        <DontPayMore>
          <Title>No pagues de mas</Title>
          <Subtitle>- Servicio exclusivo -</Subtitle>
          <Banner color='#FFB092'>
            <BannerTitle>BUSCA</BannerTitle>
            <BannerSubtitle>Ese producto que tanto queres</BannerSubtitle>
          </Banner>
          <Banner color='#CCCBDD'>
            <BannerTitle>ENCONTRA</BannerTitle>
            <BannerSubtitle>Tu producto en las paginas lideres del mercado</BannerSubtitle>
          </Banner>
          <Banner color='#455954'>
            <BannerTitle>COMPAR-E</BannerTitle>
            <BannerSubtitle>El mejor precio para su producto</BannerSubtitle>
          </Banner>
        </DontPayMore>
        <PayFair>
          <Title>Paga lo justo</Title>
          <Subtitle>- Servicio exclusivo -</Subtitle>
          <ImageContainer>
            {visible ?
              <>
                <Img src={"https://i.ibb.co/XbhP91w/2326059-1.webp"} />
                <Img src={"https://i.ibb.co/mHLjS6r/41b3622aeb5669ee7cc427b77bec71a4.webp"} />
              </>
              :
              <div style={{ width: '100%', height: 435, backgroundColor: '#EEE' }} aria-label={"loading-image"} ref={placeholderRef} />
            }

          </ImageContainer>
        </PayFair>
      </Wrapper>
    </Container>
  )
}
export default EngagementLayout