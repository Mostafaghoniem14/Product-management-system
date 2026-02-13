var pname = document.getElementById("pname");
var pprice = document.getElementById("pprice");
var pcount = document.getElementById("pcount");
var pcategory = document.getElementById("pcategory");
var pdesc = document.getElementById("pdesc");
var tbody = document.getElementById("tbody");
var btn = document.getElementById("btn");
var inputs = document.getElementsByClassName("form-control");
var search = document.getElementById("search");
var searchbycat = document.getElementById("searchbycategory");
var alertname = document.getElementById("alert");
var labelcount = document.getElementById("labelcount");
var btndeleteall = document.getElementById("btndeleteall");
var products = [];
var CurrentIndex;
btn.onclick = function () {
  if (btn.innerHTML == "Add Product") {
    addproduct();
  } else {
    UpdateProduct();
  }
  displayproducts();
  clear();
};

if (JSON.parse(localStorage.getItem("productlist")) != null) {
  products = JSON.parse(localStorage.getItem("productlist"));
  displayproducts();
}

function addproduct() {
  var product = {
    name: pname.value,
    price: pprice.value,
    count: pcount.value,
    category: pcategory.value,
    desc: pdesc.value,
  };
  if (
    pname.value != "" &&
    pprice.value != "" &&
    pcategory.value != "" &&
    pdesc.value != ""
  ) {
    if (product.count > 1) {
      for (let i = 0; i < product.count; i++) {
        products.push(product);
      }
    } else {
      products.push(product);
    }
  }
  localStorage.setItem("productlist", JSON.stringify(products));
}

function displayproducts() {
  var box = "";
  for (var i = 0; i < products.length; i++) {
    box += `<tr>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].desc}</td>
        <td class="samehover"><button class=" btn btn-warning" onclick="getProductInfo(${i})">Update</button></td>
        <td class="samehover"><button class=" btn btn-danger" onclick="deleteproduct(${i})">Delete</button></td>
        </tr>`;
  }
  tbody.innerHTML = box;
  if (products.length > 0) {
    btndeleteall.innerHTML = `<button class="samehover deleteall" onclick = "DeleteAll()">Delete All Products(${products.length})</button>`;
  } else {
    btndeleteall.innerHTML = "";
  }
}

function clear() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteproduct(index) {
  products.splice(index, 1);
  displayproducts();
  localStorage.setItem("productlist", JSON.stringify(products));
}

search.onkeyup = function () {
  var box = "";
  for (var i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(search.value.toLowerCase())) {
      box += `<tr>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].desc}</td>
        <td class="samehover"><button class="btn btn-warning" onclick="getProductInfo(${i})">Update</button></td>
        <td class="samehover"><button class="btn btn-danger" onclick="deleteproduct(${i})">Delete</button></td>
        </tr>`;
    }
  }
  tbody.innerHTML = box;
};

searchbycat.onkeyup = function () {
  var box = "";
  for (var i = 0; i < products.length; i++) {
    if (
      products[i].category
        .toLowerCase()
        .includes(searchbycat.value.toLowerCase())
    ) {
      box += `<tr>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].desc}</td>
        <td class="samehover"><button class=" btn btn-warning" onclick="getProductInfo(${i})">Update</button></td>
        <td class="samehover"><button class=" btn btn-danger" onclick="deleteproduct(${i})">Delete</button></td>
        </tr>`;
    }
  }
  tbody.innerHTML = box;
};

function getProductInfo(index) {
  CurrentIndex = index;
  var CurrentProduct = products[index];
  pname.value = CurrentProduct.name;
  pprice.value = CurrentProduct.price;
  pcategory.value = CurrentProduct.category;
  pdesc.value = CurrentProduct.desc;
  pcount.style.display = "none";
  labelcount.style.display = "none";
  btn.innerHTML = "Update";
  window.scroll({ top: 0, behavior: "smooth" });
}

function UpdateProduct() {
  var product = {
    name: pname.value,
    price: pprice.value,
    count: pcount.value,
    category: pcategory.value,
    desc: pdesc.value,
  };
  products[CurrentIndex] = product;
  localStorage.setItem("productlist", JSON.stringify(products));
  btn.innerHTML = "Add Product";
}

pname.onkeyup = function () {
  var rejexName = /^[A-Z][a-z 0-9]{3,20}$/;
  if (rejexName.test(pname.value)) {
    btn.removeAttribute("disabled");
    pname.classList.add("is-valid");
    pname.classList.remove("is-invalid");
    alertname.classList.add("d-none");
    alertname.classList.remove("d-block");
  } else {
    btn.setAttribute("disabled", true);
    pname.classList.add("is-invalid");
    pname.classList.remove("is-valid");
    alertname.classList.remove("d-none");
    alertname.classList.add("d-block");
  }
};

pprice.onkeyup = function () {
  var rejexPrice = /[1-9][0-9]{0,}/;
  if (rejexPrice.test(pprice.value)) {
    btn.removeAttribute("disabled");
    pprice.classList.add("is-valid");
    pprice.classList.remove("is-invalid");
  } else {
    btn.setAttribute("disabled", true);
    pprice.classList.add("is-invalid");
    pprice.classList.remove("is-valid");
  }
};

pcount.onkeyup = function () {
  var rejexCount = /[0-9]/;
  if (rejexCount.test(pcount.value)) {
    btn.removeAttribute("disabled");
    pcount.classList.add("is-valid");
    pcount.classList.remove("is-invalid");
  } else {
    btn.setAttribute("disabled", true);
    pcount.classList.add("is-invalid");
    pcount.classList.remove("is-valid");
  }
};

pcategory.onkeyup = function () {
  var rejexCategory = /^[A-Z][a-z]/;
  if (rejexCategory.test(pcategory.value)) {
    btn.removeAttribute("disabled");
    pcategory.classList.add("is-valid");
    pcategory.classList.remove("is-invalid");
  } else {
    btn.setAttribute("disabled", true);
    pcategory.classList.add("is-invalid");
    pcategory.classList.remove("is-valid");
  }
};

pdesc.onkeyup = function () {
  var rejexDesc = /^[A-Z][a-z]/;
  if (rejexDesc.test(pdesc.value)) {
    btn.removeAttribute("disabled");
    pdesc.classList.add("is-valid");
    pdesc.classList.remove("is-invalid");
  } else {
    btn.setAttribute("disabled", true);
    pdesc.classList.add("is-invalid");
    pdesc.classList.remove("is-valid");
  }
};

function DeleteAll() {
  localStorage.clear();
  products.splice(0);
  displayproducts();
}
