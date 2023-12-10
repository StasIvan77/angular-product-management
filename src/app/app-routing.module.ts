import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { TagsListComponent } from "./tags-list/tags-list.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full'},
    { path: 'products', component: ProductsComponent },
    { path: 'tags-manage', component: TagsListComponent },
    { path: 'details/:productId', component: ProductDetailComponent }

]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}