import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const MODIFICATIONS = [
  "Жатка зерновая",
  "Жатка кукурузная",
  "Система GPS-навигации",
  "Датчики урожайности",
  "Увеличенный бункер"
];

const RECOMMENDATIONS: Record<string, string> = {
  "Жатка зерновая": "Увеличенный бункер",
  "Жатка кукурузная": "Увеличенный бункер"
};

function App() {
  const [selected, setSelected] = useState<string[]>([]);
  const [recommended, setRecommended] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const toggleMod = (mod: string) => {
    setSelected((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  useEffect(() => {
    const triggered = selected.find((mod) => RECOMMENDATIONS[mod]);
    if (triggered) {
      const rec = RECOMMENDATIONS[triggered];
      if (!selected.includes(rec)) {
        setRecommended(rec);
      } else {
        setRecommended(null);
      }
    } else {
      setRecommended(null);
    }
  }, [selected]);

  const calculate = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/calculate", {
        modifications: selected,
      });
      setResult(res.data);
    } catch (err) {
      alert("Ошибка при расчёте");
    }
  };

  return (
    <div className="App">
      <h1>Калькулятор стоимости комбайна</h1>
      <h3>Выберите модификации:</h3>
      {MODIFICATIONS.map((mod) => (
        <div key={mod}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(mod)}
              onChange={() => toggleMod(mod)}
            />
            {mod}
          </label>
        </div>
      ))}

      {recommended && (
        <div style={{ margin: "9px 0", color: "green" }}>
          💡 Рекомендуется также выбрать: <strong>{recommended}</strong>
        </div>
      )}

      <button onClick={calculate}>Рассчитать</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Результат:</h3>
          <p>Базовая цена: {result.basePrice.toLocaleString()} тг</p>
          <p>Модификации: {result.modificationsPrice.toLocaleString()} тг</p>
          <p>Сумма без НДС: {result.subtotal.toLocaleString()} тг</p>
          <p>НДС (20%): {result.vat.toLocaleString()} тг</p>
          <p><strong>Итого: {result.total.toLocaleString()} тг</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
