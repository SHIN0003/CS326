const counterNameInput = document.getElementById("counterName");
const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const viewAllBtn = document.getElementById("viewAllBtn");
const counterResponse = document.getElementById("counters");

const URL = "http://localhost:3260"; // URL of our server

// Function to handle create counter action
// Function to handle create counter action
async function createCounter() {
    const counterName = counterNameInput.value.trim();
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }

    try {
        // Adjusted to send counter name in the query string
        const response = await fetch(`${URL}/create?name=${encodeURIComponent(counterName)}`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Server responded with status: " + response.status);
        }

        // Expecting HTML content back, not JSON
        const htmlContent = await response.text(); 
        counterResponse.innerHTML = htmlContent; // Insert the HTML content into the `counters` div
        counterNameInput.value = ""; // Clear the input field
    } catch (error) {
        alert("Failed to create counter: " + error.message);
    }
}



// Function to handle read counter action
// Function to handle read counter action
async function readCounter() {
    const counterName = counterNameInput.value.trim();
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }

    try {
        const response = await fetch(`${URL}/read?name=${encodeURIComponent(counterName)}`);

        if (!response.ok) {
            // Server should return a specific status code or message for non-existent counter
            throw new Error(`Failed to read counter: ${response.statusText}`);
        }

        const htmlContent = await response.text();
        counterResponse.innerHTML = htmlContent;
    } catch (error) {
        alert(error.message);
    }

    counterNameInput.value = "";
}



// Function to handle update counter action
// Function to handle update counter action
async function updateCounter() {
    const counterName = counterNameInput.value.trim();
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }

    try {
        // Assuming 'update' endpoint and method PUT
        const response = await fetch(`${URL}/update?name=${encodeURIComponent(counterName)}`, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Server responded with status: " + response.status);
        }

        const htmlContent = await response.text(); 
        counterResponse.innerHTML = htmlContent; // Update the display with the new counter data
    } catch (error) {
        alert("Failed to update counter: " + error.message);
    }

    counterNameInput.value = "";
}


// Function to handle delete counter action
// Function to handle delete counter action
async function deleteCounter() {
    const counterName = counterNameInput.value.trim();
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }

    try {
        // Assuming 'delete' endpoint and method DELETE
        const response = await fetch(`${URL}/delete?name=${encodeURIComponent(counterName)}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Server responded with status: " + response.status);
        }

        const htmlContent = await response.text(); 
        counterResponse.innerHTML = htmlContent; // Update the display to show the counter has been deleted
    } catch (error) {
        alert("Failed to delete counter: " + error.message);
    }

    counterNameInput.value = "";
}

// Function to handle view all counters action
async function viewAll() {
    try {
        const response = await fetch(`${URL}/all`);
        const text = await response.text();  // Use .text() for HTML content
        if (response.ok) {
            counterResponse.innerHTML = text;
        } else {
            throw new Error('Failed to load counters');
        }
    } catch (error) {
        alert(error.message);
    }
}

// Add event listeners
createBtn.addEventListener("click", createCounter);
readBtn.addEventListener("click", readCounter);
updateBtn.addEventListener("click", updateCounter);
deleteBtn.addEventListener("click", deleteCounter);
viewAllBtn.addEventListener("click", viewAll);

// Load all counters in DB when page loads
viewAll();
