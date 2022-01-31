//-------------------Recuperation données API---------------

async function recuperationDonne () {
    let response = await fetch('http://localhost:3000/api/products')
    return await response.json();
    

}

//--------------------Création carte--------------------------

async function affichageArticles (){
   let listeArticle = await recuperationDonne();
   let text = "";

//    console.log(listeArticle)
   //--------------------Repetition carte LENGHT--------------------------
   for(let i = 0; i<listeArticle.length; i+=1){
    text += 
    "<a href='./product.html?id="+listeArticle[i]._id+"'>"+
        "<article>"+
             "<img src='"+listeArticle[i].imageUrl+"' id='img' alt='"+listeArticle[i].altTxt+"'>"+
              "<h3 class='productName'>"+listeArticle[i].name+"</h3>"+
              "<p class='productDescription'>"+listeArticle[i].description+"</p>"+
            "</article>"+
        "  </a> "
    }
    document.getElementById('items').innerHTML = text;
}

affichageArticles();

//------------------------------------------------------------------------
