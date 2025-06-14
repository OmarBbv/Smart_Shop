export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const diffInMs = now.getTime() - date.getTime();

    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return "bu gün";
    } else if (diffInDays === 1) {
        return "1 gün əvvəl";
    } else {
        return `${diffInDays} gün əvvəl`;
    }
};
