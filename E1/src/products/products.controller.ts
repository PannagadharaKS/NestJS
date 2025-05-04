import {Controller, Get, Post, Patch, Delete, Body, Param, Render, Res} from "@nestjs/common";
import {ProductsService} from "./products.service";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // ADD
    @Get("add")
    @Render("crud/addProduct")
    renderFormPage() {
        return ;
    }

    @Post()
    async addProduct(@Body("title") prodTitle: string, @Body("description") prodDesc: string, @Body("price") prodPrice: number, @Res() res) {
        console.log(prodTitle);
        const generatedId = await this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return res.redirect("/products");
    }

    // FETCH
    @Get()
    @Render("crud/products")
    async getAllProducts() {
        const allProducts = await this.productsService.getProducts();
        return {products: allProducts};
    }

    // FETCH SINGLE ITEM
    @Get(":id")
    getProduct(@Param("id") prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    // UPDATE
    @Patch(":id")
    async updateProduct(@Param("id") prodId: string, @Body("title") prodTitle: string, @Body("description") prodDesc: string, @Body("price") prodPrice: number) {
        await this.productsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    // DELETE
    @Delete(":id")
    async removeProduct(@Param("id") prodId: string) {
       await this.productsService.deleteProduct(prodId);
       return null;
    }

}