const timeConverter = (date) => {
    const now = new Date();
    const givenDate = new Date(date);
    const hoursDiff = Math.floor(
        (now - givenDate) / (1000 * 60 * 60)
    );
    const hours = `${hoursDiff}h ago`;
    if (hoursDiff < 24) return hours;
    else {
        const daysDiff = Math.floor(
            (now - givenDate) / (1000 * 60 * 60 * 24)
        );
        return `${daysDiff}d ago`;
    }
}

export default timeConverter;