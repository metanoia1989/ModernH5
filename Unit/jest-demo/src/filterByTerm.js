export function filterByTerm(inputArr, searchTerm) {
    if (!searchTerm) {
        throw Error("searchTeran cannot be empty")
    }
    const regex = new RegExp(searchTerm, "i");
    return inputArr.filter(arrayElement => arrayElement.url.match(regex))
}