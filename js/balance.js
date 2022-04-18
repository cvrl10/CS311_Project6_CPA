"use strick";

//mapping class id to the output for the subtotal
const map = {"assets":"Total Current Assets:", 
                "liabilities":"Total Current Liabilities:",
                "investment":"Total Investment Property and Equipment:",
                "longTerm":"Total Long-Term Liabilities:",
                "intangibles":"Total Intangibles:"};

//map that contains the values for each subtotal
const totals = {"assets":0,
                "investment":0,
                "intangibles":0,
                "liabilities":0,
                "longTerm":0};


function display(classSelector)
{
    let array = document.querySelectorAll(classSelector);
    array.forEach(element =>{
        element.style.visibility = "visible";
    })

    //removing the dot from the string and concatenated it with btn to get a reference to the button element
    classSelector = classSelector.substring(1, classSelector.length)+"Btn";
    let button = document.getElementById(classSelector);
    button.style.display = "none";
}

function sum(id)
{
    let num = 0;
    let element = document.getElementById(id);
    let div = element.parentElement;
 
    let array = document.querySelectorAll("input");

    for (let i = 0; i < array.length; i++)
    {
        //getting a reference to the parent of the input element and seeing if this parent is a memeber of the class we are subtotaling  
        let parent = array[i].parentElement;
        if (parent.classList.contains(div.className))
            if (array[i].value !== undefined)
                num += parseFloat(array[i].value);
    }

    element = document.getElementById(div.className+"Total");
    element.style.textDecoration = "underline";
    element.style.fontWeight = "bold";
    element.textContent = map[div.className]+" $"+num.toFixed(2);
    totals[div.className] = num;

    //displaying the Calculate Position button once an input event occurs
    element = document.getElementById("calculate");
    element.style.display = "block";
}

function total()
{
    let totalAssests = totals["assets"] + totals["investment"] + totals["intangibles"];
    let totalLiabilities = totals["liabilities"] + totals["longTerm"];

    let assets = document.getElementById("totalAssets");
    assets.textContent = "Total Assets: $"+totalAssests.toFixed(2);

    let liabilities = document.getElementById("totalLiabilities");
    liabilities.textContent = "Total Liabilities: $"+totalLiabilities.toFixed(2);

    let position = document.getElementById("position");
    position.textContent = "Position: $"+(totalAssests-totalLiabilities).toFixed(2);
}