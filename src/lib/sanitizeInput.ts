export function sanitizeInput(input:string) {
    // Create a regex that matches any character that is NOT a letter, digit, space, comma, or period
    const sanitized = input.replace(/[^a-zA-Z0-9 ,.\s]/g, '');
    return sanitized;  // Return the sanitized string
}