"use strict";

let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName('budget-value') [0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value') [0],
    levelValue = document.getElementsByClassName('level-value') [0],
    expensesValue = document.getElementsByClassName('expenses-value') [0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value') [0],
    incomeValue = document.getElementsByClassName('income-value') [0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value') [0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value') [0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button') [0],
    optionalExpensesBtn = document.getElementsByTagName('button') [1],
    countBtn = document.getElementsByTagName('button') [2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');




let money, time;



startBtn.addEventListener('click', function() {
    time = prompt('Enter date in format YYYY MM DD', '');
    money = +prompt("Your monthly budget?", "");


    while (isNaN(money) || money == "" || money == null) {
        money = +prompt("Your monthly budget?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.addEventListener('click', function() {
    let sum = 0;

    for(let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
        
        if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
            && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expences[a] = b;
            sum += +b;
        } else {
            console.log("bad results");
            i--;     
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' '; 
    }
});

countBtn.addEventListener('click', function() {

    if (appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 500) {
            levelValue.textContent = "A minimum level of wealth";
        } else if (appData.moneyPerDay > 500 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "An average level of wealth";
        }else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "A high level of wealth";
        } else {
            levelValue.textContent = "Something went wrong..";
        }
    } else {
        dayBudgetValue.textContent = " Error! Pls enter monthly budget (click 'Start calculation') "
    }
});

incomeItem.addEventListener('input', function() {
    let items = incomeItem.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkSavings.addEventListener('click', function() {
    if (appData.saving == true) {
        appData.saving = false;
    } else {
        appData.saving = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.saving == true ){
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent; 
        appData.yearIncome = sum/100*percent;    
        
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function() {
    if (appData.saving == true ){
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = sum/100/12*percent; 
        appData.yearIncome = sum/100*percent;    
        
        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expences: {},
    optionalExpenses: {},
    income: [],
    saving:false,
};