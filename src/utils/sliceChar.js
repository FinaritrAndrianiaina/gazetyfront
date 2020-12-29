export default (text = "", length = 300) => {
    if (text.length > length) {
        const tmp = text.slice(0, length);
        return tmp.slice(0, tmp.lastIndexOf(" ")) + "..."
    }
    return text
}