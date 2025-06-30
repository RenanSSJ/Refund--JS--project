//Select form elements
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

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
  } catch (error) {
    alert("Erro: Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}