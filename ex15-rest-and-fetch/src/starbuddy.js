// TASK #3: Fetch the Stars
async function getStars() {
  // Replace the line below with your implementation.
  let link = document.getElementById("repo").value
  link = link.split("/")
  let response = await fetch(`https://api.github.com/repos/${link[0]}/${link[1]}`)
  if (response.status !== 200) {
    document.getElementById("star_count").innerHTML = "an error has occurred"
    return
  }
  response.json().then(data =>  document.getElementById("star_count").innerHTML = data.stargazers_count)
}

// TASK #2: Add Event Listener
function initialize() {
  // Replace the line below with your implementation.
  document.getElementById("count_stars").addEventListener("click", () => {
    getStars()
  });
}

initialize();
