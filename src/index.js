
function groupBy(array, grouper, filter) {

    const filteredArray = filter ? array.filter(filter) : array;

    const getKey = (item, currentGrouper) => {
        if (typeof currentGrouper === 'function') {
            return currentGrouper(item);
        }
        return item[currentGrouper] !== undefined ? item[currentGrouper] : 'undefined';
    };

    const groupItems = (items, criteria) => {
        if (criteria.length === 0) return items;
        const [currentGrouper, ...remainingCriteria] = criteria;
        const grouped = items.reduce((acc, item) => {
            const key = getKey(item, currentGrouper);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});

        for (const key in grouped) {
            grouped[key] = groupItems(grouped[key], remainingCriteria);
        }

        return grouped;
    };
    const criteriaArray = Array.isArray(grouper) ? grouper : [grouper];

    return groupItems(filteredArray, criteriaArray);
}

const data = [
    { name: "Alice", age: 25, city: "New York", country: "USA" },
    { name: "Bob", age: 30, city: "Los Angeles", country: "USA" },
    { name: "Charlie", age: 25, city: "London", country: "UK" },
    { name: "David", age: 35, city: "New York", country: "USA" },
    { name: "Eve", age: 35, city: "Paris", country: "France" }
];


console.log(groupBy(data, "country"));
console.log(groupBy(data, ["country", "city"]));
console.log(groupBy(data, person => person.age >= 30 ? "30 and above" : "Below 30"));
