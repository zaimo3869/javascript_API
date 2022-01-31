//--------------------Passer id dans URL --------------------------
const idProduit = new URL(location.href).searchParams.get("id");
let article;

async function recuperationDonne() {
  let response = await fetch("http://localhost:3000/api/products/" + idProduit);
  return await response.json();
}

async function affichageArticles() {
  article = await recuperationDonne();
  let text = "";

  //--------------------Remplissage carte LENGHT--------------------------

  document.getElementsByClassName(
    "item__img"
  )[0].innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
  document.getElementById("title").innerText = article.name;
  document.getElementById("price").innerText = article.price;
  document.getElementById("description").innerText = article.description;
  for (let i = 0; i < article.colors.length; i++) {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value="${article.colors[i]}">${article.colors[i]}</option>`;
  }
}
affichageArticles();

//--------------------  Locale strorage--------------------------

const addToCart = document.getElementById("addToCart");

//localStorage.clear();

addToCart.addEventListener("click", () => {
  const commande = {
    id: idProduit,
    imageUrl:article.imageUrl,
    colors: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  };

  //-------------------- Securité remplissage Données--------------------------

  let local = JSON.parse(localStorage.getItem("commande"));
  let quantityBoo = true;
  if (document.getElementById("colors").value === "") {
    confirm("mettre une couleur ")
    quantityBoo&&=false;
  }if ( parseInt(document.getElementById("quantity").value) === 0) {
    confirm("mettre une quantité ");
    quantityBoo&&=false;
  }
  if ((document.getElementById("quantity").value)=== ""){
    
    confirm("mettre une quantité ");
    quantityBoo&&=false;
  }console.log(document.getElementById("quantity").value);
  if ((local === null || local.length === 0) && quantityBoo==true) {
    localStorage.setItem("commande", JSON.stringify([commande]));
  } else if(quantityBoo==true) {
    let result = verifCommande(local, commande);
    if (result[1]) {
      local = result[0];
    } else {
      local.push(commande);
    }
    localStorage.setItem("commande", JSON.stringify(local));
    confirm('Vous avez ajouter cette article')
    document.location.href="cart.html"
  }
 

 
});

//-------------------- Securité remplissage Données--------------------------

function verifCommande(localActuel, comandeAjoute) {
  let test = false;
  for (let i = 0; i < localActuel.length; i++) {
    if (
      comandeAjoute.id === localActuel[i].id &&
      comandeAjoute.colors === localActuel[i].colors
    ) {
      localActuel[i].quantity =
        parseInt(localActuel[i].quantity) + parseInt(comandeAjoute.quantity);
      test = true;
      break;
    }
  }
  return [localActuel, test];
}
//localStorage.clear()
// localStorage.setItem("zz", "a3");
