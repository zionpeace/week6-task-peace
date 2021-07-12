const express = require ('express');
const app = express();

let product = require('./model/product.js')

const PORT = process.env.PORT || 3000;

 app.use(express.json());
 app.use(express.urlencoded({extended: true}));
 //base router for our app, to display all the products
//for app to read
console.log(product)
 app.get('/', (req, res) =>{
    res.send('Checkout our product on http://127.0.0.1:3000/product')
 })
 app.get('/product', (req, res) =>{
    res.json(product)
 })
 //route to get a specific product
 app.get('/product/:id', (req, res) =>{
     let productId = Number(req.params.id);
     let getProduct = product.find((product) => product.id === productId);

     if(!getProduct){
         res.status(404).send(`cannot find product wit id of ${productId}`);
     }else{
         res.json(getProduct);
     }
 })
//post operation
app.post('/product', (req, res) =>{
    //create a product
    let newProduct = {
        id: product.length + 1,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
    }

        //add ton our product array and display product
        product.push(newProduct);
        res.json(product)
})
 //lets update a product using 'put' method
 app.put('/product/:id', (req, res) =>{
     let productId = Number(req.params.id);
     let body = req.body;
     let productToUpdate = product.find((product) => product.id === productId);
     let indexOfProduct = product.indexOf(product);
     if(!productToUpdate){
         res.status(404).send(`product with id of ${product} not found`)
}else{
    let updateProduct = {...productToUpdate, ...body};
    product[indexOfProduct] = updateProduct;
    res.json(updateProduct)
}
 })
//delete a product
app.delete('/product/:id',(req,res) =>{
    let productId = Number(req.params.id);
    let deleteProduct = product.filter((product) => product.id !==productId);
    if(!deleteProduct){
        res.status(404).send(`product with id of ${productId} not found`);
    }else{
        product = deleteProduct;
        res.json(product);
    }
})
app.listen(PORT, ()=>{
    console.log(`server starting on port http://127.0.0.1:${PORT}`)
})