
//-----------------Integration-------------

let text ="";
let listeArticle;
const productPrice = new URL(location.href).searchParams.get("price");

async function recuperationDonne () {
  
    let response = await fetch("http://localhost:3000/api/products/" ) 
   
    return await response.json();
    
}
// -----------------Fetch prix-----------------
async function fetchPrix() {
  
  listeArticle = await recuperationDonne();
  let res = []; 
  for (let i = 0; i < storage.length; i++) {      
      let idProduct1 = storage[i].id;

      result=listeArticle.filter(article => article._id===idProduct1);
      
      res.push(result[0]);
  } 
  return res; 
 }
async function affichageArticles (){
     listeArticle = await recuperationDonne();
    let text = "";
    for (let i = 0; i < listeArticle.length; i++) {
      const element = listeArticle[i];
      
    }
    
  }


async function affichageArticle (){
    let storage = JSON.parse(localStorage.getItem("commande"));
    let listeArticle= await fetchPrix()
    // console.log(listeArticle);;
    storage.forEach((storage,i) => {
    
         text +=  `<article class="cart__item" data-id="" data-color="">+
        <div class="cart__item__img"> 
          <img src="${listeArticle[i].imageUrl}" alt="Photographie d'un canapé">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${listeArticle[i].name}</h2>
            <p>${listeArticle[i].description} <br><br>${listeArticle[i].price} €</p>
            <p>${storage.colors}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${storage.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`; 
      
   
    
    }); 
    document.getElementById('cart__items').innerHTML +=  text;
    boutonSuppr()
}
affichageArticle();


let priceTot =[];



//-----------------Bouton supprimer-------------


function boutonSuppr () {
  [].slice.call(document.getElementsByClassName("deleteItem"))
  .forEach((btnDelete, index) => {
    btnDelete.id = "deleteBtn_"+index;
    document.getElementById("deleteBtn_"+index).addEventListener("click", () => {
        if (confirm("Voulez-vous supprimer la commande?") == true) {
          let current = JSON.parse(localStorage.getItem("commande"));
          current.splice(index, 1);
          localStorage.setItem("commande", JSON.stringify(current));
          document.location.reload(true);
        }
      });
  });
}

//-----------------Quantité ------------- 



async function calcul() {
  let storage = JSON.parse(localStorage.getItem("commande"));
  let listePrix = await fetchPrix();
  let sommeQuantiter = 0;
  let sommesPrix = 0;

  document.querySelectorAll(".itemQuantity").forEach((element, i) => {
    sommeQuantiter += parseInt(element.value);
    sommesPrix += listePrix[i].price * parseInt(element.value);
  });
  //-----------------Modifier Quantité-------------
  document.getElementById("totalPrice").innerText = sommesPrix;
  document.getElementById("totalQuantity").innerText = sommeQuantiter;
  document.querySelectorAll(".itemQuantity").forEach((item, i) => {
    item.addEventListener("change",(event) =>{
      console.log(event)
      event.preventDefault();
      storage[i].quantity= parseInt(item.value)
      localStorage.setItem("commande", JSON.stringify(storage))
      calcul()
      location.reload()
    })
  })
}

calcul()



//-----------------Formulaire valide-------------
let submit = document.getElementById('order');
// let input = document.querySelector('input');

let inputPrenoms = document.getElementById('firstName')
let inputNoms = document.getElementById('lastName')
let inputAdresse = document.getElementById('address')
let inputCity = document.getElementById('city');
let inputMail = document.getElementById('email');

//------------Regex------------------
let testNumber = /^[a-zA-Z-\s]*$/;
let testAdresse = /^[a-zA-Z-0-9\s]*$/;
let regexMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


function verifChamps(e){
  let verification=true;
  if (!testNumber.test(inputPrenoms.value)|| inputPrenoms.value =="") {
    document.getElementById("firstNameErrorMsg").innerHTML = "le champs ne doit pas contenir de chiffre et etre renseigner";
    document.getElementById("firstNameErrorMsg").style.color="red";
    e.preventDefault();
    verification=verification&&false
  }else{document.getElementById("firstNameErrorMsg").innerHTML = "";
  verification=verification&&true


  } if (!testNumber.test (inputNoms.value) || inputNoms.value =="") {
    document.getElementById("lastNameErrorMsg").innerHTML = "le champs ne doit pas contenir de chiffre et etre renseigner";
    document.getElementById("lastNameErrorMsg").style.color="red";
    e.preventDefault();
    verification=verification&&false;
  }
  else{document.getElementById("lastNameErrorMsg").innerHTML = "";
  verification=verification&&true
  }
   if (!testAdresse.test (inputAdresse.value) || inputAdresse.value =="") {
    document.getElementById("addressErrorMsg").innerHTML = "le champs doit contnir une adresse valide ";
    document.getElementById("addressErrorMsg").style.color="red";
    e.preventDefault();
    verification=verification&&false
  }else{document.getElementById("addressErrorMsg").innerHTML = "";
  verification=verification&&true
  }
   if (!testNumber.test (inputCity.value) || inputCity.value =="") {
    document.getElementById("cityErrorMsg").innerHTML = "le champs ne doit pas contenir de chiffre et etre renseigner";
    document.getElementById("cityErrorMsg").style.color="red";
    e.preventDefault();
    verification=verification&&false
  } else{document.getElementById("cityErrorMsg").innerHTML = "";
  verification=verification&&true
  }
  if (!regexMail.test (inputMail.value) || inputMail.value =="") {
    document.getElementById("emailErrorMsg").innerHTML = "le champs doit contenir mail valide ";
    document.getElementById("emailErrorMsg").style.color="red";
    e.preventDefault();
    verification=verification&&false
  }else{document.getElementById("emailErrorMsg").innerHTML = "";
  verification=verification&&true
  }
  retoutrnForm(e,verification)
}

submit.addEventListener('click', (e) => verifChamps(e))
  

  
//---------------POST_Order---------------

let formData = document.querySelector('form').elements;
for (let i = 0; i < formData.length; i++) {
  const element = formData[i];
  
}
let storage = JSON.parse(localStorage.getItem("commande"));


function postOrder(body){
  fetch("http://localhost:3000/api/products/order", {
    method:"POST",
    body:JSON.stringify(body),
    headers:{
      "Content-Type":"application/json"
    }
  })
  .then((res)=> res.json())
  .then((data)=>{
    console.log(data.orderId);
    localStorage.setItem("orderId", data.orderId);
    document.location.href='confirmation.html';
    })
  
  
}




function retoutrnForm (e,verification){
  console.log(verification);
  if (!verification) {
     
    e.preventDefault()
    
  }
  else{
    const body ={
      contact: {
         firstName: formData[0].value,
         lastName: formData[1].value,
         address: formData[2].value,
         city: formData[3].value,
         email: formData[4].value,
       },
       products: recupeId(storage)
      }
      postOrder(body);
  }
  
}
function recupeId (storage){
  let idTableau=[];
  for (let i=0; i<storage.length;i++){
  idTableau.push(storage[i].id)
  }
  console.log(idTableau)
  return idTableau
}
//---------------Confirmation---------------

// localStorage.clear()