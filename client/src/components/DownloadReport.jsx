import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function DownloadReport({ issues }) {
const generatePDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("CivicTrack AI Report", 14, 15);

  doc.setFontSize(12);
  doc.text(
    `Generated: ${new Date().toLocaleString()}`,
    14,
    25
  );

  doc.text(
    `Total Issues: ${issues.length}`,
    14,
    32
  );

  autoTable(doc, {
    startY: 40,
    head: [["Title", "Type", "Location", "Status"]],
    body: issues.map((issue) => [
      issue.title,
      issue.issueType,
      issue.location,
      issue.status,
    ]),
  });

  doc.save("CivicTrack_Report.pdf");
};

  return (
    <button
      onClick={generatePDF}
      style={{
        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "12px 20px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      📄 Download PDF Report
    </button>
  );
}

export default DownloadReport;