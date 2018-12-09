//renderPage býr til síðuna og birtir allt efnið.
const renderPage=(options)=> { //innsendur parameter er skilgreindur hér, id-ið gallery og array-ið staff í gegnum options parameterinn.

  const photos  = document.getElementById(options.element); // nota hér innsendan parameter til að þess að velja það element sem efnið er renderað í, gallery sem er í script tagi í html.
  const data = options.data;
  //stillum hér hvað viljum margar myndir í hverri röð eftir skjástærð.
  let w = window.outerWidth; //let w tekur alltaf inn window width
  photos.innerHTML= ``;  //tæmir fyrst div/element áður en rendering á sér stað.

  let photosInRow; //fjöldi mynda í röð eftir skjábreidd
  if (w <= 400) {
    photosInRow=1;
  }
  else if (w<=600) {
    photosInRow=2;
  }
  else if (w <= 990) {
    photosInRow=3;
  }
  else {
    photosInRow=6;
  }

/* búa til for loop sem fer í gegnum allar myndirnar í arrayinu.
 Búa til nýja breytu inn í for loop, i er tala frá 0 upp í data.lenght. Ef ert kominn upp í töluna 6 þá birtist tóma div-ið með id details, birtist fyrir ofan næstu myndaröð.
 Nota modulus % - deiling sem skilar út afgangi, dæmi 12%5 skila út 2 í afgang.
 Á eftir sjöttu hverri mynd þá birtist div class=collapse og id=details */
  for ( let i = 0; i < data.length; i++) {  
    const isDivisibleByRow = i%photosInRow === 0;
    if (isDivisibleByRow) { 
      photos.innerHTML+= ` 
      <div class="collapse" id="details${i/photosInRow}"></div>`  //ef fjöldi mynda í röð er náð samkvæmt photosInRow þá á að bæta inn collapse element.
    }
//rowNumber er sent inn í showDetails functions til að opna collapse.
//itemData eru gögn úr data.js sem eru birt inní collapse.
// Math.floor skila út hæðstu tölu sem er lægri eða jöfn og gefin tala.
   const rowNumber = Math.floor(i/photosInRow+1);
   const itemData = {
     name: data[i].name,
     jobTitle: data[i].jobTitle,
     answer1: data[i].answer1,
     answer2: data[i].answer2,
     answer3: data[i].answer3,
     answer4: data[i].answer4,
     image2: data[i].image2
   }
   // Setja inn hvert element/mynd fyrir sig inn í targeted element(#gallery)
   // hver mynd fær each_photo_wrapper classa
   // kalla á með onclick á showDetails functionið 
   //data er attribute sem getur sótt value af því eins og til dæmis alt = "Kalli Bjarni"
   photos.innerHTML+=` 
    <div class="each_photo_wrapper img_${i}" style="background-image:url(${data[i].image1})" onClick="showDetails(${rowNumber},${i},'${itemData.name}','${itemData.jobTitle}',
    '${itemData.answer1}','${itemData.answer2}','${itemData.answer3}','${itemData.answer4}','${itemData.image2}')" data-original="${data[i].image1}" data-changeimg="${data[i].image2}">
    </div>`;
  }
/* targeta hvað á að opna - math ceil skilar út lægstu tölu sem er stærri eða jöfn og gefin tala */
  const numberOfRows = Math.ceil(data.length/photosInRow);
/*búa til tómt div sem er á eftir hverri mynd sem er hægt er að nota til að birta details inn í */
  photos.innerHTML+= `
    <div class="collapse" id="details${numberOfRows}"></div>
    ` 
}
// hér er engin mynd valin, þegar þú klikkar á myndina þá vitum við i/id á hverri mynd er
let chosenImage = -1;

//hér er functionið sem birtir gögnin, taka inn þessa parametra sem eru í sviganum
const showDetails=(row, i, name, jobTitle, answer1, answer2,answer3, answer4, image2)=> {
 
//búa til nýja breytu til að fá efnið fade in, bæta nýjum classa(detail_open) við á collapse div sem hefur id-ið details, row er targeted-rowin
    const detailsRow = document.getElementById("details" + row);
//sækja myndina sem smellt er á og sem breytist. i - er targetmyndin
    const theImg = document.getElementsByClassName("img_" + i);

//photoWrapper - targetum divið fyrir hverja mynd fyrir sig, dom elemmentið sem við erum að targeta, [0] er vegna þess að við viljum bara sækja eina í einu - fyrstu myndina sem við smellum á.
    const photoWrapper = document.getElementsByClassName("each_photo_wrapper");
    theImg[0].style.backgroundImage = 'url('+ theImg[0].getAttribute("data-original")+')';
    
/*ii notum við sem annað id í rauninni - þar sem við erum búin að nota i, gæti þessvegna heitið a. Við loopum í gegnum þetta meðan photowrapper length er minna en ii. 
fyrir hverja línu rúllum við í gegnum alla rununa en ef myndin er þegar opin og hefur klassann active/virk þá passar hann að elementið fái original mynd. */ 
    for (ii = 0; ii < photoWrapper.length; ii++) {
      if ( photoWrapper[ii].classList.contains('active') && !theImg[0].classList.contains('active')) {
        photoWrapper[ii].style.backgroundImage = 'url('+ photoWrapper[ii].getAttribute("data-original")+')';
        photoWrapper[ii].classList.remove('active');
      }
    }
 
//ef er minna eða jafnt og skjábreidd 990px þá breytist mynd nr. 1 í mynd nr.2 úr arrayinu staff í data.js, annars ef skjábreidd er yfir 990px þá bætist myndin við í collapse.
  let w = window.outerWidth;
    if (!theImg[0].classList.contains("active")&& w <= 990) {
      theImg[0].classList.add("active");
      theImg[0].style.backgroundImage = 'url('+ theImg[0].getAttribute("data-changeimg")+')';
    }
    else {
      theImg[0].classList.add("active");
    }
  
/* búa til breytuna allDetails til að passa að engin mynd sé sjáanleg áður en næsta mynd er birt, þannig að þegar smellt er á aðra mynd þá birtist details fyrir hana. Þetta semsagt tæmir collapse til þess að þegar er smellt á næstu mynd þá haldist ekki gömlu upplýsingarnar í - allDetails[i].innerHTML="" */
   const allDetails = document.getElementsByClassName("collapse");
   for ( let i = 0; i < allDetails.length; i++) {
     allDetails[i].innerHTML=""
   }

//búa til breytu til að targeta rétt collapse element og spýta gögnunum inn - name, jobtitle og þar fram eftir götunum.
//row þýðir í hvaða röð collapse elementið sem var smellt á. 
//Svo kemur template literals fyrir neðan með öllum þeim gögnum sem eiga að birtast frá arrayinu - ${parameter} - þetta er breytilegt, setja inn þær upplýsingar sem við viljum birta.
   const details = document.getElementById("details" + row);
   details.innerHTML=
   `
   <div class="details_content">
     <div class="left_wrapper">
       <img class="img_large" src="${image2}">
     </div>
     <div class="right_wrapper">
       <div class="right_content">
         <h1> ${name} </h1>
         <h2> ${jobTitle} </h2>
         <p class="questions">Best beer you've ever tried:</p>
         <p> ${answer1} </p>
         <p class="questions">Preferred drinking spot:</p>
         <p> ${answer2} </p>
         <p class="questions">Most embarrassing moment:</p>
         <p> ${answer3} </p>
         <p class="questions"> Most annoying habit:</p>
         <p> ${answer4} </p>
       </div>
     </div>
   </div>
   ` 
//ef smellt er á sömu mynd og er opin sem hefur klassann details_open, þá fjarlægja þann klasa af til að loka collapse og maxHeight verður "0".
    if (detailsRow.classList.contains("detail_open")) { 
       detailsRow.classList.remove("detail_open");
       detailsRow.style.maxHeight="0"; 
  //ef einhver mynd er opin og önnur mynd er valin þá keyrist þessi kóði og collapse fær height 100%
  //bætum við classList - fade_in til að fá myndirnar til fade-ast inn 
      if (i !== chosenImage) { 
        detailsRow.style.maxHeight="100%";
        setTimeout(function(){
          detailsRow.classList.add("detail_open"); 
         }, 300);
        setTimeout(function(){
          detailsRow.querySelector(".details_content").classList.add("fade_in");
         }, 300); 
       }
    }
  //þegar mynd er valin í fyrsta sinn á síðunni þá keyrist þessar línur. Einnig ef búið er að loka viðkomandi mynd og smellt er á aðra mynd. 
    else {
      detailsRow.classList.add("detail_open");  
      detailsRow.style.maxHeight="100%";
      setTimeout(function(){
        detailsRow.querySelector(".details_content").classList.add("fade_in"); 
      }, 300);
    }
//Hér er valin mynd skilgreind, þetta þarf að vera hér því hér er verið að senda i inn í þetta function og það er sú mynd sem við erum að klikka á.
  chosenImage = i;  
 }

// Þetta er functionið sem kallað er á úr HTML og keyrir allan kóðann í einu, load og resize eru eventListeners 
function photoGallery (options) {
 window.addEventListener("load", function(){renderPage(options)});
 window.addEventListener("resize", function(){renderPage(options)}); //þegar þetta function keyrist þá er alltaf verið að tjékka í DOM á window resize.
}





