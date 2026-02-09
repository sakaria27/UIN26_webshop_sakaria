import './style/lego.css'
import { products } from './assets/legodudes'
import { useEffect, useState } from 'react'
function App() {

  const [isOpen, setIsOpen] = useState(false)
  const [cart, setCart] = useState([])
  const [cartQuantity, setCartQuantity] = useState(0)

  console.log("Cart", cart)
/*
  useEffect kjøres automatisk av React
  hver gang noe i dependency-listen endres.
*/
  useEffect(() => {

    /*
      cart.reduce(...) brukes for å regne ut
      totalt antall produkter i handlekurven.
      
      - sum starter på 0
      - item er ett produkt i cart
      - item.quantity legges til summen for hvert produkt
    */
    const totalQuantity = cart.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    /*
      Oppdaterer state cartQuantity
      slik at UI-et kan vise riktig totalt antall
      (f.eks. antall varer i handlekurv-ikonet).
    */
    setCartQuantity(totalQuantity);

    /*
      Denne useEffect-en kjører kun når cart endres,
      fordi cart er eneste dependency.
    */
  }, [cart]);


  function Header({setIsOpen, cartQuantity}){
    return(
      <header>
        <h1>
          <a href="index.html">             
            <img src="website_images/LD_logo.svg" alt="LEGOdudes" />
          </a>
          </h1>
          <button id="cart-button" onClick={()=> setIsOpen((prev) => !prev)}>
            <div id="cart-quantity">{cartQuantity}</div>
            <img src="website_images/legocart.svg" alt="Handlevogn" />
          </button>
      </header>
    )
  }

  function Nav(){
    return(
       <nav>
          <a href="#">City</a>
          <a href="#">Ninjago</a>
          <a href="#">Castles & Knights</a>
          <a href="#">Marine & Pirates</a>
          <a href="#">Movie characters</a>
        </nav>
    )
  }

  function CategoryTitle(){
    return (<h2>Ninjago</h2>)
  }

  function Products({products, setCart}){
    return (
    <div id="product-list">
      {products.map(p => <ProductCard key={p.prodid} p={p} setCart={setCart} />)}
      
    </div>)
  }

  function ProductCard({p, setCart}){
      /*
        handleClick kjøres når brukeren klikker på
        f.eks. "Legg i handlekurv"-knappen.
      */
      const handleClick = () => {

        /*
          setCart brukes for å oppdatere handlekurven (state).
          Vi sender inn en funksjon for å være sikre på
          at vi alltid jobber med nyeste versjon av cart (prev).
        */
        setCart((prev) =>

          /*
            prev.some(...) sjekker om produktet allerede
            finnes i handlekurven.
            - Returnerer true hvis et produkt har samme prodid
            - Returnerer false hvis produktet ikke finnes
          */
          prev.some(item => item.prodid === p.prodid)

            /*
              HVIS produktet allerede finnes:
              → vi må øke antallet (quantity) med 1
            */
            ? prev.map(item =>

                /*
                  Vi går gjennom alle produkter i handlekurven
                  og finner produktet med riktig prodid
                */
                item.prodid === p.prodid

                  /*
                    Når riktig produkt er funnet:
                    - kopier alle eksisterende egenskaper
                    - øk quantity med 1
                  */
                  ? { ...item, quantity: item.quantity + 1 }

                  /*
                    Hvis det er et annet produkt:
                    - returner det uendret
                  */
                  : item
              )

            /*
              HVIS produktet IKKE finnes i handlekurven:
              → legg det til som et nytt produkt
            */
            : [
                ...prev,            // behold alle eksisterende produkter
                {
                  ...p,             // kopier produktdata
                  quantity: 1       // start antall på 1
                }
              ]
        );

        /*
          Logger en melding i konsollen for debugging,
          slik at utvikleren ser at klikket ble registrert.
        */
        console.log("Legg i handlekurv");
      };
    return (
      <article className="product-card">
          <img src={`website_images/PROD_${p.imagefile}`} alt={p.title} />
          <a href="#">${p.category}</a>
          <h3>{p.title}</h3>
          <p>Kr. {p.price},-</p>
          <button onClick={handleClick}>Legg til handlevogn</button>
      </article>
    )
  }

  function Cart({isOpen, cart, setCart}){
    return (
      <>
        {/*
          Hele handlekurv-seksjonen.
          Vises eller skjules basert på verdien av isOpen.
        */}
        <section id="cart" className={isOpen ? "" : "hidden"}>

          {/*
            Tabell som inneholder innholdet i handlekurven
          */}
          <table id="cart-items">
            <tbody>

              {/*
                Betinget rendering (ternary-operator):

                SJEKK:
                cart.length <= 0
                → Er handlekurven tom?
              */}
              {cart.length <= 0 ? (

                /*
                  Hvis handlekurven er tom:
                  - Vis en melding til brukeren
                */
                <tr>
                  <td>Ingen varer i handlevognen enda.</td>
                </tr>

              ) : (

                /*
                  Hvis handlekurven IKKE er tom:
                  - Gå gjennom alle produkter i cart
                  - Render én CartItem-komponent per produkt
                */
                cart.map(p => (

                  /*
                    CartItem får produktet p som prop.
                    key er nødvendig for React når man renderer lister.
                  */
                  <CartItem
                    key={p.prodid}
                    p={p}
                    setCart={setCart}
                  />
                ))
              )}

            </tbody>
          </table>

          {/*
            Viser total pris for handlekurven.
            Verdien bør egentlig beregnes dynamisk fra cart.
          */}
          <p>
            Total pris: <span id="total-price">0</span> NOK
          </p>

        </section>
      </>
    )
  }
  
  function CartItem({p, setCart}){
    /*
      removeFromCart kjøres når brukeren vil fjerne ett eksemplar
      av et produkt fra handlekurven.
      prodid forteller hvilket produkt som skal reduseres.
    */
    const removeFromCart = (prodid) => {

      /*
        setCart oppdaterer handlekurv-state.
        prev er den forrige (nåværende) handlekurven.
      */
      setCart(prev =>

        /*
          Først bruker vi map():
          - Vi går gjennom alle produkter i handlekurven
          - Vi finner produktet med riktig prodid
          - Quantity reduseres med 1 for akkurat dette produktet
        */
        prev.map(item =>
          item.prodid === prodid
            /*
              Hvis dette er produktet som skal fjernes:
              - kopier alle eksisterende egenskaper
              - reduser quantity med 1
            */
            ? { ...item, quantity: item.quantity - 1 }

            /*
              Hvis det er et annet produkt:
              - returner det uendret
            */
            : item
        )

        /*
          Etter map() bruker vi filter():
          - Fjerner alle produkter som har quantity 0 eller mindre
          - Dette gjør at produkter automatisk forsvinner
            fra handlekurven når antallet blir 0
        */
        .filter(item => item.quantity > 0)
      );
    };


    return (
      <tr>
        <td className="title">{p.title}</td>
        <td className="price">{p.price}</td>
        <td className="quantity">{p.quantity}</td>
        <td className="delete"><button onClick={()=>removeFromCart(p.prodid)}>X</button></td>
      </tr>
    )
  }  


  return (
    <div id="container">
      <Header setIsOpen={setIsOpen} cartQuantity={cartQuantity} />
      <Nav />
      <main>
        <CategoryTitle />
        <Products products={products} setCart={setCart} />
      </main>
      <Cart isOpen={isOpen} cart={cart} setCart={setCart} />
    </div>
  )
}

export default App
