const myForm= document.querySelector('#my-form');
const msg= document.querySelector('.msg');
const userList= document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);
function onSubmit(event) {
    event.preventDefault();
    
    const itemName= event.target.item.value;
    const itemDescription= event.target.details.value;
    const itemPrice= event.target.price.value;
    const itemQuantity= event.target.quantity.value;

    const obj= {itemName , itemDescription , itemPrice, itemQuantity};

    if(obj.itemName === '' || obj.itemDescription === '' || obj.itemPrice === '' || obj.itemQuantity === '') {
        msg.classList.add('error');
        msg.innerHTML= 'Fill up all the boxes'; 
        setTimeout(() => msg.remove(), 3000);
    } else {
        axios.post("https://crudcrud.com/api/48ddcc8a8b7c448eb0f842b59911a2ee/StoreInventory", obj)
            .then((response)=> {
                showProductsOnScreen(response.data);
                console.log(response.data);
        })
            .catch((err) => {
                console.log(err);
        })
        
        event.target.item.value = '';
        event.target.details.value = '';
        event.target.price.value = '';
        event.target.quantity.value = '';

    }    
}

function showProductsOnScreen(obj) {
    const li= document.createElement('li');
    var buy1Btn = document.createElement('button');
    buy1Btn.className= 'btn1';
    buy1Btn.appendChild(document.createTextNode('Buy 1'));

    buy1Btn.addEventListener('click', () => {
        axios.delete(`https://crudcrud.com/api/48ddcc8a8b7c448eb0f842b59911a2ee/StoreInventory/${obj._id}`)
            .then((response) => {
                localStorage.removeItem(obj);
                userList.removeChild(li);
                document.getElementById('item').value=obj.itemNamename;
                document.getElementById('details').value=obj.itemDescription;
                document.getElementById('price').value=obj.itemPrice;
                document.getElementById('quantity').value=obj.itemQuantity;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        
    })
    
    var buy2Btn = document.createElement('button');
    buy2Btn.className= 'btn2';
    buy2Btn.appendChild(document.createTextNode('Buy 2'));

    buy2Btn.addEventListener('click', () => {
        axios.delete(`https://crudcrud.com/api/48ddcc8a8b7c448eb0f842b59911a2ee/StoreInventory/${obj._id}`)
            .then((response) => {
                localStorage.removeItem(obj);
                userList.removeChild(li);
                document.getElementById('item').value=obj.itemName;
                document.getElementById('details').value=obj.itemDescription;
                document.getElementById('price').value=obj.itemPrice;
                document.getElementById('quantity').value=obj.itemQuantity;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        
    })

    var buy5Btn = document.createElement('button');
    buy5Btn.className= 'btn5';
    buy5Btn.appendChild(document.createTextNode('Buy 5'));

    buy5Btn.addEventListener('click', () => {
        axios.delete(`https://crudcrud.com/api/48ddcc8a8b7c448eb0f842b59911a2ee/StoreInventory/${obj._id}`)
            .then((response) => {
                localStorage.removeItem(obj);
                userList.removeChild(li);
                document.getElementById('item').value=obj.itemName;
                document.getElementById('details').value=obj.itemDescription;
                document.getElementById('price').value=obj.itemPrice;
                document.getElementById('quantity').value=obj.itemQuantity;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        
    })

    li.appendChild(document.createTextNode(`Product Details: ${obj.itemName} , ${obj.itemDescription} , ${obj.itemPrice} , ${obj.itemQuantity}`));
    li.appendChild(buy1Btn);
    li.appendChild(buy2Btn);
    li.appendChild(buy5Btn);
    userList.appendChild(li);

    // localStorage.setItem(obj.itemName, JSON.stringify(obj));
    // console.log(JSON.parse(localStorage.getItem(obj.itemName)));
}

window.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/48ddcc8a8b7c448eb0f842b59911a2ee/StoreInventory")
        .then((response) => {
            console.log(response);
            for(var i=0; i<response.data.length; i++){
                showProductsOnScreen(response.data[i]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
})