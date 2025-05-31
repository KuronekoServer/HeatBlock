function serveStatusPage(res, serverIp, edition) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>HeatBlock - ${serverIp} (${edition} edition)</title>
      <link rel="icon" href="/icon_static.png" type="image/png">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" content="Check the status of Minecraft server ${serverIp} (${edition} edition) - HeatBlock">
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="top-nav">
        <div class="nav-left">
          <a href="/" class="active">Home</a>
          <a href="/api/docs">API</a>
        </div>
        <div class="nav-right">
          <a href="https://github.com/HeatBlock/HeatBlock" class="github-link" aria-label="GitHub Repository">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" class="github-icon">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
            </svg>
          </a>
          <label class="theme-switcher" for="theme-toggle">
            <input type="checkbox" id="theme-toggle" class="theme-checkbox">
            <div class="slider">
              <svg class="icon sun-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/>
              </svg>
              <svg class="icon moon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/>
              </svg>
            </div>
          </label>
        </div>
      </div>
      
      <div class="main-content">
        <form id="serverForm" onsubmit="navigateToServer(event)">
          <div class="input-group">
            <img src="/icon.gif" width="25" height="25" alt="Minecraft Server Icon">
            <input type="text" id="serverIp" value="${serverIp}" required>
            <button type="submit">Get Status</button>
          </div>
        </form>
        <div class="edition-switch">
          <label>
            <input type="radio" name="edition" value="java" ${edition === "java" ? "checked" : ""}> Java
          </label>
          <label>
            <input type="radio" name="edition" value="bedrock" ${edition === "bedrock" ? "checked" : ""}> Bedrock
          </label>
        </div>
        <div id="loading" class="loading-container">
          <svg class="container" viewBox="0 0 40 40" height="40" width="40">
            <circle class="track" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
            <circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
          </svg>
        </div>
        <div id="result" class="server-info" style="display: none;"></div>
      </div>
      
      <div class="footer" onclick="window.location.href='https://github.com/EducatedSuddenBucket'">Made By EducatedSuddenBucket</div>
      
      <script src="/script.js"></script>
      <script>
        // Initialize theme toggle only
        setupThemeToggle();
        
        function navigateToServer(event) {
          event.preventDefault();
          const serverIp = document.getElementById('serverIp').value;
          const edition = document.querySelector('input[name="edition"]:checked').value;
          window.location.href = edition === 'bedrock' ? '/bedrock/' + serverIp : '/' + serverIp;
        }

        async function getStatus() {
          const serverIp = "${serverIp}";
          const edition = "${edition}";
          const loadingDiv = document.getElementById('loading');
          const resultDiv = document.getElementById('result');
          
          loadingDiv.style.display = 'flex';
          resultDiv.style.display = 'none';
          resultDiv.innerHTML = '';

          try {
            const response = await fetch(edition === 'bedrock' ? '/api/status/bedrock/' + serverIp : '/api/status/' + serverIp);
            const status = await response.json();
            
            loadingDiv.style.display = 'none';
            resultDiv.style.display = 'flex';

            if (!status.success) {
              resultDiv.innerHTML = \`<p>\${status.error.message}</p>\`;
              return;
            }

            if (edition === 'java') {
              let playerList = '';
              if (status.players && status.players.list && status.players.list.length > 0) {
                playerList = '<div class="player-list"><h3>Online Players:</h3><ul>';
                status.players.list.forEach(player => {
                  playerList += \`<li>\${player.name}</li>\`;
                });
                playerList += '</ul></div>';
              }

              const parsedMOTD = parseMOTD(status.description);

              resultDiv.innerHTML = \`
                <img src="/api/png/\${serverIp}" alt="Server Favicon" width="64" height="64" onerror="this.src='/icon.gif'">
                <div class="server-details">
                  <p><strong>Version:</strong> \${status.version ? status.version.name : 'Unknown'}</p>
                  <p><strong>Players:</strong> \${status.players ? \`\${status.players.online}/\${status.players.max}\` : 'Unknown'}</p>
                  <p><strong>Description:</strong></p>
                  <div class="motd">\${parsedMOTD}</div>
                  <p><strong>Latency:</strong> \${status.latency !== undefined ? \`\${status.latency} ms\` : 'Unknown'}</p>
                  \${playerList}
                </div>
              \`;
            } else {
              const parsedMOTD = parseMOTD(status.motd);

              resultDiv.innerHTML = \`
                <div class="server-details">
                  <p><strong>MOTD:</strong> <div class="motd">\${parsedMOTD}</div></p>
                  <p><strong>Version:</strong> \${status.version || 'Unknown'}</p>
                  <p><strong>Players:</strong> \${status.playersOnline !== undefined && status.playersMax !== undefined ? \`\${status.playersOnline}/\${status.playersMax}\` : 'Unknown'}</p>
                  <p><strong>Gamemode:</strong> \${status.gamemode || 'Unknown'}</p>
                  <p><strong>Level Name:</strong> \${status.levelName || 'Unknown'}</p>
                  <p><strong>Protocol:</strong> \${status.protocol || 'Unknown'}</p>
                  <p><strong>Latency:</strong> \${status.latency !== undefined ? \`\${status.latency} ms\` : 'Unknown'}</p>
                </div>
              \`;
            }
          } catch (error) {
            console.error('Error fetching server status:', error);
            loadingDiv.style.display = 'none';
            resultDiv.style.display = 'flex';
            resultDiv.innerHTML = '<p>An error occurred while fetching the server status.</p>';
          }
        }

        getStatus();

        document.querySelectorAll('input[name="edition"]').forEach(radio => {
          radio.addEventListener('change', () => {
            navigateToServer(new Event('submit'));
          });
        });
      </script>
    </body>
    </html>
  `)
}

module.exports = serveStatusPage
