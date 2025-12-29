<div align="center">
 <h1>Front End Web Development</h1>
  
![](https://img.shields.io/github/last-commit/miniMinn24/Front-End-Web-Development?&style=for-the-badge&color=429ddb&logo=google-cloud&logoColor=D9E0EE&labelColor=141a29)
![](https://img.shields.io/github/repo-size/miniMinn24/Front-End-Web-Development?&logo=protondrive&style=for-the-badge&logoColor=D9E0EE&labelColor=1E202B&color=27638c)

</div>

# About
This repository is made to share my code files for my academic unit subject **Front End Web Development** by [**NCC L4DC**](https://www.nccedu.com/qualifications/diplomas/ncc-education-level-4-diploma-in-computing-l4dc/), to let my instructer freely view and mark my academic homeworks, exercises, and assignments.
### Types of training included
- Topic exercises
- Private study tasks
- Homeworks/projects
- Final assignment (Bean Boutique Coffee Shop)

Languages used - **HTML, CSS, and JavaScript**
Database - **CSV**

> [!NOTE]
> As this repo is meant for my academic college, no other code push requests will be accepted if you're interested in here for further developement. Unless, contact me if you want to work some projects with me ;)

<div align="center">

 
 <h1>FINAL ASSIGNMENT - Bean Boutique Coffee Shop</h1>
 <img src="/docs/Preview/beanboutique_preview.webp" alt="Bean Boutique Coffee Shop Website Preview (Home Page)">

 > Live view is avaliable here, on my repo: https://miniminn24.github.io/Front-End-Web-Development

</div>

<br>

## What Does It Do?
Without multiple `.html` files, I included all sections just in one single [index.html](/docs/index.html).
### Features
- **Light/Dark Toggler** - For your eye care and accessibility.
- **Search** - This searches thourgh both **Coffee** and **Brewing Equipments** with search suggestions. Clicking on search suggestion scrolls to the product. **No Results** message is display if it couldn't found any.
- **Card Drawer** - This stores all of your selected products after clicking on **"+ Add"** button. Total price is automatically calculated. Clicking on **"Checkout"** button displays **Order Successful** message in a modal.

### Home + About Page
- Visual user experience and a modal pop up for first time visitors.
- Functional **Search Box, Cart Drawer, Light/Dark Toggle and Responsive Navigation Menu.**

### Coffee Selection
- Products are listed using [coffee.csv](/docs/assets/database/coffee.csv) and [coffee_loader.js](/docs/assets/js/coffee_loader.js), where product card `divs` are dynamically loaded into coffee menu. The first **FOUR** coffee in coffee.csv are displayed (like featured products) by `coffee_loader.js`, and the rest goes into hidden that can be visible by clicking on **"SHOW MORE"** button.
- When click on any coffee card, it displays more details about **Tasting Notes and Brewing Methods** in a modal.
- Clicking on **"+ Add"** button adds coffee into **Card Drawer**.

### Brewing Equipment Selection
- The same way as Coffee Selection, Brewing equipments are also listed using [equipment.csv](/docs/assets/database/equipment.csv) and [equipment_loader.js](/docs/assets/js/equipment_loader.js). The rest goes into hidden that can be visible by clicking on **"SHOW MORE"** button.
- When click on any brewing equipment card, it displays more details about **Usage Tips** in a modal.
- Clicking on **"+ Add"** button adds equipment product into **Card Drawer**.

### Events and Workshops
- Event and Workshop cards are also loaded into the section using [events_and_workshops.csv](/docs/assets/database/events_and_workshops.cv) and [events_and_workshops_loader.js](/docs/assets/js/events_and_workshops_loader.js).
- Clicking on **"Register"** button displays a modal to sign up for the event/workshop registeration (first name, last name and email). Then, displays a **Registration Success** Message after registration.
- You can edit `events_and_workshops.csv` to add more or modify upcoming events.

### Community Blogs
- For this, I only made 3 static `div` to display blogs without using `.csv` database.
- Clicking on the link redirects to other social media platforms (not mine).

### Special Offers
- The same way, I use [special_offers.csv](/docs/assets/database/special_offers.csv) and [special_offers_loader.js](/docs/assets/js/special_offers_loader.js) to dynamically load them as `div` into `index.html`.
- If you want to show which **special offers** are the **Most Popular** and have **Discount Percentage**, you can simply edit them from `special_offers.csv`.
- Clicking on **"Subscribe"** button displays a modal to for **Purchase Form** (Cardholder name, Card number, MM/YY and CVV). Then, it displays a **Transaction Successful** message after paying.

### Contact
- This is for displaying contact details of **Bean Boutique Coffee Shop** with a interactive map beside it.
- Further service or other links can be displayed in the footer of `index.html`.

  <br>

> **HTML** and **CSS** files are checked by http://validator.w3.org.
<img src="/docs/Preview/validator_w3_checked.webp" alt="validated with Validator W3">
