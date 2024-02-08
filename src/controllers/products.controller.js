const productDaoMongo = require('../daos/productManagerMongo')

class ProductController{
    constructor(){
        this.productService = new productDaoMongo()
    }
    getProducts = async(req,res)=>{ 
        const result = await this.productService.getProduct();
        res.json({result})
    }
    getProductByFilter = async(req,res)=>{
        const { name } = req.params;
        const productFound = await this.productService.getProductByFilter(name);
        res.json({productFound})
    }
    createProduct = async(req,res)=> {
        const newProduct = await this.productService.createProduct(req.body);
        res.json({newProduct})
    }
    updateProduct = async(req,res)=>{
        const productId = req.params.pid;
        const updatedProduct = await this.productService.updateProduct(productId, req.body);
        res.json({updatedProduct})
    }
    deleteProduct = async(req,res)=>{
        const productId = req.params.pid;
        const deletedProduct = await this.productService.deleteProduct(productId);
        res.json({deletedProduct})
    }
}
