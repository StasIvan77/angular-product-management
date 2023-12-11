import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { TagsListComponent } from "./tags-list/tags-list.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { ProductEditComponent } from "./products/product-edit/product-edit.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full'},
    { path: 'products', component: ProductsComponent},
    { path: 'products/new', component: ProductEditComponent },
    { path: 'details/:productId', component: ProductDetailComponent },       
    { path: 'details/:productId/edit', component: ProductEditComponent },    
    { path: 'tags-manage', component: TagsListComponent },
    

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}