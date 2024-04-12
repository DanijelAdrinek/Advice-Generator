import DATA from "../../mock-data";

async function fetchAdvice() {
    const advice = await fetch('https://api.adviceslip.com');
    console.log(advice);
}