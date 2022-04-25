const express= require('express');
const bodyParser = require ('body-parser');
const {client, ClientBase, Client} = require("pg");

//creamos nuestra api
const api=express();
const cors =require("cors");
const { response } = require('express');

//info fake
const noticias=[]

//habilitar el cors y body parser
api.use(cors());
api.use(bodyParser.urlencoded({extended:false}));
api.use(bodyParser.json());

//configurar mi primer endpoint

api.get('/', (req,res)=>{
res.send("ok!");
});
//configurar las credenciales de la base de datos
const config ={
  user:'postgress',
  host:'localhost',
  password:'agus',
  database:'cursos',
 
}

api.get('/noticias', async (req,res)=>{
    res.send(noticias);
  const client = new Client(config);
  await client.connect();
 //nadie me va a hacer sql injection porque no me puedo conectar ni yo
  const respuesta = await client.query('select * from cursos');
  console.log (respuesta);
  await client.end();
  response.setDefaultEncoding(noticias.slice(0,size));

  });
  //variable para configurar muchos endpoints no hardcodeados
  api.get('/noticias/:noticiaId', (req,res)=>{
    let resultado ={};
    const noticiaId= req.params.noticiaId;

    //buscar la noticia por ese noticia ID
    noticias.forEach((noticia)=>{
      if(noticias.id==noticiaId){
        resultado=noticia;
      }
      response.send(resultado);
    });
    //validar que el resulatado no este vacio 
    if (resultado===null){
         response.statusCode=404;
         response.send({
           error:"la noticia no existe"
         });
         return;    
    }
    
    res.send(resultado);


  });

//levatamos la api y escuchamos el puerto
api.listen(3001, () =>{
  console.log("la api esta funcionando");
});


//endpoint para el formulario

api.post("/contact",(request,response)=>{
  const datos=request.body;
  console.log(datos);
  response.send({message:"ok!"});
//   //probar cliente pg
// const client= new Client();
// await client.connect();


});



api.get("/*",(req,res)=>{
  
  res.send("no se encontro")
});