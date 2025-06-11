async function handleRAGQuery() {
  const question = document.getElementById("rag-question").value;

  const response = await fetch("http://127.0.0.1:5000/rag_query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  document.getElementById("rag-answer").innerText = data.answer || "No response.";
  document.getElementById("rag-sources").innerText = "Sources:\n" + data.sources.join("\n");
}
