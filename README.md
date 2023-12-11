# Angular Product Management App

This Angular web application allows users to manage a list of products and associated tags. Users can view, create, update, and delete products and tags, as well as filter products based on tags.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:

bash
   git clone https://github.com/your-username/your-angular-app.git
Navigate to the project folder:

bash
Copy code
cd angular-product-management
Install dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
ng serve
Open your browser and go to http://localhost:4200/ to view the app.
For the version of CLI watch in the end.

## Features
Display a list of products with basic information.
Create, update, and delete products. (working on it...)
View product details and edit product information. (working on it...)
Manage tags with create, update, and delete functionality. (+)
Associate tags with products.(working on it...)
Filter products based on selected tags. (working on it...)


## Usage

Product List Page:
The home page displays a list of products.(+)
Click the "Create Product" button to add a new product.(working on it...)
Use the "Delete" button to remove a product from the list.(temporally not working)

Product Detail Page:
Click on a product in the list to view its details.(+)
Use the "Edit" button to update product information.(working on it...)
Click "Delete" to remove the selected product. (not working yet)


## Tag Management:
Navigate to the "Tags manage" page to manage tags.
But before you see it you need to login as user (for now) login[ivan12@test.com]password[12121212]
Aftentefication not working fully, some futures will improve in time
Create, edit, and delete tags. (+)
Associate tags with products during product creation or update.(only some part of this functionality)
Filter Products by Tags(not working yet)

On the product list page, select tags to filter products.
Click the "Clear Filter" button to reset the filter.
Folder Structure (not working yet)

The project trying to follow Angular project structure:


angular-product-app/
|-- src/
|   |-- app/
|       |-- components/
|       |   |-- products/
|       |       |--product-detail
        |       |--product-list
|       |   |-- header/
|       |   |-- tags-list/
|       |   |-- shared/
|       |   |-- auth/
|       |-- services/
|       |-- models/
|       |-- app-routing.module.ts
|       |-- app.module.ts
|-- ...

Technologies Used:
Angular CLI v16.2.6
Angular Material 16x
Node v18.17
TypeScript
HTML
CSS
ngx
Firebase

License
This project is licensed under the MIT License.
