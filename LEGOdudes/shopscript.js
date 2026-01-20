document.getElementById("cart-button").addEventListener("click", function(){
    document.getElementById("cart").classList.toggle("hidden")
})

//test funksjon for produkt
function fetchProducts(){
    fetchProducts.map(p => console.log(p.title))
}

fetchProducts()