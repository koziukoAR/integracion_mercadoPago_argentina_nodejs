//resultado de la venta test_user_13105638@testuser.com pass qatest8870
//http://localhost/mp-node/indexSucces.html?collection_id=14708053015&collection_status=approved&payment_id=14708053015&status=approved&external_reference=koziuko@gmail.com&payment_type=credit_card&merchant_order_id=2626150575&preference_id=749374809-191ea955-136e-4972-a107-bbddb4bd65e4&site_id=MLA&processing_mode=aggregator&merchant_account_id=null


const express = require('express');
const app=express();
const mercadopago=require('mercadopago');

const bodyParser =require('body-parser');

//1 credenciales de produccion /CON ESTE USUARIO COMPRE CON EXITO
//2 usuario vendedor: TESTGMKWOHWP PASS qatest8870

//3 public key: APP_USR-4a88fdc9-be60-4052-b1ee-eaabf278af6a
//4 access_token: APP_USR-2976847302278535-042518-a5ebe55920cb1eaca5fa74cf8db52d46-749328966
//4 este es el que estoy usando

//5 client id: 2976847302278535


//6 credenciales de prueba

//7 usuario vendedor: TESTGMKWOHWP PASS qatest8870

//mail:test_user_13105638@testuser.com ???????? sera que es comprador???

//8 publick key: TEST-65f0dde4-acec-4aa6-97c6-c7fa2752dcbb
//9 access_token: TEST-2976847302278535-042518-8a1e9cafa1b8a3ee3bb71fc31b489e7c-749328966



//usuario comprador:TETE213113 PASS qatest9121 /////////////////////////con este vendi ok


//1 credenciales de produccion
//2 usuario comprador: TETE213113 PASS qatest9121

//3 public key: APP_USR-381267f8-75f0-4dc2-9162-a77f4028ebfa
//4 access_token: APP_USR-3167189856875471-042920-b4eea03a7fbccf0727b80454d8beaba0-749374809
//5 client id: 3167189856875471


//6 credenciales de prueba

//7 usuario comprador: TETE213113 PASS qatest9121
// mail:test_user_10592387@testuser.com
//8 publick key: TEST-c92add4e-4a0e-46ee-b2aa-ba16c98c2d5e
//9 access token: TEST-3167189856875471-042920-1be1bed7af79a46f85057c7b6a8d129d-749374809






mercadopago.configure({
    //original error 'Algo salió mal...Una de las partes con la que intentás hacer el pago es de prueba.'
    //access_token:'APP_USR-2976847302278535-042518-a5ebe55920cb1eaca5fa74cf8db52d46-749328966'
    access_token:'APP_USR-3167189856875471-042920-b4eea03a7fbccf0727b80454d8beaba0-749374809', //por ahora no dio error SE ACREDITO PAGO
    //access_token:'TEST-2976847302278535-042518-8a1e9cafa1b8a3ee3bb71fc31b489e7c-749328966'
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

//middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//app.use(express.urlencoded({extended: true}));
//app.use(express.json())


//routes


//app.get('/checkout',(req,res) =>{ //antes get por estar sin la preferencia
app.post('/checkout',(req,res) =>{
    //res.send('<h1> hola check</h1>');

  //preferencia
  let preference ={


    // ... "failure": "http://localhost/mp-node/",
    back_urls: {
        success: 'http://localhost/mp-node/indexSuccess.html',
        failure: 'http://localhost/mp-node/indexFailure.html',
        pending: 'http://localhost/mp-node/indexPending.html'
    },
    auto_return: 'approved',
    // ...

    payer: {
        phone: {
            area_code:'11',
            number: 22223333
        },
        
        address: {
            street_name: 'false',
            street_number: 123,
            zip_code: '1111',

        },
        
        email: 'test_user_13105638@testuser.com',
        identification: {},
        name: 'Lalo',
        surname: 'Landa',
        date_created: null,
        last_purchase: null
    },
    // ...
    notification_url: 'https://3af6166327d62795a3adfe94bec83f08.m.pipedream.net',

    // ...
    payment_methods: {
        excluded_payment_types:[
            {id:'amex'},
            {id:'atm'},
           
        ],
        default_installments: 6
    },
      
    // ...

    external_reference: 'koziuko@gmail.com',

    items:[
    {
        id:1234,
        picture_url: 'http://localhost/mp-node/assets/f3.png',
        description: 'Dipositivo móvil de Tienda e-commerce',
        title:req.body.title,
        unit_price:parseInt(req.body.price),
        quantity:1,

        // title:'mi producto',
        // unit_price:100,
        // quantity:1,
    }
    ]

};

mercadopago.preferences.create(preference)
    .then(function(response){
        console.log(response);
        ////res.send('checkout 22');
        res.redirect(response.body.init_point);

        ///res.redirect(response.body.sandbox_init_point);

        //global.id=response.body.id;
    }).catch(function(error){
        console.log(error);
    });




});

//server

app.listen(3001,()=>
{
    console.log("server 3001");
});
