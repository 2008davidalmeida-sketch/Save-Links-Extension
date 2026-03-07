
// Imports
import { createUiObject } from "/src/scripts/createUI.js";



// Elements declaration
const saveBtn = document.getElementById('save-btn'); 
const objContainer = document.getElementById('obj-container'); 



// Global Variables
let allTabs = []



// Functions Calls
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
    objContainer.innerHTML = ''
    renderObjects();
});



// Function declaration
async function getCurrentTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true }); // same as: const tabs = await chrome.tabs.query(...); const tab = tabs[0];
    return tab?.url;  // returns the URL if defined
}

function renderObjects() {
    
    /*
        Render objects procedure:
        1º - Get all the tabs from the local storage
        2º - Iterate over all tabs and create its UI object
        3º - Add the objects to the objContainer
        4º - Add the after render properties 
    */

    allTabs = JSON.parse(localStorage.getItem("tabs")) || [];
    allTabs.forEach(element => objContainer.innerHTML += createUiObject(element));

    // After render properties
    deleteProperties();
    hyperLinkProperties();
}

function deleteProperties() {
    
    /*
        Delete Procedure:
        1º - Get all the delete buttons 
        2º - Get the tab that is being deleted
        3º - Delete tab tab from the local storage
        4º - Render objects again
    */
    
    const deleteBtns = document.querySelectorAll('.del-btn'); 

    deleteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const objElement = btn.closest('.obj');
            
            if (!objElement) return;   // Guard: skip if objElement child doesn't exist
            
            const tab = objElement.dataset.url;
            const index = allTabs.indexOf(tab);
            
            if (index !== -1) {
                allTabs.splice(index, 1);
            }            
           
            allTabs = allTabs.filter(item => item !== tab);
            localStorage.setItem("tabs", JSON.stringify(allTabs));
            objContainer.innerHTML = ''
            renderObjects();
        });
    });
}

function hyperLinkProperties() {
    
    const objs = document.querySelectorAll('.obj');  

    objs.forEach(obj => {
        const pContainer = obj.children[0]; // obj -> pContainer
        if (!pContainer) return; // Guard: skip if p-container child doesn't exist

        pContainer.addEventListener('click', () => {   // Add the event lister to the child of the object: obj -> p-container
            const link = obj.dataset.url;
            if (!link) {
                return; // Guard: no-op if URL is missing or invalid
            }
            chrome.tabs.create({ url: link });
        });
    });
}


