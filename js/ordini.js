// LINK PER LE API DI FIRESTORE v8
// https://firebase.google.com/docs/reference/js/v8/firebase.firestore

const firebaseConfig = {
    apiKey: "AIzaSyAtCdvWEc0vu1J8IAFcDeFF1xioR7S77jc",
    authDomain: "domoticplace-2f3ec.firebaseapp.com",
    projectId: "domoticplace-2f3ec",
    storageBucket: "domoticplace-2f3ec.appspot.com",
    messagingSenderId: "830259830944",
    appId: "1:830259830944:web:b702c3092caa999f29a9c5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

function insert_doc(coll, docname, record) {
    var collection = db.collection(coll);
    collection.doc(docname).set(record);
}

function del_doc(coll, docname) {
    var collection = db.collection(coll);
    collection.doc(docname).delete();
}

function query_coll(coll) {
    var collection = db.collection(coll);

    collection
        .where("id", "==", 99)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log(doc.id, " => ", doc.data());
        });
    });
}

function get_coll(coll) {
    var collection = db.collection(coll);

    collection
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) 
            {
                data=JSON.stringify(doc.data());
                document.getElementById('ordini').innerHTML += "<div class='box'><strong>"+doc.id+"</strong>  =>  "+ data+"<br><input id='"+doc.id+"' type='checkbox'/>Clicca a lavoro finito</div>";
                /*if(document.getElementById(doc.id).checked==1){
                    insert_doc('ordini passati', doc.id , doc.data());
                }*/
                //console.log(doc.id, " => ", doc.data());
        });
    });
}

function change(){
    var coll='ordini';
    var collection = db.collection(coll);

    collection
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) 
            {
                //var id=JSON.stringify(doc.id);
                //console.log(doc.id);
                if(document.getElementById(doc.id).checked==1){
                    insert_doc('ordini_passati', doc.id , doc.data());
                    del_doc('ordini', doc.id);
                   
                }
                //console.log(doc.id, " => ", doc.data());
        });
    });
    alert("Fatto, ora aggiorna la pagina.");
    
}

//console.log("SCRIVO NEL DB");
//funzioni database
function write(){
    insert_doc('ordini', 'ordine102', {id:11, name: "pippo1"});
}

function elimina(){
    var el = document.getElementById('delete').value;
    console.log(el)
    if(el==""){
        alert("vuoto");
    }else{
        alert("eliminato");
        del_doc('ordini', el)
    }
    
}

function see(){
    get_coll('ordini');
}
//fine funzioni database

function riepilogo(){
    var text =""
    for (let i = 1; i < 24; i++) {
        if(document.getElementById(String(i)).checked==1){
            var num=100+i;
            var el=document.getElementById(String(num)).textContent;
            text=text+"<li>"+el+"</li>";
        }
        
    }
    if(text!=""){
        document.getElementById('buttonordina').style.fontSize="150%";
        document.getElementById('buttonordina').style.textAlign="left";
        document.getElementById('buttonordina').innerHTML= "<div style='font-size: 120%'><strong>Clicca su 'Ordina' per ordinare:<br></strong>"+text+"</div>";
        document.getElementById('ordina').innerHTML = "<div class='ordina' onclick='ordina()'>Ordina</div>";
    }else{
        document.getElementById('buttonordina').style.fontSize="180%";
        document.getElementById('buttonordina').innerHTML= "Ordine non valido<br>Non hai inserito nulla";
    }
}

function ordina(){
    var text ="";
    var altext = "";
    for (let i = 1; i < 24; i++) {
        if(document.getElementById(String(i)).checked==1){
            var num=100+i;
            var el=document.getElementById(String(num)).textContent;
            text = text + "<li>" + el + "</li>";
            altext = altext + el + "\n";
        }   
    }
    if(text!=""){
        var rand = Math.random()*10;
        rand=String(rand);
        var ordine = "ordine"+rand;
        //alert("riepilogo:\n"+altext);
        var count=0;
        //nome
        var nome = document.getElementById('nome').value;
        if(nome==""){
            document.getElementById('nome').style.border="4px solid red";
        }else{
            document.getElementById('nome').style.border="4px solid green";
            count += 1;
        }
        //numero
        var numero = document.getElementById('numero').value;
        var num = JSON.stringify(numero).length;
        if(numero=="" || num!=12){
            document.getElementById('numero').style.border="4px solid red";
        }else{
            document.getElementById('numero').style.border="4px solid green";
            count += 1;
        }
        //indirizzo
        var indirizzo = document.getElementById('indirizzo').value;
        if(indirizzo==""){
            document.getElementById('indirizzo').style.border="4px solid red";
        }else{
            document.getElementById('indirizzo').style.border="4px solid green";
            count += 1;
        }
        
        if(count==3){
            document.getElementById('buttonordina').innerHTML= "<strong>hai ordinato:<br></strong>"+text;
            document.getElementById('ordina').innerHTML = "<div class='ordina' ><a href='index.html' style='color:white;'>Torna Indietro</a></div>";
            var informazioni = "<li style='color:#c1e1a7;'>"+nome+"</li>"+"<li style='color:#c1e1a7;'>"+numero+"</li>"+"<li style='color:#c1e1a7;'>"+indirizzo+"</li><br>"
            text = informazioni+text;
            //metti il testo nel database
            insert_doc('ordini', ordine, {text});    
        }
    }else{
        
    }
}

function cambiaapple(){
    for (let i = 2; i < 24; i++) {
        document.getElementById(String(i)).checked=0;
    }
}
function cambiaalexa(){
    for (let i = 1; i < 24; i++) {
        if(i!=11){
            document.getElementById(String(i)).checked=0;
        }
    }
}


