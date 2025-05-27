let players = [];

function addPlayer() {
  const div = document.createElement("div");
  const nameInput = document.createElement("input");
  const numberInput = document.createElement("input");

  nameInput.placeholder = "ชื่อผู้เล่น";
  numberInput.placeholder = "กรอกตัวเลข (0-100)";
  numberInput.type = "number";
  numberInput.min = 0;
  numberInput.max = 100;

  div.appendChild(nameInput);
  div.appendChild(numberInput);
  document.getElementById("players").appendChild(div);
  players.push({ nameInput, numberInput });
}

function calculateResult() {
  const data = players.map(p => ({
    name: p.nameInput.value,
    number: parseFloat(p.numberInput.value)
  }));

  const validData = data.filter(p => !isNaN(p.number));
  if (validData.length === 0) {
    document.getElementById("result").innerText = "กรุณาใส่ตัวเลขอย่างน้อย 1 คน";
    return;
  }

  const average = validData.reduce((sum, p) => sum + p.number, 0) / validData.length;
  const target = average * 0.8;

  let winner = null;
  let closest = Infinity;

  validData.forEach(p => {
    const diff = Math.abs(p.number - target);
    if (diff < closest) {
      closest = diff;
      winner = p;
    }
  });

  document.getElementById("result").innerText =
    `ค่าเฉลี่ย: ${average.toFixed(2)}\nเป้าหมาย (x0.8): ${target.toFixed(2)}\nผู้ชนะ: ${winner.name} (${winner.number})`;
}