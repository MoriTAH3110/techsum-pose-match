export class MillisecondsEncoder {
    // Convert milliseconds to minutes and seconds in format mm:ss
    static toMinutesSeconds = (milliseconds: number): string => {
        const totalSeconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
        const minutes = Math.floor(totalSeconds / 60); // Get the total minutes
        const seconds = totalSeconds % 60; // Get the remaining seconds
    
        // Ensure two digits for both minutes and seconds by padding with '0'
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
    
        return `${formattedMinutes}:${formattedSeconds}`;
    };
};