import {Injectable, NotFoundException} from "@nestjs/common";
import {Product} from "./products.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ProductsService {
    products: Product[] = [];
    // LINK THE MODEL
    constructor(@InjectModel("Product") private readonly productModel: Model<Product>) {}

    // INSERT
    async insertProduct(title: string, desc: string, price: number) {  
        const newProduct = new this.productModel({title, description: desc, price});
        const result = await newProduct.save();
        console.log(result);
        return result._id as string;
    }

    // FETCH
    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map((prod) => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    // FETCH ALL PRODUCTS
    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return {id: product.id, title: product.title, description: product.description, price: product.price};
    }

    // UPDATE
    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if(title) updatedProduct.title = title;
        if(desc) updatedProduct.description = desc;
        if(price) updatedProduct.price = price;
        updatedProduct.save();
    }
    
    // DELETE
    async deleteProduct(productId: string) {
        const result = await this.productModel.deleteOne({_id: productId}).exec();
        if(result.n === 0)
            throw new NotFoundException("PRODUCT NOT FOUND!");
        else
            return true;
    }
    
    // SINGLE PRODUCT
    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch(error) {
            throw new NotFoundException("PRODUCT NOT FOUND!");
        }
        if(!product) {
            throw new NotFoundException("PRODUCT NOT FOUND!");
        }
        return product;
        // return {id: product.id, title: product.title, description: product.description, price: product.price};
    }
   
}

// BY USING ARRAYS

    // insertProduct(title: string, desc: string, price: number) {
    //     const prodId = Math.random().toString();   
    //     const newProduct = new Product(prodId, title, desc, price);
    //     this.products.push(newProduct);
    //     return prodId;
    // }

    // getProducts() {
    //     return [...this.products];
    // }

    // updateProduct(productId: string, title: string, desc: string, price: number) {
    //     const [product, index] = this.findProduct(productId);
    //     const updatedProduct = {...product};
    //     if(title) updatedProduct.title = title;
    //     if(desc) updatedProduct.description = desc;
    //     if(price) updatedProduct.price = price;
    //     this.products[index] = updatedProduct;
    // }

    // deleteProduct(productId: string) {
    //     const [product, index] = this.findProduct(productId);
    //     this.products.splice(index, 1);
    // }

     // private findProduct(id: string): [Product, number] {
    //     const productIndex = this.products.findIndex((prod) => prod.id === id);
    //     const product = this.products[productIndex];
    //     if(!product) {
    //         // throw new Error();
    //         throw new NotFoundException("PRODUCT NOT FOUND!");
    //     }
    //     return [product, productIndex];
    // }