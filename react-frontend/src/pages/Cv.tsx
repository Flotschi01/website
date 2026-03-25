import { useRef } from 'react';
import '../cv.css';

export default function Cv() {
  // 1. Create a reference to the CV content
  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = cvRef.current;
    if (!content) return;

    // 2. Create a temporary popup window
    const printWindow = window.open('', '_blank', 'width=800,height=1000');
    
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>CV - Florian Lehmerhofer</title>
            <link rel="stylesheet" href="lehmsys.com/src/cv.css">
            <style>
              /* Additional print-specific tweaks */
              body { font-family: sans-serif; margin: 0; padding: 20px; }
              .print-button { display: none !important; }
              @media print {
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            ${content.innerHTML}
          </body>
        </html>
      `);

      printWindow.document.close();
      
      // Give images/styles a moment to load before opening dialog
      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Print Button - hidden during print via CSS */}
      <button 
        onClick={handlePrint}
        className="no-print"
        style={{
          marginBottom: '20px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Print CV to PDF
      </button>

      {/* 3. Wrap everything you want to print in this div */}
      <div ref={cvRef}>
        <div className="main">
          <div id="head">
            <img className="" src="me.jpg" alt="Florian" />
            <h2>Florian Lehmerhofer</h2>
            <p>Student @ HTL Krems</p>
          </div>

          <div className="section">
            <img src="img/icons/Globe_b.png" className="icon" alt="" />
            <p className="info">Eisengraben 47, 3542 Gföhl</p>
            <img src="img/icons/Telephone_b.png" className="icon" alt="" />
            <p className="info">+43 664 6582712</p>
            <img src="img/icons/Mail_b.png" className="icon" alt="" />
            <p className="info mail">
              <a href="mailto:florian.lehmerhofer@gmail.com">florian.lehmerhofer@gmail.com</a>
            </p>
            <img src="img/icons/World_b.png" className="icon" alt="" />
            <p className="info">
              <a href="https://lehmsys.com">lehmsys.com</a>
            </p>
            <img src="img/icons/Cake_b.png" className="icon" alt="" />
            <p className="info">17. November 2007</p>
          </div>

          <div className="section">
            <h3>Beruf</h3>
            <div className="entry">
              <p className="timespan">Sommer 2025</p>
              <p className="content">
                <a href="https://nes.at/">Nuclear Engineering Seibersdorf GmbH</a>
                <br />
                Praktikant im Bereich Systementwicklung
              </p>
            </div>
          </div>

          <div className="section">
            <h3>Bildung</h3>
            <div className="entry">
              <p className="timespan">2022 − 2027</p>
              <p className="content">
                HTL Krems - Höhere Technische Bundeslehranstalt für Informatik<br />
                Ausbildungsschwerpunkt: Systemtechnik
              </p>
            </div>
            <div className="entry">
              <p className="timespan">2018 − 2022</p>
              <p className="content">
                <a>PNMS Zwettl: </a> Private Neue Mittelschule Zwettl <br />
                Ausbildungsschwerpunkt: Umwelt und Soziales, Informatik
              </p>
            </div>
          </div>

          <div className="section">
            <h3>Technologien</h3>
            <div className="entry">
              <p className="techgroup">Sprachen</p>
              <p className="content">C#, TypeScript, JavaScript, C, PHP, Python, SQL</p>
            </div>
            <div className="entry">
              <p className="techgroup">Web</p>
              <p className="content">HTML5, CSS3, JavaScript, React, Bootstrap, Typescript, ASP.NET</p>
            </div>
            <div className="entry">
              <p className="techgroup">Betriebssysteme</p>
              <p className="content">Linux, Microsoft Windows, Android</p>
            </div>
          </div>
        </div>

        <div className="main">
          <div className="section">
            <h3>Persönliches</h3>
            <div className="entry">
              <p className="techgroup">Muttersprache</p>
              <p className="content">Deutsch</p>
            </div>
            <div className="entry">
              <p className="techgroup">Weitere Sprachen</p>
              <table className="content">
                <tbody>
                  <tr>
                    <th></th>
                    <th colSpan={2}>Verstehen</th>
                    <th colSpan={2}>Sprechen</th>
                    <th>Schreiben</th>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Hören</th>
                    <th>Lesen</th>
                    <th>An Gesprächen teilnehmen</th>
                    <th>Sprechen</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>Englisch</td>
                    <td>B2</td>
                    <td>B2</td>
                    <td>B1</td>
                    <td>B2</td>
                    <td>B1</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="entry">
              <p className="techgroup">Hobbies</p>
              <p className="content">Schlagzeuger im Musikverein Gföhl</p>
              <p className="content">Mitglied bei den Pfadfindern Gföhl</p>
              <p className="content">Programmieren, Technik, Basteln</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}