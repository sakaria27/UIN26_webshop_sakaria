import Todo from "./Todo";

/*
  Todos-komponenten har ansvar for å håndtere
  og vise en samling med todo-oppgaver.
*/
export default function Todos(){

    /*
      Dette er en liste med todo-objekter.
      Hvert objekt representerer én oppgave og inneholder:
      - id: unik identifikator (viktig når man renderer lister i React)
      - title: kort tittel på oppgaven
      - content: mer detaljert beskrivelse
      
      Vi bruker en array for å enkelt kunne jobbe med flere todos.
    */
    const todoItems = [
        {
            id: 0,
            title: "Gå på butikken",
            content: "Handle spagetthi og dorull"
        },
        {
            id: 1,
            title: "Skrive emnerapport",
            content: "Gå igjennom statestikk og skrive rapport basert på tall og tilbakemeldinger"
        },
        {
            id: 2,
            title: "Kjøpe kattemat",
            content: "Kjøpe nytt slankefor..."
        }
    ]

    return (
        <section>
            <h2>Todos</h2>
            {/*
              Her renderer vi Todo-komponenten.
              Tanken er at Todo-komponenten skal brukes til
              å vise én enkelt todo.
              
              Senere kan vi bruke todoItems-arrayet sammen
              med map() for å sende data til Todo-komponenten
              via props og vise alle oppgavene dynamisk.
            */}
            <Todo />
        </section>
    )
}
