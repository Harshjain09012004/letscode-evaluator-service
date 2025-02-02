//Determines Specific Error Based On KeyWords
export default function determineStatus(error : string) : string{
    const err = error.toLocaleLowerCase();

    if(err.includes('time')) {
        return "TLE";
    } else if(err.includes('memory') || err.includes('heap')) {
        return "MLE"; 
    } 
    return "RE";
};