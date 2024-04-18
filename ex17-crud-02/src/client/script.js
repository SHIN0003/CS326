const counterNameInput = document.getElementById("counterName");
const createBtn = document.getElementById("createBtn");
const readBtn = document.getElementById("readBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");
const viewAllBtn = document.getElementById("viewAllBtn");
const counterResponse = document.getElementById("counters");

const URL = "http://localhost:3260"; // URL of our server

// TASK #4: Write event handler functions for each button
// Function to handle create counter action
async function createCounter() {
    const counterName = counterNameInput.value;
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }
    
    const response = await fetch(`${URL}/create`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: counterName }),
    });
    
    const data = await response.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    
    counterNameInput.value = "";
    alert("Counter created successfully");
    viewAll();
    
}

// TASK #4: Write event handler functions for each button
// Function to handle read counter action
async function readCounter() {
    const counterName = counterNameInput.value;
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }
    
    const response = await fetch(`${URL}/read/${counterName}`);
    const data = await response.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    
    counterResponse.innerHTML = `Counter: ${data.name} - Value: ${data.value}`;
    counterNameInput.value = "";

}

// TASK #4: Write event handler functions for each button
// Function to handle update counter action
async function updateCounter() {
    const counterName = counterNameInput.value;
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }
    
    const response = await fetch(`${URL}/update/${counterName}`, {
        method: "PUT",
    });
    
    const data = await response.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    
    counterNameInput.value = "";
    alert("Counter updated successfully");
    viewAll();
}

// TASK #4: Write event handler functions for each button
// Function to handle delete counter action
async function deleteCounter() {
    const counterName = counterNameInput.value;
    if (!counterName) {
        alert("Counter name is required!");
        return;
    }
    
    const response = await fetch(`${URL}/delete/${counterName}`, {
        method: "DELETE",
    });
    
    const data = await response.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    
    counterNameInput.value = "";
    alert("Counter deleted successfully");
    viewAll();
}

// TASK #4: Write event handler functions for each button
// Function to handle view all counters action
async function viewAll() {
    const response = await fetch(`${URL}/viewAll`);
    const data = await response.json();
    if (data.error) {
        alert(data.error);
        return;
    }
    
    counterResponse.innerHTML = "";
    data.forEach((counter) => {
        const counterDiv = document.createElement("div");
        counterDiv.innerHTML = `Counter: ${counter.name} - Value: ${counter.value}`;
        counterResponse.appendChild(counterDiv);
    });
}

// TASK #5: Add event listeners
createBtn.addEventListener("click", createCounter);
readBtn.addEventListener("click", readCounter);
updateBtn.addEventListener("click", updateCounter);
deleteBtn.addEventListener("click", deleteCounter);
viewAllBtn.addEventListener("click", viewAll);


// Load all counters in DB when page loads
viewAll();
