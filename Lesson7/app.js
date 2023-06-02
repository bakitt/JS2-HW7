const postsContainerEl = document.getElementById("posts-container");
const loaderEl = document.getElementById("loader");
const filterEl = document.getElementById("filter")

let limit = 10
let page =1
let loaderIndicator = false
let dataFromBack = []




console.log(postsContainerEl, loaderEl, filterEl);

const renderItem = (post) => {
    const { id, title, body } = post;
    return `
    <div class= "post">
    <div class="number">${id}</div>
    <div class="post_info">
    <h2>${title}</h2>
    <p class="post_body">${body}</p>
    </div>
    </div>
    `;
}

const renderAllItems = (data) => {
    let template = "";
    for (let key in data) {
        template += renderItem(data[key])
    }
    return template;
}


const getData = async () => {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        page += 1;
        
        const data = await response.json();
        dataFromBack = [...dataFromBack, ...data]

        return data;
    } catch (err) {
        console.log(err);
    }
}

const showPosts = async () => {
    loaderEl.classList.add("show");
    loaderIndicator =true

    const data = await getData();
    postsContainerEl.innerHTML += renderAllItems(data)


    loaderEl.classList.remove("show");
    loaderIndicator=false

}
const onWindowScroll = ()=>{
    if(loaderIndicator) return

    const {scrollHeight, scrollTop, clientHeight} = document.documentElement

    if (scrollTop + clientHeight + 5 >= scrollHeight) {
        showPosts();
        console.log("first");
    }
}
const onSearch = (event) => {
    const term = event.target.value.toLowerCase();
    const filteredPosts = dataFromBack.filter(
      (el) =>
        el.title.includes(term) || el.body.includes(term) || el.id.toString().includes(term)
    );
    postsContainerEl.innerHTML = renderAllItems(filteredPosts);
  };
  


showPosts()

window.addEventListener("scroll", onWindowScroll)
filterEl.addEventListener("input", onSearch)













