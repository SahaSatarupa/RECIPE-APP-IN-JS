const searchbox = document.querySelector('.searchbox')
const searchbtn = document.querySelector('.searchbtn')
const container = document.querySelector('.container')
const ingredDetails = document.querySelector('.ingred_details')
const colsebtn = document.querySelector('.colsebtn')
const recipeDetails = document.querySelector('.recipe_details')



searchbtn.addEventListener('click',(e)=>{
    e.preventDefault()
    let input = searchbox.value.trim()
    if(!input){
        container.innerHTML = `<h3>Type the meal in the search box...</h3>`
        return;
    }
    fetchingdata(input)
})

const fetchingdata = async (input)=>{
    try {
        container.innerHTML = `<h3>Fetching Recipes....</h3>`
    let url = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}
    `)
    let response = await url.json()
    container.innerHTML = ''
    response.meals.forEach(meal =>{
        // console.log(meal);
        const recipediv = document.createElement('div')
        recipediv.classList.add('recipe')
        recipediv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const btn = document.createElement('button')
        btn.classList.add('viewRecipe')
        btn.textContent = 'View Recipe'
        recipediv.appendChild(btn)

        //adding eventlisitener to recipe btn 

        btn.addEventListener('click', () =>{
            openRecipePopUp(meal)
        })
        
        container.appendChild(recipediv)
    })

    } catch (error) {
        container.innerHTML = `
        <div class='errordiv'>
        <h3>Error in fetching recipes...</h3>
        </div>`
    }
}

//fetch ingredients
const fetchingredients = (meal)=>{
    // console.log(meal);
    let ingredent = ''
    for(i = 1; i<= 20; i++){
        const item = meal[`strIngredient${i}`]
        if(item){
            const measure = meal[`strMeasure${i}`]
            ingredent += ` 
            <li>${measure} ${item}</li>
            `
        }
        else{
            break;
        }
    }
    return ingredent;
}


const openRecipePopUp = (meal)=>{
    ingredDetails.innerHTML = `
         <h2>${meal.strMeal}</h2>
         <h3>Ingredients:</h3>
         <ul class="ingredentlist">${fetchingredients(meal)}</ul>
        <div class='processdetails'>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
        </div>    
    `
    ingredDetails.parentElement.style.display = "block"
}

colsebtn.addEventListener('click', ()=>{
    colsebtn.parentElement.style.display = 'none'
})