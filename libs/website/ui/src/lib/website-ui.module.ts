import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BottomContactBarComponent } from './bottom-contact-bar/bottom-contact-bar.component';
import { BottomNavBarComponent } from './bottom-nav-bar/bottom-nav-bar.component';
import { BottomNavBarButtonComponent } from './bottom-nav-bar-button/bottom-nav-bar-button.component';
import { BottomSocialMediaBarComponent } from './bottom-social-media-bar/bottom-social-media-bar.component';
import { BottomSocialMediaBarButtonComponent } from './bottom-social-media-bar-button/bottom-social-media-bar-button.component';
import { ButtonComponent } from './button/button.component';
import { DividerComponent } from './divider/divider.component';
import { HeaderComponent } from './header/header.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavBarButtonComponent } from './nav-bar-button/nav-bar-button.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ThemeToggleButtonComponent } from './theme-toggle-button/theme-toggle-button.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { TitleBarBackButtonComponent } from './title-bar-back-button/title-bar-back-button.component';
import { TitleBarKabobMenuComponent } from './title-bar-kabob-menu/title-bar-kabob-menu.component';
import { TitleBarKabobMenuItemComponent } from './title-bar-kabob-menu-item/title-bar-kabob-menu-item.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    BottomContactBarComponent,
    BottomNavBarComponent,
    BottomNavBarButtonComponent,
    BottomSocialMediaBarComponent,
    BottomSocialMediaBarButtonComponent,
    ButtonComponent,
    DividerComponent,
    HeaderComponent,
    NavBarComponent,
    NavBarButtonComponent,
    ProductComponent,
    ProductsComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesComponent,
    ShoppingEditComponent,
    ShoppingListComponent,
    TaskComponent,
    TaskListComponent,
    ThemeToggleButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TitleBarKabobMenuComponent,
    TitleBarKabobMenuItemComponent,
  ],
  exports: [
    BottomContactBarComponent,
    BottomNavBarComponent,
    BottomNavBarButtonComponent,
    BottomSocialMediaBarComponent,
    BottomSocialMediaBarButtonComponent,
    ButtonComponent,
    DividerComponent,
    HeaderComponent,
    NavBarComponent,
    NavBarButtonComponent,
    ProductComponent,
    ProductsComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    RecipesComponent,
    ShoppingEditComponent,
    ShoppingListComponent,
    TaskComponent,
    TaskListComponent,
    ThemeToggleButtonComponent,
    TitleBarComponent,
    TitleBarBackButtonComponent,
    TitleBarKabobMenuComponent,
    TitleBarKabobMenuItemComponent,
  ],
})
export class WebsiteUiModule {}
