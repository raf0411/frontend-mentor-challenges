const advice = document.getElementById('advice');
const adviceNumber = document.getElementById('advice-number')
const generateBtn = document.getElementById('generate-btn');
const apiURL = 'https://api.adviceslip.com/advice';

const getRandomAdvice = async () => {
  try {
    const res = await fetch(`${apiURL}/${randomizeNumber()}`);
    const data = await res.json();

    if (!res.ok) {
      console.log(`Response status: ${res.status}`);
      return;
    }

    advice.textContent = `"${data.slip.advice}"`;
    adviceNumber.textContent = `advice #${data.slip.id}`;

  } catch (error) {
    console.error(error);
  }
};

const randomizeNumber = () => {
  let number = Math.floor(Math.random() * 100);
  return number;
}

generateBtn.addEventListener("click", () => {
  getRandomAdvice();
});