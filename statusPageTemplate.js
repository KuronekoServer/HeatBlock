function serveStatusPage(res, serverIp, edition) {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>HeatBlock</title>
      <link rel="icon" href="https://heatblock.esb.is-a.dev/icon_static.png" type="image/png">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="top-nav">
        <a href="/" class="active">Home</a>
        <a href="/api/docs">API</a>
      </div>
      <div class="main-content">
        <form id="serverForm" onsubmit="navigateToServer(event)">
          <div class="input-group">
            <img src="https://heatblock.esb.is-a.dev/icon.gif" width="25" height="25" alt="IDK">
            <input type="text" id="serverIp" value="${serverIp}" required>
            <button type="submit">Get Status</button>
          </div>
        </form>
        <div class="edition-switch">
          <label>
            <input type="radio" name="edition" value="java" ${edition === 'java' ? 'checked' : ''}> Java
          </label>
          <label>
            <input type="radio" name="edition" value="bedrock" ${edition === 'bedrock' ? 'checked' : ''}> Bedrock
          </label>
        </div>
        <div id="loading" class="loading-container">
          <svg class="container" viewBox="0 0 40 40" height="40" width="40">
            <circle class="track" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
            <circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
          </svg>
        </div>
        <div id="result" class="server-info" style="display: none;"></div>
        <div class="footer" onclick="window.location.href='https://github.com/EducatedSuddenBucket'">Made By EducatedSuddenBucket</div>
      </div>
      <script>
        function navigateToServer(event) {
          event.preventDefault();
          const serverIp = document.getElementById('serverIp').value;
          const edition = document.querySelector('input[name="edition"]:checked').value;
          window.location.href = edition === 'bedrock' ? '/bedrock/' + serverIp : '/' + serverIp;
        }

        function parseMOTD(input) {
          const colorMap = {
            '§0': 'mc-black',
            '§1': 'mc-dark-blue',
            '§2': 'mc-dark-green',
            '§3': 'mc-dark-aqua',
            '§4': 'mc-dark-red',
            '§5': 'mc-dark-purple',
            '§6': 'mc-gold',
            '§7': 'mc-gray',
            '§8': 'mc-dark-gray',
            '§9': 'mc-blue',
            '§a': 'mc-green',
            '§b': 'mc-aqua',
            '§c': 'mc-red',
            '§d': 'mc-light-purple',
            '§e': 'mc-yellow',
            '§f': 'mc-white'
          };

          const formatMap = {
            '§l': 'mc-bold',
            '§m': 'mc-strikethrough',
            '§n': 'mc-underline',
            '§o': 'mc-italic'
          };

          let result = '';
          let currentSpan = '';
          let currentClasses = [];

          for (let i = 0; i < input.length; i++) {
            if (input[i] === '§' && i + 1 < input.length) {
              if (currentSpan) {
                result += \`<span class="\${currentClasses.join(' ')}">\${currentSpan}</span>\`;
                currentSpan = '';
              }

              const code = input.substr(i, 2);
              if (colorMap[code]) {
                currentClasses = [colorMap[code]];
              } else if (formatMap[code]) {
                currentClasses.push(formatMap[code]);
              } else if (code === '§r') {
                currentClasses = [];
              }
              i++;
            } else {
              currentSpan += input[i];
            }
          }

          if (currentSpan) {
            result += \`<span class="\${currentClasses.join(' ')}">\${currentSpan}</span>\`;
          }

          return result || 'No description available';
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

            // Handle error responses based on the updated API
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
            } else { // Bedrock
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

        // Automatically fetch status when the page loads
        getStatus();

        // Add event listener to update status when edition is changed
        document.querySelectorAll('input[name="edition"]').forEach(radio => {
          radio.addEventListener('change', () => {
            navigateToServer(new Event('submit'));
          });
        });
      </script>
    </body>
    </html>
  `);
}

module.exports = serveStatusPage;
