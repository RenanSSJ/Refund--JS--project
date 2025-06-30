//Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//select list elements
const expenseList = document.querySelector("ul")

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

    //add information to item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount)

    //add item to the list  
    expenseList.append(expenseItem)

  } catch (error) {
    alert("Erro: Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}