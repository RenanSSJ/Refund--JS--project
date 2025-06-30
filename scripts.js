//Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//select list elements
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

//Capture event and adjust value
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, "")

  //convert value to cents
  value = Number(value) / 100

  //update value
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
//adjust value to BRL (Brazilian Real currency)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
  return value
}

//prevent page from reloading
form.onsubmit = (event) => {
 event.preventDefault()

 //create new object with expense details
  const newExpense = {
    id: new Date() .getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    create_at: new Date(),
  }
  //Call function to add item to the List
  expenseAdd(newExpense)
}

//add item to the list
function expenseAdd(newExpense) {
  try {
    //create element li to add item to the list (ul)
    const expenseItem = document.createElement("li")
    //add class to the li
    expenseItem.classList.add("expense")

    //add the category icon
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //add info to expense
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //add name to expense
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //Add expense category
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name
 
    //add name and category to expense info
    expenseInfo.append(expenseName, expenseCategory)

    //add expense amount
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remove item")

    //add information to item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //add item to the list  
    expenseList.append(expenseItem)

    //update totals
    updateTotals()

    //clear form
    clearForm()

  } catch (error) {
    alert("Erro: Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

//update total amount and items in the List
function updateTotals() {
  try {
    //number of itens (li) from (ul)
    const items = expenseList.children
    
    //update quantity
    expensesQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`

    let total = 0

    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      //remove non-numeric characters and replace , for .
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".")

      value = parseFloat(value)

      //verify if valid number
      if(isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parece ser um número.")
      }

      //increment total value
      total += Number(value)
    }

   //correct R$ symbol from total
   const symbolBRL = document.createElement("small")
   symbolBRL.textContent = "R$"
  
   //remove and reformat R$ 
   total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

   //clean content from element
   expensesTotal.innerHTML = ""

   //add symbol and total amount
   expensesTotal.append(symbolBRL, total)


  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar o total.")
  }
}

//remove item from list
expenseList.addEventListener("click", function (event) {
  if(event.target.classList.contains("remove-icon")){
    //capture parent li from clicked element
    const item = event.target.closest(".expense")
    item.remove()
  }

  updateTotals()
})

function clearForm(){
  expense.value = ""
  category.value = ""
  amount.value = ""
}