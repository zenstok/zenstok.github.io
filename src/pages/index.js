import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-family: "Epilogue";
`

const DemoContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fffbfb;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid black;
  
  h3 {
    font-family: "Fascinate";
  }
`

const RestaurantContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-color: #fffbfb;
  padding: 0 32px;
`

const RestaurantHeaderText = styled.div`
  font-family: "Fascinate";
  font-size: 3rem;
  margin-bottom: 48px;
`

const RestaurantText = styled.div`
  text-align: justify;
`;

const RestaurantSection = styled.div`
  flex: 1 0 0;
  padding: 16px;
`



const ImageContainer = styled.div`
  flex: 0 0 85%;
  overflow: hidden;
  @keyframes move {
    0% {
      transform: scale(1) rotate(0deg);
    }
    100% {
      transform: scale(1.5) rotate(0.1deg);

    }

  }

  .gatsby-image-wrapper {
    width: 100%;
    animation: move 3s infinite ease-in-out;
  }
`

const MenuContainer = styled.div`
  flex: 0 0 15%;
  overflow: hidden;
  padding: 32px;
  display: flex;
  align-items: center;
  background-color: white;
  font-family: "Epilogue";
`

const DashedBorder = styled.div`
  width: 100%;
  height: 100%;
  border-top: 1px dashed black;
  border-bottom: 1px dashed black;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  margin: 0 32px;
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const LogoContainer = styled.div`
cursor: pointer;
`

const FixedMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  transition: opacity 0.7s ease;
  opacity: ${({ showFixedMenu }) => showFixedMenu ? 1 : 0};

  .menu-container {
    padding: 0;
  }
`

const FixedArrow = styled.div`
  position: fixed;
  bottom: 50px;
  right: 25px;
  transition: opacity 0.7s ease;
  opacity: ${({ showFixedMenu }) => showFixedMenu ? 1 : 0};

  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d9c7c76e;
  border-radius: 6px;
  
  :hover {
    background: gray;
  }
`

const MobileSidebar = styled.div`
  @media only screen and (max-width: 700px) {
    display: flex;
  }
  display: none;
  top: 0;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: #121263;
  transform: translateX(-100%);
  transition: all 0.5s ease;
`

/**
 *
 * @param element
 * @returns {boolean}
 */
export const shouldShowFixedSidebar = (element) => {
  if (!(element instanceof Element)) {
    throw new Error("element must be an Element type!")
  }

  const rect = element.getBoundingClientRect()

  if(rect.top === 0) {
    return false;
  }

  return rect.top <= -rect.height
}

const dispatchOnWheelChange = (data) => {
  const event = new Event("onwheelchange")
  event.data = data
  window.dispatchEvent(event)
}

function debounce(func, timeout = 300) {
  let timer
  let count = 0
  return (...args) => {
    count++
    clearTimeout(timer)
    console.log(count)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

const debouncedCall = debounce((e) => window.scrollTo({
  top: e.data.nextNumber * e.data.fullWidthContainer.current.scrollHeight,
  behavior: "smooth"
}), 100)


const scrollIntoView = selectorId => {
  document.querySelector(selectorId).scrollIntoView({
    behavior: 'smooth',
  })
}

function MenuItemComponent({selectorId, children}) {
  return <MenuItem onClick={() => scrollIntoView(selectorId)}>{children}</MenuItem>
}

export default function Demo() {
  const fullWidthContainer = useRef()
  const [showFixedMenu, setShowMenuSidebar] = useState(false)
  const lastWindow = useRef(null)
  useEffect(() => {
    setShowMenuSidebar(shouldShowFixedSidebar(fullWidthContainer.current))
  }, [fullWidthContainer])
  useEffect(() => {
    window.addEventListener("onwheelchange", debouncedCall)
    window.onwheel = (e) => {
      setShowMenuSidebar(shouldShowFixedSidebar(fullWidthContainer.current))
      if (e.deltaY >= 20 || e.deltaY <= -20) {
        const currentContainer = e.path.find(el => [].some.call(el.classList, className => /order-.*/.test(className)))
        if (![].some.call(currentContainer?.nextElementSibling?.classList, className => /order-.*/.test(className))) {
          return
        }
        // if(lastWindow.current === currentContainer) {
        //   console.log(window.pageYOffset);
        // } else {
        //   console.warn(currentContainer)
        let nextNumber = [].find.call(currentContainer?.nextElementSibling?.classList,
          className => /order-.*/.test(className)).slice(-1)

        if (e.deltaY < 0) {
          nextNumber = nextNumber - 2
        }
        // dispatchOnWheelChange({nextNumber, fullWidthContainer});
        window.scrollTo({ top: nextNumber * fullWidthContainer.current.scrollHeight, behavior: "smooth" })
        // }
        // lastWindow.current = currentContainer;
      }
    }
  }, [])
  return <>
    <Container className="order-0" ref={fullWidthContainer} id="home">
      <ImageContainer>
        <StaticImage src="http://www.acapulco-restaurant.ro/ima/1.jpg" alt="img" />
      </ImageContainer>
      <MenuContainer>
        <DashedBorder>
          <MenuItemComponent selectorId="#restaurant">Restaurant</MenuItemComponent>
          <MenuItemComponent selectorId="#meniu">Meniu</MenuItemComponent>
          <MenuItemComponent selectorId="#evenimente">Evenimente</MenuItemComponent>
        </DashedBorder>
        <LogoContainer>
          <StaticImage
            style={{ borderRadius: "16px", height: "100px" }}
            src="../images/corina_logo_acapulco.jpeg"
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Acapulco logo"
          />
        </LogoContainer>
        <DashedBorder>
          <MenuItemComponent selectorId="#rezervari">Rezervari</MenuItemComponent>
          <MenuItemComponent selectorId="#contact">Contact</MenuItemComponent>
          <MenuItemComponent selectorId="#galerie-foto">Galerie foto</MenuItemComponent>
        </DashedBorder>
      </MenuContainer>
    </Container>
    <Container className="order-1" id="restaurant">
      <RestaurantContent>
        <RestaurantSection>
          <RestaurantHeaderText>Descoperă locația nostră</RestaurantHeaderText>
          <RestaurantText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </RestaurantText>
        </RestaurantSection>
        <RestaurantSection>
          <StaticImage src="https://lafelinare.com/wp-content/uploads/2020/06/E48DA022-8425-42A6-963E-3F6F92598C02-scaled.jpg"
                       alt="img"
                       style={{height: '600px'}}
          />
        </RestaurantSection>
      </RestaurantContent>
    </Container>
    <Container className="order-2" id="meniu">
      <DemoContent>
        <h3>
          Meniu Content
        </h3>
      </DemoContent>
    </Container>
    <Container className="order-3" id="evenimente">
      <DemoContent>
        <h3>
          Evenimente Content
        </h3>
      </DemoContent>
    </Container>
    <Container className="order-4" id="rezervari">
      <DemoContent>
        <h3>
          Rezervari Content
        </h3>
      </DemoContent>
    </Container>
    <Container className="order-5" id="contact">
      <DemoContent>
        <h3>
          Contact Content
        </h3>
      </DemoContent>
    </Container>
    <Container className="order-6" id="galerie-foto">
      <DemoContent>
        <h3>
          Galerie foto Content
        </h3>
      </DemoContent>
    </Container>
    <FixedMenu showFixedMenu={showFixedMenu}>
      <MenuContainer className="menu-container">
        <DashedBorder>
          <MenuItemComponent selectorId="#restaurant">Restaurant</MenuItemComponent>
          <MenuItemComponent selectorId="#meniu">Meniu</MenuItemComponent>
          <MenuItemComponent selectorId="#evenimente">Evenimente</MenuItemComponent>
        </DashedBorder>
        <LogoContainer onClick={() => {setShowMenuSidebar(false); scrollIntoView('#home')}}>
          <StaticImage
            style={{ borderRadius: "16px", height: "100px" }}
            src="../images/corina_logo_acapulco.jpeg"
            formats={["AUTO", "WEBP", "AVIF"]}
            alt="Acapulco logo"
          />
        </LogoContainer>
        <DashedBorder>
          <MenuItemComponent selectorId="#rezervari">Rezervari</MenuItemComponent>
          <MenuItemComponent selectorId="#contact">Contact</MenuItemComponent>
          <MenuItemComponent selectorId="#galerie-foto">Galerie foto</MenuItemComponent>
        </DashedBorder>
      </MenuContainer>
    </FixedMenu>
    <FixedArrow showFixedMenu={showFixedMenu} onClick={() => window.scrollTo({top: 0, behavior: "smooth" })}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path d="M11 2.206l-6.235 7.528-.765-.645 7.521-9 7.479 9-.764.646-6.236-7.53v21.884h-1v-21.883z" />
      </svg>
    </FixedArrow>
    <MobileSidebar>
      content
    </MobileSidebar>
  </>
}