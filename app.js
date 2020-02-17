const data = [{
        'company': 'Alfreds Futterkiste',
        'contact': 'Maria Anders',
        'country': 'India'
    },
    {
        'company': 'Centro comercial Moctezuma',
        'contact': 'Francisco Chang',
        'country': 'Mexico'
    },
    {
        'company': 'Ernst Handel',
        'contact': 'Roland Mendel',
        'country': 'Austria'
    },
    {
        'company': 'Island Trading',
        'contact': 'Helen Bennett',
        'country': 'UK'
    },
    {
        'company': 'Laughing Bacchus Winecellars',
        'contact': 'Yoshi Tannamuri',
        'country': 'Canada'
    },
    {
        'company': 'Magazzini Alimentari Riuniti',
        'contact': 'Giovanni Rovelli',
        'country': 'Italy'
    },
    {
        'company': 'Alfreds Futterkiste',
        'contact': 'Maria Anders',
        'country': 'India'
    }
]
let order = 'asc';
let limitPerPage = 5;
let pageIndex = 0;

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string') ?
            a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string') ?
            b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function resetFilterValue() {
    limitPerPage = document.getElementById('limitPerPage').value;
    order = document.getElementById('order').value;
    pagination(0, limitPerPage);
}

function sort(sortBy) {
    pageIndex = 0;
    data.sort(compareValues(sortBy, order));
    pagination(0, limitPerPage);
}

function next() {
    pageIndex += 1;
    pagination(pageIndex, limitPerPage);
}

function prev() {
    pageIndex -= 1;
    pagination(pageIndex, limitPerPage);

}

function pagination(pageIndex, limitPerPage) {
    const leftBound = parseInt(pageIndex) * parseInt(limitPerPage);
    const rightBound = parseInt(leftBound) + parseInt(limitPerPage);
    const paginatedData = data.slice(leftBound, rightBound)
    document.getElementById('table').innerHTML = createRows(paginatedData);
}

function onIt() {
    window.addEventListener('load', function () {
        pagination(pageIndex, limitPerPage);
    });
}

function createRows(data) {
    let table = `<tr>
          <th onclick="sort('company')">Company</th>
          <th onclick="sort('contact')">Contact</th>
          <th onclick="sort('country')">Country</th>
        </tr>`
    for (let i = 0; i < data.length; i++) {
        table += `<tr>
            <td onclick="sort('company')">${data[i].company}</td>
            <td onclick="sort('contact')">${data[i].contact}</td>
            <td onclick="sort('country')">${data[i].country}</td>
        </tr>`
    }

    return table;
}

onIt();