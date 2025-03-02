export const convertToSlug = (title: string): string => {
    return title
        .toLowerCase() // Convert to lowercase
        .trim()        // Remove whitespace from both ends
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-'); // Replace multiple hyphens with a single hyphen
};

export const validateSlug = (slug: string): boolean => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/; // Regex to match slugs like "hello-world-123"

    return slugRegex.test(slug); // Returns true if the slug is valid, false otherwise
};