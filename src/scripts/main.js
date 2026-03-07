
// Imports
import { createUiObject } from "/src/scripts/createUI.js";



// Elements declaration
const saveBtn = document.getElementById('save-btn'); 
const objContainer = document.getElementById('obj-container'); 



// Global Varibles
let allTabs = []
let deleteBtns;



// Functions calls
renderObjects();



// Basic event listeners
saveBtn.addEventListener('click', async () => {
    /*
        Save Procedure:
        1º - Get the current tab the user is in
        2º - Save that tab in local storage in form of an array
        3º - Create an object inside objContainer
    */

    const tab = await getCurrentTab();
    allTabs.push(tab);
    localStorage.setItem("tabs", JSON.stringify(allTabs));
    objContainer.innerHTML += createUiObject(tab)
});



// Function declaration
async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // same as: const tabs = await chrome.tabs.query(...); const tab = tabs[0];
    return tab?.url;  // return if != null or undefined
}

function renderObjects() {
    
    /*
        Render objects procedure:
        1º - Get all the tabs from the local storage
        2º - Iterate over all tabs and create its UI object
        3º - Add the objects to the objContainer
        4º - Add delete properties with deleteProperties function call
    */

    allTabs = JSON.parse(localStorage.getItem("tabs")) || [];
    console.log(allTabs);
    allTabs.forEach(element => objContainer.innerHTML += createUiObject(element));
    deleteProperties();
}

function deleteProperties() {
    
    /*
        Delete Procedure:
        1º - Get all the delete buttons 
        2º - Get the tab that is being deleted
        3º - Delete tab tab from the local storage
        4º - Render objetcs again
    */
    
    deleteBtns = document.querySelectorAll('.del-btn'); 

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.parentElement.children[0].children[0]
            allTabs = allTabs.filter(item => item !== tab.textContent);
            localStorage.setItem("tabs", JSON.stringify(allTabs));
            objContainer.innerHTML = ''
            renderObjects();
        });
    });
}





