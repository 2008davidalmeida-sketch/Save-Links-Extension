
// Create object
export function createUiObject(tab){
    return `
        <div class="obj">
            <div class="p-container" id="${tab}"><p>${tab}</p></div>
           <button class="del-btn"></button>
        </div>  
    `
}