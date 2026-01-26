
import './App.css'
// Importerer Title-komponenten.
// HVA: En egendefinert React-komponent.
// HVORFOR: For å dele opp UI-et i mindre, gjenbrukbare deler.
// HVORDAN: Komponenten eksporteres fra ./components/Title og brukes som et JSX-element.
import Title from './components/Title'
// Definerer App-komponenten.
// HVA: En funksjonell React-komponent.
// HVORFOR: Dette er hovedkomponenten i applikasjonen.
// HVORDAN: React tolker funksjonen og renderer JSX-en den returnerer.
function App() {
  // Returnerer JSX som beskriver hvordan UI-et skal se ut.
  // HVA: JSX er en syntaks som ligner HTML, men er JavaScript.
  // HVORFOR: Gjør det enklere å beskrive brukergrensesnitt.
  // HVORDAN: JSX blir kompilert til React.createElement-kall.
  return (
    <main>
      {/* Bruker Title-komponenten */}
      {/* HVA: Et React-komponent */}
      {/* HVORFOR: For å vise en tittel som er definert et annet sted */}
      {/* HVORDAN: Komponenten kalles som en selv-lukkende JSX-tag */}
      <Title />
      <h2>Dette er kjempe gøy!</h2>
    </main>
  )
}

// Eksporterer App-komponenten som standard eksport.
// HVA: Gjør komponenten tilgjengelig for import andre steder.
// HVORFOR: main.jsx (eller index.jsx) trenger App for å rendre applikasjonen.
// HVORDAN: ES-modul eksport med `export default`.
export default App
