document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("classifyForm");
    const input = document.getElementById("imageInput");
    const modal = document.getElementById("modal");
    const resultContainer = document.getElementById("resultContainer");
    const closeModal = document.getElementById("closeModal");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const file = input.files[0];
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("http://0.0.0.0:8000/model/classify", {
          method: "POST",
          body: formData
        });
  
        const data = await response.json();
        const predictions = data.result.predictions;
        const topPrediction = data.result.predicted_classes[0];
  
        // Crear tabla ordenada por confianza
        let html = `
          <p><strong>🧬 Predicción principal:</strong> ${topPrediction}</p>
          <table>
            <thead>
              <tr>
                <th>Clase</th>
                <th>Confianza</th>
              </tr>
            </thead>
            <tbody>
        `;
  
        const sorted = Object.entries(predictions).sort(
          (a, b) => b[1].confidence - a[1].confidence
        );
  
        for (const [label, { confidence }] of sorted) {
          const rowClass = label === topPrediction ? "highlight" : "";
          html += `
            <tr class="${rowClass}">
              <td>${label}</td>
              <td>${(confidence * 100).toFixed(2)}%</td>
            </tr>
          `;
        }
  
        html += `</tbody></table>`;
        resultContainer.innerHTML = html;
        modal.style.display = "block";
  
      } catch (error) {
        resultContainer.innerHTML = `<p style="color:red;">Error al clasificar: ${error.message}</p>`;
        modal.style.display = "block";
      }
    });
  
    closeModal.onclick = () => {
      modal.style.display = "none";
    };
  
    window.onclick = (e) => {
      if (e.target == modal) {
        modal.style.display = "none";
      }
    };
  });
  