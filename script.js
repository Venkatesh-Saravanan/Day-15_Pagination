const pageData = new XMLHttpRequest();
pageData.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
pageData.send();

let request = function () {

    const data = JSON.parse(this.responseText);

    let root = document.getElementById("root");
    let section = document.createElement("section")
    section.setAttribute("class", "header");

    let heading = `<h1>Pagination in DOM Manipulation</h1>`
    section.innerHTML = heading;
    let sectionTwo = document.createElement("section");
    sectionTwo.setAttribute("class", "field");
    let table = document.createElement("table");
    table.setAttribute("class", "table-content");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    let sectionThree = document.createElement("section");
    sectionThree.setAttribute("class", "bottom");

    let headtags = "<tr>";
    let keys = Object.keys(data[0]);
    for (let i = 0; i < keys.length; i++) {
        headtags += `<th>${keys[i]}</th>`
    }
    headtags += "</tr>"
    thead.innerHTML = headtags;
    table.append(thead);

    console.log(data);
    let page_number = 1;
    let limit = 10;
    const pageCount = Math.ceil(data.length / limit);

    let display = ((page) => {
        let tags = '';
        page--;

        let start = limit * page;
        let end = start + limit;
        let paginatedItems = data.slice(start, end);

        paginatedItems.map(e => {

            tags += `<tr>
              <td>${e.id}</td>
              <td>${e.name}</td>
              <td>${e.email}</td>
              </tr>`
        });
        tbody.innerHTML = tags;
        table.appendChild(tbody);
        sectionTwo.append(table);
    });
    let setPagination = (() => {
        for (let i = 1; i <= pageCount; i++) {
            let pageli = paginationli(i);

            let ul = document.getElementById("pagination");
            ul.append(pageli);

        }
    })

    function paginationli(page) {

        let list = document.createElement("li");
        list.setAttribute("class", "btn");
        list.setAttribute("id", `btn-${page}`)
        list.innerText = page;

        if (page_number == page) list.classList.add('active');

        list.addEventListener('click', function () {
            page_number = page;
            display(page_number);

            let current_li = document.querySelector('#pagination li.active');
            current_li.classList.remove('active');

            list.classList.add('active');
        });
        return list;

    }

    function lastclick() {
        page_number = 10;

        let current_li = document.querySelector('#pagination li.active');
        current_li.classList.remove('active');
        li[9].classList.add('active');

        for (let i = 0; i < li.length; i++) {
            li[i].style.display = "none";
        }

        for (let i = pageCount / 2; i < li.length; i++) {
            li[i].style.display = "block";
        }
        display(page_number);
    }

    function firstclick() {

        page_number = 1;
        let current_li = document.querySelector('#pagination li.active');
        current_li.classList.remove('active');
        li[0].classList.add('active');

        for (let i = 0; i < pageCount / 2; i++) {
            li[i].style.display = "block";
        }

        for (let i = pageCount / 2; i < li.length; i++) {
            li[i].style.display = "none";
        }
        display(page_number);
    }

    function previousclick() {

        let pages = pageCount;

        if (page_number > 1) {
            page_number -= 1;
            let current_li = document.querySelector('#pagination li.active');
            current_li.classList.remove('active');
            li[page_number - 1].classList.add('active');

            if (page_number <= pages) {
                let prev_li = document.getElementById(`btn-${page_number}`);
                prev_li.style.display = "block";
                prev_li.classList.add('active');
            }
            display(page_number);
        }
    }


    function nextclick() {

        if (page_number < li.length) {
            page_number += 1;
            let current_li = document.querySelector('#pagination li.active');
            current_li.classList.remove('active');
            li[page_number - 1].classList.add('active');

            if (page_number > pageCount) {
                let next_li = document.getElementById(`btn-${page_number}`);
                next_li.style.display = "block";
            }
            display(page_number);
        }

    }


    let pagination = `<div id="pagination"></div>`;

    sectionThree.innerHTML += pagination;
    root.append(section, sectionTwo, sectionThree);
    let li = document.getElementById("pagination").getElementsByTagName("li");
    display(page_number);
    setPagination();

};

pageData.addEventListener("load", request);
