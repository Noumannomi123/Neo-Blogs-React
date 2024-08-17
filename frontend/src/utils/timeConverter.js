const timeConverter = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
    if (now.toDateString() === givenDate.toDateString()) {
        const hoursDiff = Math.floor(
            (now - givenDate) / (1000 * 60 * 60)
        );
        return `${hoursDiff}h ago`;
    } else {
        const daysDiff = Math.ceil(
            (now - givenDate) / (1000 * 60 * 60 * 24)
        );
        return `${daysDiff}d ago`;
    }
}

export default timeConverter;