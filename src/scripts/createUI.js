/**
 * Build the saved-tab card markup for a given URL.
 */
export function createUiObject(tab){
    return `
            <div class="obj" data-url="${tab}">
                <div class="p-container">
                    <p>${tab}</p>
                </div>
                <button class="del-btn"></button>
            </div>
    `;
}