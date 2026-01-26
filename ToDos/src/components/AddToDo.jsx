export default function AddToDo(){
    return (
        <form>
            <label htmlFor="todotitle">Todo tittel</label>
            <input type="text" id="todotitle" placeholder="Dra på butikken"></input>
            <button>Make todo</button>
        </form>
    )
}