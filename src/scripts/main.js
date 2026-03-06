
// Imports
import { createUiObject } from "/src/scripts/createUI.js";



// Elements declaration
const saveBtn = document.getElementById('save-btn'); 
const objContainer = document.getElementById('obj-container'); 



// Global Varibles
let allTabs = []



// Event listeners
saveBtn.addEventListener('click', async () => {
    /*
        Save Procedure:
        1º - Get the current tab the user is in
        2º - Save that tab in local storage in form of an array
        3º - create an object inside objContainer
    */

    const tab = await getCurrentTab();
    console.log(tab)
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
    */

    allTabs = JSON.parse(localStorage.getItem("tabs")) || [];
    allTabs.forEach(element => objContainer.innerHTML += createUiObject(element));
}



// Functions calls
renderObjects();




